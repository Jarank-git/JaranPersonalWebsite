import Image from 'next/image'
import type { Project, ProjectLink } from '@/types/content'

export interface ProjectCardProps {
  project: Project
}

const KIND_LABEL: Record<ProjectLink['kind'], string> = {
  github: 'Source',
  demo: 'Live',
  writeup: 'Writeup',
  other: 'Link',
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, tagline, year, stack, images, summary, bullets, links } = project

  return (
    <article className="project-card">
      <header className="project-card-header">
        <h1 className="project-card-title">{title}</h1>
        <p className="project-card-tagline">{tagline}</p>
        <hr className="project-card-rule" aria-hidden="true" />
        <div className="project-card-meta">
          <span className="project-card-meta-label">Year</span>
          <span className="project-card-meta-value">{year}</span>
          {stack.length > 0 && (
            <>
              <span className="project-card-meta-label">Stack</span>
              <span className="project-card-meta-value">{stack.join(' · ')}</span>
            </>
          )}
        </div>
      </header>

      {images.length > 0 && (
        <section aria-label="Gallery" className="project-card-gallery">
          {images.map((img) => (
            <figure key={img.src} className="project-card-figure">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="project-card-img"
              />
              {img.caption && (
                <figcaption className="project-card-caption">{img.caption}</figcaption>
              )}
            </figure>
          ))}
        </section>
      )}

      <div className="project-card-body">
        <p className="project-card-summary">{summary}</p>
        {bullets.length > 0 && (
          <ul className="project-card-bullets">
            {bullets.map((b, i) => (
              <li key={i} className="project-card-bullet">
                <span className="project-card-bullet-mark" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {links.length > 0 && (
        <footer className="project-card-footer">
          <span className="project-card-links-label">Links</span>
          <ul className="project-card-links">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="project-card-link"
                >
                  {KIND_LABEL[l.kind]} · {l.label}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  )
}
