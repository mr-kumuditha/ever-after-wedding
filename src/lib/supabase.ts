import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL as string;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const isPlaceholderUrl = !envUrl || envUrl === 'your_supabase_project_url';

if (isPlaceholderUrl) {
  console.warn('Supabase env vars missing — RSVP and data features will not work. Add real keys to .env');
}

export const supabase = createClient(
  isPlaceholderUrl ? 'https://placeholder.supabase.co' : envUrl,
  (!envKey || envKey === 'your_supabase_anon_key') ? 'placeholder' : envKey
);
