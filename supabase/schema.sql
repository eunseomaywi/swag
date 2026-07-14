create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  school_email text,
  year_group text,
  role text not null default 'student' check (role in ('student', 'peer_mentor', 'swag_admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text,
  role_title text,
  year_group text,
  image_url text,
  short_bio text,
  display_order integer,
  active boolean not null default true
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  title text,
  activity_date date,
  image_url text,
  summary text,
  full_description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.mentor_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  bio text,
  languages text[],
  support_topics text[],
  active boolean not null default true
);

create table if not exists public.mentor_availability (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid references public.mentor_profiles(user_id) on delete cascade,
  available_date date not null,
  slot text not null check (slot in ('break', 'first_lunch', 'second_lunch')),
  is_available boolean not null default true
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  mentor_id uuid references public.mentor_profiles(user_id) on delete set null,
  booking_date date not null,
  slot text not null check (slot in ('break', 'first_lunch', 'second_lunch')),
  topic text,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined', 'cancelled')),
  created_at timestamptz not null default now()
);

create unique index if not exists bookings_one_confirmed_mentor_slot
  on public.bookings (mentor_id, booking_date, slot)
  where status = 'confirmed' and mentor_id is not null;

create table if not exists public.concerns (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid references public.profiles(id) on delete set null,
  anonymous boolean not null default false,
  year_group text,
  category text,
  message text,
  additional_info text,
  immediate_danger boolean not null default false,
  wants_follow_up boolean not null default false,
  preferred_contact text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.members enable row level security;
alter table public.activities enable row level security;
alter table public.mentor_profiles enable row level security;
alter table public.mentor_availability enable row level security;
alter table public.bookings enable row level security;
alter table public.concerns enable row level security;

create or replace function public.is_swag_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'swag_admin'
  );
$$;

create or replace function public.is_peer_mentor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'peer_mentor'
  );
$$;

create policy "profiles read own"
  on public.profiles for select
  using (id = auth.uid());

create policy "profiles update own"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "admins read profiles"
  on public.profiles for select
  using (public.is_swag_admin());

create policy "admins update profiles"
  on public.profiles for update
  using (public.is_swag_admin())
  with check (public.is_swag_admin());

create policy "public read active members"
  on public.members for select
  using (active = true);

create policy "admins manage members"
  on public.members for all
  using (public.is_swag_admin())
  with check (public.is_swag_admin());

create policy "public read active activities"
  on public.activities for select
  using (active = true);

create policy "admins manage activities"
  on public.activities for all
  using (public.is_swag_admin())
  with check (public.is_swag_admin());

create policy "public read active mentor profiles"
  on public.mentor_profiles for select
  using (active = true);

create policy "mentors update own mentor profile"
  on public.mentor_profiles for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "admins manage mentor profiles"
  on public.mentor_profiles for all
  using (public.is_swag_admin())
  with check (public.is_swag_admin());

create policy "read available mentor availability"
  on public.mentor_availability for select
  using (is_available = true);

create policy "mentors update own availability"
  on public.mentor_availability for update
  using (mentor_id = auth.uid())
  with check (mentor_id = auth.uid());

create policy "admins manage mentor availability"
  on public.mentor_availability for all
  using (public.is_swag_admin())
  with check (public.is_swag_admin());

create policy "students create own bookings"
  on public.bookings for insert
  with check (student_id = auth.uid());

create policy "students read own bookings"
  on public.bookings for select
  using (student_id = auth.uid());

create policy "students cancel own bookings"
  on public.bookings for update
  using (student_id = auth.uid() and status in ('pending', 'confirmed'))
  with check (student_id = auth.uid() and status = 'cancelled');

create policy "peer mentors read relevant bookings"
  on public.bookings for select
  using (
    public.is_peer_mentor()
    and (
      mentor_id = auth.uid()
      or (mentor_id is null and status = 'pending')
    )
  );

create policy "peer mentors confirm or decline relevant bookings"
  on public.bookings for update
  using (
    public.is_peer_mentor()
    and (
      mentor_id = auth.uid()
      or (mentor_id is null and status = 'pending')
    )
  )
  with check (
    public.is_peer_mentor()
    and mentor_id = auth.uid()
    and status in ('confirmed', 'declined')
  );

create policy "admins manage bookings"
  on public.bookings for all
  using (public.is_swag_admin())
  with check (public.is_swag_admin());

create policy "students submit concerns"
  on public.concerns for insert
  with check (
    submitted_by = auth.uid()
    or submitted_by is null
    or anonymous = true
  );

create policy "admins read concerns"
  on public.concerns for select
  using (public.is_swag_admin());

create policy "admins update concerns"
  on public.concerns for update
  using (public.is_swag_admin())
  with check (public.is_swag_admin());
