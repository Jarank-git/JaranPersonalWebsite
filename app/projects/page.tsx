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

export default function ProjectsPage() {
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
        {PROJECTS.map((p) => (
          <article key={p.title} className="proj-card">
            <div className="proj-card-top">
              <span className="proj-card-year">{p.year}</span>
              <span className="proj-card-sub">{p.sub}</span>
            </div>
            <h2 className="proj-card-title">{p.title}</h2>
            <p className="proj-card-tagline">{p.tagline}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
