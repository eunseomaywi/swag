# SWAG Website

Responsive React + Vite + TypeScript prototype for **SWAG**, the Student Welfare Awareness Group.

## Features

- Playful hand-drawn student-made visual style
- Responsive header with desktop navigation and mobile hamburger menu
- Home, About, Members, Activities, Peer Mentor, and Form pages
- Separate form routes:
  - `/form/booking`
  - `/form/concern`
- Multi-step booking and concern forms with validation
- Prototype student, peer mentor, and SWAG admin dashboards
- Supabase client setup and SQL schema with RLS policies

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create an environment file:

   ```bash
   cp .env.example .env
   ```

3. Add your Supabase project values:

   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the local development server:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

## Supabase

Run the SQL in `supabase/schema.sql` inside the Supabase SQL editor. Never place a Supabase service role key in frontend code.

## Routes

- `/`
- `/about`
- `/members`
- `/activities`
- `/peer-mentor`
- `/form`
- `/form/booking`
- `/form/concern`
- `/dashboard/student`
- `/dashboard/mentor`
- `/dashboard/admin`

## Placeholder Content

Member, activity, and mentor areas intentionally use grey image boxes and line placeholders so final content can be added later without fake biographies or fake activity descriptions.
