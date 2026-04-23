'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { BackButton } from '@/components/layout/BackButton'

const PROJECTS = [
  {
    title: '12-24V Buck Boost Converter',
    sub: 'Altium Designer · WARG',
    year: 'Oct – Nov 2025',
    tagline: '500W 2-Phase Interleaved design for competition drone rapid charging, achieving >90% efficiency.',
  },
  {
    title: '5-3.3V LDO Voltage Regulator',
    sub: 'Altium Designer · WARG',
    year: 'Sep – Oct 2025',
    tagline: 'Custom schematic + PCB layout achieving <9 mV voltage ripple from 5+ translated datasheets.',
  },
  {
    title: 'Patient Env. Management System',
    sub: 'Python · Flask · Raspberry Pi',
    year: 'Oct – Nov 2025',
    tagline: 'Real-time environment regulator reducing Hospital Induced Delirium risk, responding in <500 ms.',
  },
]

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function ProjectsPage() {
  const reduced = useReducedMotion()

  return (
    <main className="dest-page">
      <header className="dest-header">
        <BackButton />
        <div className="dest-eyebrow">
          <span className="dest-eyebrow-num">02</span>
          <span className="dest-eyebrow-sep">·</span>
          <span>Projects</span>
        </div>
      </header>

      <p className="dest-wip-note">Case studies in progress.</p>

      <div className="proj-grid">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title}
            className="proj-card"
            initial={reduced ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: i * 0.1, ease }}
          >
            <div className="proj-card-top">
              <span className="proj-card-year">{p.year}</span>
              <span className="proj-card-sub">{p.sub}</span>
            </div>
            <h2 className="proj-card-title">{p.title}</h2>
            <p className="proj-card-tagline">{p.tagline}</p>
          </motion.article>
        ))}
      </div>
    </main>
  )
}
