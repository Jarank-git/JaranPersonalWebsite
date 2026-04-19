import { MenuStack } from '@/components/menu/MenuStack'
import { Ornament } from '@/components/layout/Ornament'
import { experience, toRoleMenuItem } from '@/lib/content'

export default function ExperiencePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <div className="mb-10 text-center">
          <h1 className="menu-label gold-text text-4xl md:text-5xl tracking-[0.2em]">Experience</h1>
          <Ornament variant="divider" className="mt-4" />
        </div>
        <MenuStack items={experience.map(toRoleMenuItem)} ariaLabel="Experience" />
      </div>
    </main>
  )
}
