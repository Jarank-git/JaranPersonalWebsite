import { notFound } from 'next/navigation'
import { ProjectCard } from '@/components/features/ProjectCard'
import { getProject } from '@/lib/content'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  return (
    <main className="min-h-screen">
      <ProjectCard project={project} />
    </main>
  )
}
