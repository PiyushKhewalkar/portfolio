export type MediaItem = { type: 'image' | 'video'; src: string; alt?: string }

export type Project = {
  title: string
  period?: string
  summary: string
  tech?: string
  live?: string
  repo?: string
  stats?: string[]
  media?: MediaItem[]
}

