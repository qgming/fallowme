import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  index?: number
}

// 6种不对称的有机边框半径变化
const organicRadii = [
  'rounded-tl-[4rem] rounded-tr-[2rem] rounded-bl-[2rem] rounded-br-[3rem]',
  'rounded-tl-[2rem] rounded-tr-[5rem] rounded-bl-[3rem] rounded-br-[2rem]',
  'rounded-tl-[3rem] rounded-tr-[2rem] rounded-bl-[4rem] rounded-br-[2rem]',
  'rounded-tl-[2rem] rounded-tr-[3rem] rounded-bl-[2rem] rounded-br-[5rem]',
  'rounded-tl-[5rem] rounded-tr-[2rem] rounded-bl-[2rem] rounded-br-[4rem]',
  'rounded-tl-[2rem] rounded-tr-[4rem] rounded-bl-[5rem] rounded-br-[2rem]',
]

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const radiusClass = organicRadii[index % organicRadii.length]

  return (
    <Link to={`/projects/${project.id}`} className="group block">
      <article
        className={`
          relative overflow-hidden border border-border bg-card
          transition-all duration-500 ease-out
          hover:-translate-y-2 shadow-soft hover:shadow-float
          ${radiusClass}
        `}
      >
        <div className="relative p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <h3
                className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                {project.title}
              </h3>
              <p className="text-base text-muted" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {project.subtitle}
              </p>
            </div>

            {/* Arrow Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-all duration-300">
              <ArrowRight className="w-5 h-5 text-accent group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted line-clamp-3 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {project.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-end pt-4 border-t border-border/30">
            <span
              className="text-sm font-semibold text-accent group-hover:underline"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              查看详情 →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
