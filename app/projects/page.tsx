import { ChronicleLayout } from '@/components/layout/ChronicleLayout'
import { projects } from '@/lib/content'

export default function ProjectsPage() {
  return (
    <ChronicleLayout
      eyebrow={'Chapter II \u00B7 The Archive'}
      title="Projects"
      titleSub="SELECTED WORK"
      lead={'A handful of works from recent expeditions \u2014 each one shaped by the problem, the team, and what the project demanded.'}
    >
      {projects.map((p) => (
        <div key={p.slug} className="project-card">
          <div className="project-card-tag">
            {p.year} {'\u00B7'} {p.stack.join(' \u00B7 ') || 'Project'}
          </div>
          <div className="project-card-title">{p.title}</div>
          <div className="project-card-desc">{p.summary || p.tagline}</div>
        </div>
      ))}
    </ChronicleLayout>
  )
}
