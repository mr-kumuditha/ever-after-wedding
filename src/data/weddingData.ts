import type { TimelineEvent, ScheduleItem } from '../types';

export const COUPLE = {
  bride: {
    name: 'Oshani',
    firstName: 'Oshani',
    phone: '+94771234000',
    email: 'oshani@everafter.lk',
    whatsapp: '94771234000',
  },
  groom: {
    name: 'Ransala',
    firstName: 'Ransala',
    phone: '+94771234001',
    email: 'ransala@everafter.lk',
    whatsapp: '94771234001',
  },
  hashtag: '#OshaniAndRansala2026',
};

export const WEDDING = {
  date: new Date('2026-10-06T16:00:00'),
  dateDisplay: 'October 6, 2026',
  dayDisplay: 'Tuesday',
  ceremony: {
    time: '4:00 PM',
    venue: 'The Grand Pavilion Chapel',
    address: '12 Galle Road, Colombo 03, Sri Lanka',
    googleMapsUrl: 'https://maps.google.com?q=The+Grand+Pavilion+Colombo',
    dressCode: 'Black Tie / Formal Attire',
  },
  reception: {
    time: '7:00 PM',
    venue: 'The Grand Pavilion Ballroom',
    address: '12 Galle Road, Colombo 03, Sri Lanka',
    tableCount: 30,
    guestCapacity: 300,
  },
};

export const TIMELINE: TimelineEvent[] = [
  {
    id: 1,
    date: 'March 2019',
    title: 'First Meeting',
    description: "We met at a mutual friend's dinner party in Colombo. Ransala spilled red wine on Oshani's white dress — the rest is history.",
    emoji: '🍷',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
  },
  {
    id: 2,
    date: 'December 2020',
    title: 'Our First Trip',
    description: "We escaped to Ella for Christmas. A misty morning hike to Little Adam's Peak and we knew this was something special.",
    emoji: '🌄',
    image: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=800&q=80',
  },
  {
    id: 3,
    date: 'February 2023',
    title: 'The Proposal',
    description: 'Under the stars at Galle Fort, Ransala got down on one knee with a vintage sapphire ring. Oshani said yes before he could finish the question.',
    emoji: '💍',
    image: 'https://images.unsplash.com/photo-1552563977-1b68fca4d2af?w=800&q=80',
  },
  {
    id: 4,
    date: 'October 2026',
    title: 'Forever Begins',
    description: 'We invite our dearest family and friends to witness us begin our greatest adventure together.',
    emoji: '💒',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
  },
];

export const SCHEDULE: ScheduleItem[] = [
  {
    time: '3:30 PM',
    title: 'Guest Arrival & Welcome Drinks',
    description: 'Guests arrive at The Grand Pavilion. Enjoy welcome drinks in the garden courtyard.',
    icon: '🥂',
    location: 'Garden Courtyard',
  },
  {
    time: '4:00 PM',
    title: 'Wedding Ceremony',
    description: 'The exchange of vows and rings before your loved ones.',
    icon: '💒',
    location: 'The Grand Chapel',
  },
  {
    time: '5:15 PM',
    title: 'Cocktail Hour',
    description: 'Celebrate with cocktails, canapés, and live string quartet music.',
    icon: '🍸',
    location: 'Pavilion Terrace',
  },
  {
    time: '6:00 PM',
    title: 'Photo Session',
    description: 'Formal photographs with family and the bridal party in the sculpted gardens.',
    icon: '📸',
    location: 'Sculpture Gardens',
  },
  {
    time: '7:00 PM',
    title: 'Grand Reception Entrance',
    description: 'The newlyweds make their grand entrance into the Ballroom.',
    icon: '✨',
    location: 'Grand Ballroom',
  },
  {
    time: '7:30 PM',
    title: 'Gala Dinner',
    description: 'A five-course sit-down dinner featuring Sri Lankan and Continental cuisine.',
    icon: '🍽️',
    location: 'Grand Ballroom',
  },
  {
    time: '9:00 PM',
    title: 'Cake Cutting & First Dance',
    description: 'The couple cuts their five-tier wedding cake, followed by the first dance.',
    icon: '🎂',
    location: 'Grand Ballroom',
  },
  {
    time: '9:30 PM',
    title: 'After Party & Dancing',
    description: 'Dance the night away with live DJ, open bar, and a midnight dessert table.',
    icon: '🎶',
    location: 'Grand Ballroom',
  },
  {
    time: '12:00 AM',
    title: 'Farewell & Sparkler Send-Off',
    description: 'Join us for the sparkler exit as we begin our honeymoon journey.',
    icon: '🌟',
    location: 'Main Entrance',
  },
];

export const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80', alt: 'Engagement Session', category: 'Engagement' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', alt: 'Galle Fort Sunset', category: 'Engagement' },
  { src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&q=80', alt: 'Family Portrait', category: 'Family' },
  { src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&q=80', alt: 'First Dance Practice', category: 'Engagement' },
  { src: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=600&q=80', alt: 'Ring Shot', category: 'Engagement' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80', alt: 'Venue Grand Hall', category: 'Venue' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', alt: 'Beach Shoot', category: 'Engagement' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', alt: 'Family Gathering', category: 'Family' },
];

export const PLACEHOLDER_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
  couple1: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
  couple2: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=800&q=80',
  couple3: 'https://images.unsplash.com/photo-1552563977-1b68fca4d2af?w=800&q=80',
  couple4: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&q=80',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&q=80',
    'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=600&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
  ],
};
