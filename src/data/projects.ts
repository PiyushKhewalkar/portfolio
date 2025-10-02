import type { Project } from '../types'

export const projects: Project[] = [
  {
    title: 'hypelister',
    period: '2024 – present',
    summary: 'launch a product waitlist in under 30 seconds. no manual coding, analytics setup, or supabase wrangling—just a clean form, tracking, and export.',
    tech: 'react, tailwind, node, supabase',
    live: 'https://hypelister.com',
    repo: undefined,
    stats: ['59 active users', '200+ waitlists launched (organic)'],
    media: [
      { type: 'image', src: 'https://placehold.co/800x450/0f0f0f/fff?text=hypelister+ui', alt: 'hypelister ui' }
    ]
  },
  {
    title: 'bouncing dvd (multiplayer)',
    period: '2024',
    summary: 'nostalgic dvd logo game where players predict the next screen edge. includes real‑time leaderboard and brand sponsorship mode that swaps the logo.',
    tech: 'react, tailwind, express, websockets, redis, mongodb',
    live: 'https://dvd.billiondollardevs.com',
    repo: undefined,
    stats: ['scales to 1000+ concurrent players'],
    media: [
      { type: 'image', src: 'https://placehold.co/800x450/0f0f0f/fff?text=dvd+game', alt: 'dvd gameplay' }
    ]
  }
]

