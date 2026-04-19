import type {
  Project, Role, AboutSlab, ContactLink, MenuItem,
} from '@/types/content'

export const projects: Project[] = [
  {
    slug: 'arctic',
    title: 'TBD',
    tagline: 'TBD',
    year: 'TBD',
    summary: 'TBD',
    bullets: [],
    stack: [],
    images: [
      { src: '/images/projects/arctic/dashboard.jpg',   alt: 'TBD' },
      { src: '/images/projects/arctic/robot.jpg',       alt: 'TBD' },
      { src: '/images/projects/arctic/robot-front.jpg', alt: 'TBD' },
      { src: '/images/projects/arctic/robot-back.jpg',  alt: 'TBD' },
      { src: '/images/projects/arctic/robot-top.jpg',   alt: 'TBD' },
    ],
    links: [],
  },
  {
    slug: 'ldo',
    title: 'TBD',
    tagline: 'TBD',
    year: 'TBD',
    summary: 'TBD',
    bullets: [],
    stack: [],
    images: [],
    links: [],
  },
]

export const experience: Role[] = [
  {
    slug: 'warg',
    title: 'Electrical Subsystem Member',
    company: 'Waterloo Aerial Robotics Group',
    location: 'TBD',
    start: '2025-09',
    end: 'present',
    summary: 'TBD',
    bullets: [],
  },
  {
    slug: 'renellence',
    title: 'Co-op Business Automation & Systems Developer',
    company: 'Renellence Inc.',
    location: 'TBD',
    start: 'TBD',
    end: 'TBD',
    summary: 'TBD',
    bullets: [],
  },
  {
    slug: 'civilcraft',
    title: 'Systems Engineering Intern',
    company: 'Civilcraft Engineering LLC',
    location: 'TBD',
    start: '2025-06',
    end: '2025-08',
    summary: 'TBD',
    bullets: [],
  },
  {
    slug: 'codeninjas',
    title: 'Coding Instructor',
    company: 'Code Ninjas',
    location: 'TBD',
    start: '2025-07',
    end: '2025-08',
    summary: 'TBD',
    bullets: [],
  },
]

export const aboutSlabs: AboutSlab[] = [
  { slug: 'bio',       title: 'Bio',       body: 'TBD' },
  { slug: 'education', title: 'Education', body: 'TBD' },
  {
    slug: 'resume',
    title: 'Resume',
    body: 'TBD',
    download: { href: '/resume.pdf', label: 'Download Resume' },
  },
]

export const contactLinks: ContactLink[] = [
  {
    slug: 'email',
    label: 'Email',
    handle: 'Jarankhalid2@gmail.com',
    href: 'mailto:Jarankhalid2@gmail.com',
    external: false,
  },
  {
    slug: 'linkedin',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/jaran-khalid',
    href: 'https://linkedin.com/in/jaran-khalid/',
    external: true,
  },
  {
    slug: 'github',
    label: 'GitHub',
    handle: 'github.com/Jarank-git',
    href: 'https://github.com/Jarank-git',
    external: true,
  },
]

export const MAIN_ITEMS: MenuItem[] = [
  { label: 'About',      href: '/about' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact',    href: '/contact' },
]

export const toProjectMenuItem = (p: Project): MenuItem => ({
  label: p.title,
  href: `/projects/${p.slug}`,
  description: p.tagline,
})

export const toRoleMenuItem = (r: Role): MenuItem => ({
  label: r.title,
  href: `/experience/${r.slug}`,
  description: r.company,
})

export const toAboutMenuItem = (a: AboutSlab): MenuItem => ({
  label: a.title,
  href: `/about/${a.slug}`,
})

export const toContactMenuItem = (c: ContactLink): MenuItem => ({
  label: c.label,
  href: c.href,
  description: c.handle,
  external: c.external,
})

export const getProject     = (slug: string) => projects.find((p) => p.slug === slug)
export const getRole        = (slug: string) => experience.find((r) => r.slug === slug)
export const getAboutSlab   = (slug: string) => aboutSlabs.find((a) => a.slug === slug)
export const getContactLink = (slug: string) => contactLinks.find((c) => c.slug === slug)
