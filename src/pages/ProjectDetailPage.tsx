import { useParams, Navigate } from 'react-router-dom'
import { useProjects } from '@/contexts/ProjectContext'
import ProjectHero from '@/components/project/ProjectHero'
import FeatureGrid from '@/components/project/FeatureGrid'
import Changelog from '@/components/project/Changelog'
import GlassCard from '@/components/ui/GlassCard'

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getProjectById } = useProjects()

  if (!id) {
    return <Navigate to="/" replace />
  }

  const project = getProjectById(id)

  if (!project) {
    return <Navigate to="/404" replace />
  }

  return (
    <div className="relative min-h-screen">
      {/* Hero 区域 */}
      <ProjectHero project={project} />

      {/* 项目介绍 */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <GlassCard className="p-8">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">关于 {project.title}</h2>
                <p className="text-lg text-muted leading-relaxed">{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-accent/10 text-accent rounded-full border border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {project.icon && (
                <div className="hidden md:block w-24 h-24 rounded-2xl overflow-hidden bg-accent/5 flex items-center justify-center border border-border/50 flex-shrink-0">
                  <img
                    src={project.icon}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 核心功能 */}
      {project.features && project.features.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <FeatureGrid features={project.features} />
          </div>
        </section>
      )}

      {/* 更新日志 */}
      {project.changelog && project.changelog.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <Changelog changelog={project.changelog} />
          </div>
        </section>
      )}

    </div>
  )
}
