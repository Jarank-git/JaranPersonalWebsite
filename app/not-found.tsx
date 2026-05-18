import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
      gap: 24,
      textAlign: 'center',
      padding: '0 24px',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 400,
        fontSize: 'clamp(28px, 6vw, 56px)',
        letterSpacing: '0.08em',
        color: 'var(--color-parchment)',
        margin: 0,
      }}>
        Page Not Found
      </h1>
      <Link href="/" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '11px',
        letterSpacing: '0.26em',
        textTransform: 'uppercase',
        color: 'var(--color-parchment-dim)',
        textDecoration: 'none',
        borderBottom: '1px solid oklch(0.55 0.04 70 / 0.4)',
        paddingBottom: '2px',
      }}>
        ← Return
      </Link>
    </main>
  )
}
