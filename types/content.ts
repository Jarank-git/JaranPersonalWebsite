export type Slug = string

export type MenuItem = {
  label: string
  href: string
  description?: string
  external?: boolean
  disabled?: boolean
}

export type ProjectImage = { src: string; alt: string; caption?: string }
export type ProjectLinkKind = 'github' | 'demo' | 'writeup' | 'other'
export type ProjectLink = { label: string; href: string; kind: ProjectLinkKind }

export type Project = {
  slug: Slug
  title: string
  tagline: string
  year: string
  summary: string
  bullets: string[]
  stack: string[]
  images: ProjectImage[]
  links: ProjectLink[]
}

export type Role = {
  slug: Slug
  title: string
  company: string
  location: string
  start: string
  end: string | 'present'
  summary: string
  bullets: string[]
  stack?: string[]
}

export type AboutSlab = {
  slug: Slug
  title: string
  body: string
  sideNote?: string
  download?: { href: string; label: string }
}

export type ContactLink = {
  slug: Slug
  label: string
  handle: string
  href: string
  external: boolean
}

export type MenuSection = 'about' | 'projects' | 'experience' | 'contact'
