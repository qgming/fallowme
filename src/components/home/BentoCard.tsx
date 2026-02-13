import { Link } from 'react-router-dom'
import type { Project } from '@/types/project'
import GlassCard from '@/components/ui/GlassCard'
import { ArrowRight } from 'lucide-react'

interface BentoCardProps {
  project: Project
}

export default function BentoCard({ project }: BentoCardProps) {
  return (
    <Link to={`/projects/${project.id}`}>
      <GlassCard className="group h-full overflow-hidden !p-5 md:!p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
          {/* 顶部区域：Logo 和箭头 */}
          <div className="flex items-center gap-4 md:flex-shrink-0">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl overflow-hidden bg-accent/5 flex items-center justify-center border border-border/50 flex-shrink-0">
              {project.icon ? (
                <img
                  src={project.icon}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-accent">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* 移动端箭头 */}
            <div className="md:hidden ml-auto">
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* 信息区域 */}
          <div className="flex-1 min-w-0">
            {/* 标题和版本 */}
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 truncate">
                {project.title}
              </h3>
              {project.version && (
                <span className="px-2.5 md:px-2.5 py-1 md:py-1 text-xs font-medium bg-accent/10 text-accent rounded-full whitespace-nowrap">
                  {project.version}
                </span>
              )}
            </div>

            {/* 副标题 */}
            <p className="text-base md:text-base text-muted line-clamp-2 mb-3 md:mb-3">
              {project.subtitle}
            </p>

            {/* 标签胶囊 */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 md:gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2.5 md:px-3 py-1 md:py-1 text-xs font-medium bg-foreground/5 text-muted hover:bg-foreground/10 rounded-full transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 桌面端箭头图标 */}
          <div className="hidden md:block flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
              <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}
