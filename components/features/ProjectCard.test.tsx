import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/types/content'

const tbdArctic: Project = {
  slug: 'arctic', title: 'TBD', tagline: 'TBD', year: 'TBD', summary: 'TBD',
  bullets: [], stack: [],
  images: [
    { src: '/images/projects/arctic/dashboard.jpg', alt: 'TBD' },
    { src: '/images/projects/arctic/robot.jpg', alt: 'TBD' },
  ],
  links: [],
}

const tbdLdo: Project = {
  slug: 'ldo', title: 'TBD', tagline: 'TBD', year: 'TBD', summary: 'TBD',
  bullets: [], stack: [], images: [], links: [],
}

const richProject: Project = {
  slug: 'demo', title: 'Demo Project', tagline: 'A tagline', year: '2025',
  summary: 'Summary text.',
  bullets: ['Bullet one', 'Bullet two'],
  stack: ['TypeScript', 'Next.js'],
  images: [{ src: '/images/projects/demo/hero.jpg', alt: 'Demo screenshot' }],
  links: [
    { label: 'Source', href: 'https://github.com/x/y', kind: 'github' },
    { label: 'Live', href: 'https://demo.example', kind: 'demo' },
  ],
}

describe('ProjectCard', () => {
  it('renders an all-TBD arctic-shaped project with its images', () => {
    render(<ProjectCard project={tbdArctic} />)
    expect(screen.getByRole('heading', { level: 1, name: /tbd/i })).toBeInTheDocument()
    const figures = screen.getAllByRole('figure')
    expect(figures.length).toBe(2)
  })

  it('renders an all-TBD, empty-everything project (ldo) with NO gallery element', () => {
    render(<ProjectCard project={tbdLdo} />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.queryByRole('figure')).toBeNull()
    expect(screen.queryByRole('list')).toBeNull()
  })

  it('renders bullets, stack pills, and links when populated', () => {
    render(<ProjectCard project={richProject} />)
    expect(screen.getByText('Bullet one')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    const source = screen.getByRole('link', { name: /source/i })
    expect(source).toHaveAttribute('href', 'https://github.com/x/y')
    expect(source).toHaveAttribute('target', '_blank')
    expect(source).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})
