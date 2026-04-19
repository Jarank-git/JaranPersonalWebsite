import { describe, it, expect } from 'vitest'
import { parentPath, segmentTitle } from './path'

describe('parentPath', () => {
  it('returns "/" at the root', () => {
    expect(parentPath('/')).toBe('/')
  })

  it('drops one segment', () => {
    expect(parentPath('/projects')).toBe('/')
    expect(parentPath('/projects/arctic')).toBe('/projects')
    expect(parentPath('/experience/civilcraft')).toBe('/experience')
  })

  it('handles trailing slashes', () => {
    expect(parentPath('/projects/')).toBe('/')
    expect(parentPath('/projects/arctic/')).toBe('/projects')
  })

  it('handles double slashes defensively', () => {
    expect(parentPath('/projects//arctic')).toBe('/projects')
  })

  it('handles empty string as root', () => {
    expect(parentPath('')).toBe('/')
  })
})

describe('segmentTitle', () => {
  it('returns "MAIN" for the root segment', () => {
    expect(segmentTitle('')).toBe('MAIN')
    expect(segmentTitle('/')).toBe('MAIN')
  })

  it('uppercases a bare segment', () => {
    expect(segmentTitle('projects')).toBe('PROJECTS')
    expect(segmentTitle('about')).toBe('ABOUT')
  })

  it('passes through known segment labels', () => {
    expect(segmentTitle('experience')).toBe('EXPERIENCE')
    expect(segmentTitle('contact')).toBe('CONTACT')
  })

  it('kebab-case slugs become spaced uppercase', () => {
    expect(segmentTitle('ross-security')).toBe('ROSS SECURITY')
    expect(segmentTitle('ai-chatbots')).toBe('AI CHATBOTS')
  })

  it('trims leading/trailing slashes', () => {
    expect(segmentTitle('/projects/')).toBe('PROJECTS')
  })
})
