import type { Role } from '@/types/content'
import { Ornament } from '@/components/layout/Ornament'

export interface RoleCardProps {
  role: Role
}

function formatEnd(end: string): string {
  return end === 'present' ? 'Present' : end
}

export function RoleCard({ role }: RoleCardProps) {
  const { title, company, location, start, end, summary, bullets, stack } = role

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-12">
      <header className="mb-6">
        <h1 className="menu-label text-3xl text-[var(--color-cream)]">{title}</h1>
        <p className="mt-2 text-[var(--color-cream-dim)]">
          <span className="text-[var(--color-gold-bright)]">{company}</span>
          <span className="mx-2 text-[var(--color-cream-faint)]">·</span>
          <span>{location}</span>
        </p>
        <Ornament variant="divider" className="mt-4" />
        <p className="mt-3 menu-label text-xs tracking-widest text-[var(--color-cream-faint)]">
          <span>{start}</span>
          <span className="mx-2">—</span>
          <span>{formatEnd(end)}</span>
        </p>
      </header>

      <p className="leading-relaxed text-[var(--color-cream-dim)]">{summary}</p>

      {bullets.length > 0 && (
        <ul className="mt-6 list-disc space-y-2 pl-6 text-[var(--color-cream-dim)] marker:text-[var(--color-gold)]/60">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}

      {stack && stack.length > 0 && (
        <footer className="mt-8 border-t border-[var(--color-gold)]/20 pt-6">
          <ul className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s} className="menu-label border border-[var(--color-gold)]/40 px-2 py-0.5 text-[10px] text-[var(--color-cream)]">
                {s}
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  )
}
