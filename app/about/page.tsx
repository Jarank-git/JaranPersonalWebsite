import { MenuStack } from '@/components/menu/MenuStack'
import { aboutSlabs, toAboutMenuItem } from '@/lib/content'

export default function AboutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <MenuStack items={aboutSlabs.map(toAboutMenuItem)} ariaLabel="About sections" />
      </div>
    </main>
  )
}
