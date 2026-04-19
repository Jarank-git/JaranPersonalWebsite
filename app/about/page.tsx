import { MenuStack } from '@/components/menu/MenuStack'
import { Ornament } from '@/components/layout/Ornament'
import { aboutSlabs, toAboutMenuItem } from '@/lib/content'

export default function AboutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <div className="mb-10 text-center">
          <h1 className="menu-label gold-text text-4xl md:text-5xl tracking-[0.2em]">About</h1>
          <Ornament variant="divider" className="mt-4" />
        </div>
        <MenuStack items={aboutSlabs.map(toAboutMenuItem)} ariaLabel="About sections" />
      </div>
    </main>
  )
}
