import { describe, it, expect } from 'vitest'
import {
  projects, experience, aboutSlabs, contactLinks,
  toProjectMenuItem, toRoleMenuItem, toAboutMenuItem, toContactMenuItem,
  getProject, getRole, getAboutSlab, getContactLink,
  MAIN_ITEMS,
} from './content'

describe('content seeds', () => {
  it('has exactly 2 projects with expected slugs', () => {
    expect(projects).toHaveLength(2)
    expect(projects.map((p) => p.slug).sort()).toEqual(['arctic', 'ldo'])
  })

  it('has exactly 4 experience roles in most-recent-first order', () => {
    expect(experience).toHaveLength(4)
    expect(experience.map((r) => r.slug)).toEqual([
      'warg', 'renellence', 'civilcraft', 'codeninjas',
    ])
  })

  it('has exactly 3 about slabs with default shape', () => {
    expect(aboutSlabs).toHaveLength(3)
    expect(aboutSlabs.map((a) => a.slug)).toEqual(['bio', 'education', 'resume'])
  })

  it('has exactly 3 contact links with real URLs', () => {
    expect(contactLinks).toHaveLength(3)
    const byLink = Object.fromEntries(contactLinks.map((c) => [c.slug, c.href]))
    expect(byLink.email).toMatch(/^mailto:/)
    expect(byLink.linkedin).toMatch(/^https:\/\/(www\.)?linkedin\.com\//)
    expect(byLink.github).toMatch(/^https:\/\/(www\.)?github\.com\//)
  })

  it('project images follow /images/projects/<slug>/ convention', () => {
    for (const p of projects) {
      for (const img of p.images) {
        expect(img.src).toMatch(new RegExp(`^/images/projects/${p.slug}/`))
      }
    }
  })

  it('resume slab has a download link', () => {
    const resume = aboutSlabs.find((a) => a.slug === 'resume')
    expect(resume?.download?.href).toBe('/resume.pdf')
  })
})

describe('menu-item mappers', () => {
  it('toProjectMenuItem produces correct shape', () => {
    const mi = toProjectMenuItem(projects[0])
    expect(mi.label).toBe(projects[0].title)
    expect(mi.href).toBe(`/projects/${projects[0].slug}`)
    expect(mi.description).toBe(projects[0].tagline)
  })

  it('toRoleMenuItem produces correct shape', () => {
    const mi = toRoleMenuItem(experience[0])
    expect(mi.href).toBe(`/experience/${experience[0].slug}`)
    expect(mi.label).toBe(experience[0].title)
  })

  it('toAboutMenuItem produces correct shape', () => {
    const mi = toAboutMenuItem(aboutSlabs[0])
    expect(mi.href).toBe(`/about/${aboutSlabs[0].slug}`)
  })

  it('toContactMenuItem flags external contact links', () => {
    const email = contactLinks.find((c) => c.slug === 'email')!
    const linkedin = contactLinks.find((c) => c.slug === 'linkedin')!
    const miEmail = toContactMenuItem(email)
    const miLinkedin = toContactMenuItem(linkedin)
    expect(miEmail.external).toBe(false)
    expect(miLinkedin.external).toBe(true)
  })
})

describe('getters', () => {
  it('getProject returns match or undefined', () => {
    expect(getProject('arctic')?.slug).toBe('arctic')
    expect(getProject('nonsense')).toBeUndefined()
  })

  it('getRole returns match or undefined', () => {
    expect(getRole('warg')?.slug).toBe('warg')
    expect(getRole('nope')).toBeUndefined()
  })

  it('getAboutSlab returns match or undefined', () => {
    expect(getAboutSlab('bio')?.slug).toBe('bio')
    expect(getAboutSlab('nope')).toBeUndefined()
  })

  it('getContactLink returns match or undefined', () => {
    expect(getContactLink('email')?.slug).toBe('email')
    expect(getContactLink('nope')).toBeUndefined()
  })
})

describe('MAIN_ITEMS', () => {
  it('lists the four top-level sections in spec order', () => {
    expect(MAIN_ITEMS.map((i) => i.href)).toEqual([
      '/about', '/projects', '/experience', '/contact',
    ])
  })

  it('each main item has a non-empty label', () => {
    for (const item of MAIN_ITEMS) {
      expect(item.label.length).toBeGreaterThan(0)
    }
  })
})
