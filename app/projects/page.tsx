'use client'

import { useState, useCallback, useEffect } from 'react'
import { BackButton } from '@/components/layout/BackButton'
import { ProjectOverlay } from '@/components/projects/ProjectOverlay'
import type { ProjectEntry } from '@/components/projects/ProjectOverlay'

const PROJECTS: ProjectEntry[] = [
  {
    id: 'buck-boost',
    num: '01',
    title: '12–24V Buck Boost Converter',
    sub: 'Altium Designer · WARG',
    year: 'Oct–Nov 2025',
    category: 'Hardware',
    tagline:
      '500W 2-Phase Interleaved design for competition drone rapid charging, achieving >90% efficiency across the full load range.',
    overview:
      'Designed a 500W 2-Phase Interleaved Buck-Boost converter in Altium Designer for the WARG competition drone power system. The converter steps between 12V and 24V rails, achieving greater than 90% conversion efficiency across the full load range.',
    bullets: [
      'Designed full schematic and PCB layout from 5+ translated component datasheets',
      '2-phase interleaving reduces current ripple significantly at high power loads',
      'Validated design with LTspice simulation before fabrication',
      'Implemented on the final WARG competition drone power system',
    ],
    stack: ['Altium Designer', 'LTspice', 'Power Electronics', 'PCB Layout'],
    links: [],
    images: [],
    icon: null,
  },
  {
    id: 'ldo',
    num: '02',
    title: '5–3.3V LDO Voltage Regulator',
    sub: 'Altium Designer · WARG',
    year: 'Sep–Oct 2025',
    category: 'Hardware',
    tagline:
      'Custom schematic + PCB layout achieving <9 mV voltage ripple from 5+ translated datasheets.',
    overview:
      'Custom 5V to 3.3V LDO voltage regulator designed in Altium Designer for WARG drone avionics power distribution. Achieved sub-9 mV output voltage ripple through careful layout, component selection, and decoupling strategy.',
    bullets: [
      'Translated 5+ component datasheets to derive full schematic from scratch',
      'Optimised PCB layout for thermal performance and minimal output ripple',
      'Validated output ripple and stability with oscilloscope and multimeter',
      'Made 25+ layout corrections through bench soldering and re-test cycles',
    ],
    stack: ['Altium Designer', 'Oscilloscope', 'Soldering', 'PCB Layout'],
    links: [],
    images: [],
    icon: null,
  },
  {
    id: 'pems',
    num: '03',
    title: 'Patient Environment Management System',
    sub: 'Python · Flask · Raspberry Pi',
    year: 'Oct–Nov 2025',
    category: 'Software · Embedded',
    tagline:
      'Real-time environment regulator reducing Hospital Induced Delirium risk, responding in <500 ms.',
    overview:
      'A Raspberry Pi–based closed-loop system that monitors and regulates patient room conditions — temperature, lighting, and ambient sound — to reduce the risk of Hospital Induced Delirium. Built with a Python/Flask backend and real-time sensor polling over I²C.',
    bullets: [
      'Closed-loop control of temperature, lighting level, and ambient noise',
      'Sub-500 ms response time to environmental threshold breaches',
      'Flask dashboard for nursing staff to view live readings and override conditions',
      'Deployed on Raspberry Pi with I²C sensor bus; tested against clinical thresholds',
    ],
    stack: ['Python', 'Flask', 'Raspberry Pi', 'I²C', 'Sensors'],
    links: [],
    images: [],
    icon: null,
  },
]

export default function ProjectsPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = PROJECTS.find((p) => p.id === openId) ?? null

  const close = useCallback(() => setOpenId(null), [])
  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    [],
  )

  useEffect(() => {
    if (!openId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openId, close])

  return (
    <main className="proj-page">
      <div className="proj-nav">
        <BackButton />
      </div>

      <div className="proj-list">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            className="proj-entry"
            data-open={openId === p.id ? 'true' : undefined}
            onClick={() => toggle(p.id)}
            aria-expanded={openId === p.id}
            aria-label={`Open ${p.title}`}
          >
            {/* Header: icon + title/description */}
            <div className="proj-entry-header">
              <div className={`proj-entry-icon${!p.icon ? ' proj-entry-icon-empty' : ''}`}>
                {p.icon && <img src={p.icon} alt="" />}
              </div>
              <div className="proj-entry-info">
                <span className="proj-entry-title">{p.title}</span>
                <span className="proj-entry-sub">{p.sub}</span>
                <span className="proj-entry-tagline">{p.tagline}</span>
              </div>
            </div>

            {/* Preview images */}
            {p.images.length > 0 && (
              <div className="proj-entry-gallery">
                {p.images.slice(0, 2).map((img) => (
                  <div key={img.src} className="proj-entry-gallery-img">
                    <img src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
            )}

            {/* Stack tags */}
            {p.stack.length > 0 && (
              <div className="proj-entry-tags">
                {p.stack.map((s) => (
                  <span key={s} className="proj-entry-tag">{s}</span>
                ))}
              </div>
            )}

            {/* Bottom links */}
            {p.links.length > 0 && (
              <div className="proj-entry-links">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-entry-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {openProject && (
        <ProjectOverlay
          key={openProject.id}
          project={openProject}
          onClose={close}
        />
      )}
    </main>
  )
}
