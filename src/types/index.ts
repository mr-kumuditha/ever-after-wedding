export type Theme = 'white-gold' | 'black-gold' | 'floral';

export interface ThemeConfig {
  id: Theme;
  name: string;
  bg: string;
  text: string;
  accent: string;
  cardBg: string;
  navBg: string;
  heroBg: string;
}

export interface Guest {
  id: string;
  guest_code: string;
  full_name: string;
  email?: string;
  phone?: string;
  invitation_views: number;
  rsvp_status: 'pending' | 'attending' | 'not_attending';
  created_at: string;
}

export interface RSVPFormData {
  full_name: string;
  email: string;
  phone: string;
  number_of_guests: number;
  attendance_status: 'attending' | 'not_attending';
  dietary_requirements: string;
  message: string;
  guest_code?: string;
  guest_id?: string;
}

export interface GuestBookEntry {
  id: string;
  author_name: string;
  message: string;
  created_at: string;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  emoji: string;
  image?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: string;
  location?: string;
}

export interface AdminStats {
  totalInvited: number;
  totalAttending: number;
  totalDeclined: number;
  totalPending: number;
  totalViews: number;
}
