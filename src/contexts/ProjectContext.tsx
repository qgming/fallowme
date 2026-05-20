import type { ReactNode } from 'react'
import projectsData from '@/data/projects.json'
import { ProjectContext } from '@/contexts/ProjectContextValue'

export function ProjectProvider({ children }: { children: ReactNode }) {
  const projects = projectsData

  return (
    <ProjectContext.Provider value={{ projects }}>
      {children}
    </ProjectContext.Provider>
  )
}
