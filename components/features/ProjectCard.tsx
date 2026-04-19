import Image from 'next/image'
import type { Project, ProjectLink } from '@/types/content'
import { Ornament } from '@/components/layout/Ornament'

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
    <article className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="mb-6">
        <h1 className="menu-label text-3xl text-[var(--color-cream)]">{title}</h1>
        <p className="mt-2 text-[var(--color-cream-dim)]">{tagline}</p>
        <Ornament variant="divider" className="mt-4" />
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--color-cream-faint)]">
          <div className="flex items-center gap-2">
            <span className="menu-label tracking-widest">Year</span>
            <span className="text-[var(--color-gold-bright)]">{year}</span>
          </div>
          {stack.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="menu-label tracking-widest">Stack</span>
              <ul className="flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li key={s} className="menu-label border border-[var(--color-gold)]/40 px-2 py-0.5 text-[10px] text-[var(--color-cream)]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      {images.length > 0 && (
        <section aria-label="Gallery" className="mb-8 space-y-4">
          {images.map((img) => (
            <figure key={img.src} className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--color-gold)]/20 bg-[var(--color-obsidian-2)]">
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
              {img.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-obsidian)]/90 to-transparent px-4 py-2 text-xs text-[var(--color-cream-dim)]">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </section>
      )}

      <div className="space-y-4 text-[var(--color-cream-dim)] leading-relaxed">
        <p>{summary}</p>
      </div>

      {bullets.length > 0 && (
        <ul className="mt-6 list-disc space-y-2 pl-6 text-[var(--color-cream-dim)] marker:text-[var(--color-gold)]/60">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}

      {links.length > 0 && (
        <footer className="mt-8 border-t border-[var(--color-gold)]/20 pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noreferrer noopener"
                  className="menu-label text-sm text-[var(--color-gold-bright)] hover:text-[var(--color-cream)] focus-visible:outline-none focus-visible:text-[var(--color-cream)]">
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
