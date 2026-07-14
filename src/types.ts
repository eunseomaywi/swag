export type Accent = 'blue' | 'green' | 'orange' | 'purple' | 'pink';

export type Member = {
  id: string;
  name: string;
  role: string;
  yearGroup: string;
  image: string | null;
  shortBio: string;
  accent: Accent;
};

export type Activity = {
  id: string;
  title: string;
  date: string;
  image: string | null;
  summary: string;
  fullDescription: string;
};

export type BookingStatus = 'Pending' | 'Confirmed' | 'Declined' | 'Cancelled';

export type Booking = {
  id: string;
  studentName: string;
  date: string;
  slot: string;
  topic: string;
  notes: string;
  mentor?: string;
  status: BookingStatus;
};
