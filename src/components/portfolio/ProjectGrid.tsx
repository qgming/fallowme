import type { ReactNode } from 'react'

interface ProjectGridProps {
  children: ReactNode
}

export default function ProjectGrid({ children }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  )
}
