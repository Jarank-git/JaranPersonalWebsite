import { ChronicleLayout } from '@/components/layout/ChronicleLayout'
import { aboutSlabs } from '@/lib/content'

export default function AboutPage() {
  const bio = aboutSlabs.find((s) => s.slug === 'bio')
  const edu = aboutSlabs.find((s) => s.slug === 'education')

  return (
    <ChronicleLayout
      eyebrow={'Chapter I \u00B7 Dossier'}
      title="About"
      titleSub="THE AUTHOR"
      lead="An electrical engineering student at the University of Waterloo, drawn to the intersection of hardware, software, and systems that work."
    >
      <p>{bio?.body || 'TBD'}</p>
      <h3>Vital Statistics</h3>
      <ul className="clean">
        <li>
          <span className="k">Program</span>
          <span className="v">Electrical Engineering</span>
        </li>
        <li>
          <span className="k">University</span>
          <span className="v">University of Waterloo</span>
        </li>
        <li>
          <span className="k">Education</span>
          <span className="v">{edu?.body || 'TBD'}</span>
        </li>
      </ul>
    </ChronicleLayout>
  )
}
