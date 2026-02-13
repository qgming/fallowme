import type { Project } from '@/types/project'
import BentoCard from './BentoCard'

interface BentoGridProps {
  projects: Project[]
}

// 创建一个包装组件来使用 hook
function AnimatedCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="transition-all duration-700 opacity-100 translate-y-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <BentoCard project={project} />
    </div>
  )
}

export default function BentoGrid({ projects }: BentoGridProps) {
  return (
    <div className="uniform-grid">
      {projects.map((project, index) => (
        <AnimatedCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
