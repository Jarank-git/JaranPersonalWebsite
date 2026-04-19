import { MenuStack } from '@/components/menu/MenuStack'
import { projects, toProjectMenuItem } from '@/lib/content'

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <MenuStack items={projects.map(toProjectMenuItem)} ariaLabel="Projects" />
      </div>
    </main>
  )
}
