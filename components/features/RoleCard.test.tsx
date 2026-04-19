import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { RoleCard } from './RoleCard'
import type { Role } from '@/types/content'

const tbdRole: Role = {
  slug: 'warg', title: 'Electrical Subsystem Member',
  company: 'Waterloo Aerial Robotics Group', location: 'TBD',
  start: '2025-09', end: 'present', summary: 'TBD', bullets: [],
}

const richRole: Role = {
  slug: 'demo', title: 'Engineer', company: 'DemoCo', location: 'Remote',
  start: '2024-01', end: '2024-12', summary: 'Did things.',
  bullets: ['Shipped X', 'Measured Y'], stack: ['Python', 'Rust'],
}

describe('RoleCard', () => {
  it('renders a TBD-summary role with no bullets or stack', () => {
    render(<RoleCard role={tbdRole} />)
    expect(screen.getByRole('heading', { level: 1, name: /electrical subsystem member/i })).toBeInTheDocument()
    expect(screen.getByText(/waterloo aerial robotics group/i)).toBeInTheDocument()
    expect(screen.getByText(/present/i)).toBeInTheDocument()
    expect(screen.queryByRole('list')).toBeNull()
  })

  it('renders a date range with a literal end date', () => {
    render(<RoleCard role={richRole} />)
    expect(screen.getByText(/2024-01/)).toBeInTheDocument()
    expect(screen.getByText(/2024-12/)).toBeInTheDocument()
  })

  it('renders bullets and stack pills when populated', () => {
    render(<RoleCard role={richRole} />)
    expect(screen.getByText('Shipped X')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
  })
})
