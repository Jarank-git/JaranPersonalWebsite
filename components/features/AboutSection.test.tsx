import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { AboutSection } from './AboutSection'
import type { AboutSlab } from '@/types/content'

const tbdSlab: AboutSlab = { slug: 'bio', title: 'Bio', body: 'TBD' }
const richSlab: AboutSlab = {
  slug: 'resume',
  title: 'Resume',
  body: 'First paragraph.\n\nSecond paragraph.',
  sideNote: 'Updated quarterly.',
  download: { href: '/resume.pdf', label: 'Download Resume' },
}

describe('AboutSection', () => {
  it('renders a TBD-bodied slab without sideNote or download', () => {
    const { container } = render(<AboutSection data={tbdSlab} />)
    expect(screen.getByRole('heading', { level: 1, name: /bio/i })).toBeInTheDocument()
    expect(screen.getByText('TBD')).toBeInTheDocument()
    expect(container.querySelector('aside')).toBeNull()
    expect(screen.queryByRole('link', { name: /download/i })).toBeNull()
  })

  it('splits body on blank lines into separate paragraphs', () => {
    render(<AboutSection data={richSlab} />)
    const paragraphs = screen.getAllByText(/paragraph/i)
    expect(paragraphs).toHaveLength(2)
  })

  it('renders sideNote text when present', () => {
    const { container } = render(<AboutSection data={richSlab} />)
    const aside = container.querySelector('aside')
    expect(aside).not.toBeNull()
    expect(aside).toHaveTextContent('Updated quarterly.')
  })

  it('renders the download link when present', () => {
    render(<AboutSection data={richSlab} />)
    const link = screen.getByRole('link', { name: /download resume/i })
    expect(link).toHaveAttribute('href', '/resume.pdf')
  })
})
