# 💍 Ever After — Premium Wedding Invitation Website

A responsive, high-end single-page wedding invitation and RSVP portal designed for **Oshani & Ransala**. Built using a modern stack featuring React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Supabase.

---

## ✨ Features

- **🏆 Premium Visual Design**: Features HSL-tailored gold, ivory, and obsidian palettes with glassmorphism cards and smooth, custom micro-interactions.
- **🌸 Floating Petals & Animations**: Interactive floating rose petals with staggered text reveals powered by Framer Motion.
- **🎨 Triple Theme Switcher**: Guests can toggle dynamically between three premium styles:
  - **White Gold** (Light, classic elegance)
  - **Black Gold** (Dark, modern luxury)
  - **Floral** (Romantic, warm botanical)
- **⏳ Live Countdown Timer**: Dynamic live countdown calculation to **October 6, 2026**.
- **💌 Personalized Guest Invitations**: Routing via `/invite/:guestCode` greets the guest by name, displays their personal invitation details, and renders a unique downloadable RSVP QR code.
- **📝 Real-time RSVP & Guestbook**: Interactive form submits attendance, guest count, and dietary preferences directly to Supabase, complete with gold confetti on submission.
- **🎵 Music Toggle**: Elegant background instrumental audio loop with play/pause controller.
- **📊 Admin Dashboard**: Secured portal (`/admin/login` & `/admin`) containing:
  - Attendance analytics charts powered by Recharts.
  - Interactive RSVP tables with search/filter features.
  - Data exports to **Excel (XLSX)**, **CSV**, or **PDF** (via auto-table generation).
  - Guest management CRUD operations.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Vanilla CSS custom animations
- **Motion**: Framer Motion
- **Database / Backend**: Supabase
- **Icons**: Lucide React
- **Analytics / Exports**: Recharts, SheetJS (XLSX), jsPDF, jsPDF-AutoTable
- **Utilities**: QR Code (qrcode.react), Canvas-Confetti

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 2. Installation
Clone the repository, enter the folder, and install dependencies:
```bash
cd ever-after-wedding
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root folder (using `.env.example` as a template) and add your credentials:
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Admin Dashboard Credentials
VITE_ADMIN_EMAIL=admin@everafter.com
VITE_ADMIN_PASSWORD=admin2026
```

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open `http://localhost:5173` to view it in your browser.

### 5. Build for Production
Generate the optimized build bundle:
```bash
npm run build
```
Verify the production build locally:
```bash
npm run preview
```

---

## 🗄️ Database Setup (Supabase)

To enable RSVP, Guestbook, and Guest invitation features, execute the following SQL schema in your Supabase SQL Editor:

```sql
-- Create Guests Table
CREATE TABLE public.guests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_code VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    max_guests INT DEFAULT 1 NOT NULL,
    rsvp_status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    invitation_views INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create RSVP Table
CREATE TABLE public.rsvp (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_id UUID REFERENCES public.guests(id) ON DELETE SET NULL,
    guest_code VARCHAR(50),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    number_of_guests INT DEFAULT 1 NOT NULL,
    attendance_status VARCHAR(50) NOT NULL,
    dietary_requirements TEXT,
    message TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Guestbook Table
CREATE TABLE public.guestbook (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

-- Create Public Policies (Read/Write access where appropriate)
CREATE POLICY "Allow public read guests" ON public.guests FOR SELECT USING (true);
CREATE POLICY "Allow public update guests" ON public.guests FOR UPDATE USING (true);
CREATE POLICY "Allow public insert RSVP" ON public.rsvp FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read RSVP" ON public.rsvp FOR SELECT USING (true);
CREATE POLICY "Allow public insert guestbook" ON public.guestbook FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read guestbook" ON public.guestbook FOR SELECT USING (true);
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
