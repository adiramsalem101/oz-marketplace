/**
 * Source of truth for the four AM HOSTELS hostels surfaced on oz-marketplace.
 * MVP: link-out cards to FrontDeskMaster's hosted booking.
 * See DECISIONS_LOG 2026-05-06 for hostels-link-out policy and conversion roadmap.
 */
export const HOSTELS = [
  {
    slug: 'jerusalem',
    city: 'ירושלים',
    name: 'Cinema Hostel Jerusalem',
    emoji: '🕌',
    fdmUrl: 'https://new-booking.frontdeskmaster.com/?hostelId=xZvO4Y%2BkSeCwIk%2F2U6JR6QuxmBFePEKM',
  },
  {
    slug: 'tel-aviv',
    city: 'תל אביב / יפו',
    name: 'Jungle Jaffa Hostel',
    emoji: '🌊',
    fdmUrl: 'https://new-booking.frontdeskmaster.com/?hostelId=JB0%2BaOH1hnDhBNORr1CZcD3tWkV9vR%2FM',
  },
  {
    slug: 'haifa',
    city: 'חיפה',
    name: 'Haifa Hostel',
    emoji: '⚓',
    fdmUrl: 'https://new-booking.frontdeskmaster.com/?hostelId=iGjwgdoeTwDY%2BVWkyB7c%2BQWZDBiQB%2BG%2B',
  },
  {
    slug: 'tiberias',
    city: 'טבריה',
    name: 'Tiberias Hostel',
    emoji: '🏞️',
    fdmUrl: 'https://new-booking.frontdeskmaster.com/?hostelId=zRrshXqJSiXA4t95Q8TUGIQCPaoMgpt6',
  },
] as const;

export type Hostel = typeof HOSTELS[number];
