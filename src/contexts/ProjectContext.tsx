import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { Project } from '@/types/project'
import projectsData from '@/data/projects.json'

interface ProjectContextType {
  projects: Project[]
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const projects = projectsData as Project[]

  return (
    <ProjectContext.Provider value={{ projects }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjects 必须在 ProjectProvider 内使用')
  }
  return context
}
