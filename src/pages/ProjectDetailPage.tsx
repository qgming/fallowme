import { useParams, Navigate, Link } from 'react-router-dom'
import { useProjects } from '@/contexts/ProjectContext'
import ProjectHero from '@/components/project/ProjectHero'
import FeatureGrid from '@/components/project/FeatureGrid'
import ScreenshotCarousel from '@/components/project/ScreenshotCarousel'
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
            <p className="text-lg text-muted leading-relaxed">{project.description}</p>
          </GlassCard>
        </div>
      </section>

      {/* 应用截图 */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <ScreenshotCarousel screenshots={project.screenshots} />
          </div>
        </section>
      )}

      {/* 核心功能 */}
      {project.features && project.features.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <FeatureGrid features={project.features} />
          </div>
        </section>
      )}

      {/* 底部协议链接 */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex justify-center items-center gap-3">
            <Link
              to="/privacy-policy"
              className="glass-card px-6 py-2.5 rounded-full text-sm font-medium text-muted hover:text-foreground hover:bg-accent/10 transition-all duration-300"
            >
              隐私政策
            </Link>
            <Link
              to="/terms-of-service"
              className="glass-card px-6 py-2.5 rounded-full text-sm font-medium text-muted hover:text-foreground hover:bg-accent/10 transition-all duration-300"
            >
              用户协议
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
