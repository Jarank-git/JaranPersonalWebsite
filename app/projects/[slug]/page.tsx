import { notFound } from 'next/navigation'
import { ProjectCard } from '@/components/features/ProjectCard'
import { BackButton } from '@/components/layout/BackButton'
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
      <BackButton />
      <ProjectCard project={project} />
    </main>
  )
}
