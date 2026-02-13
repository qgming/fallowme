import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { Project } from '@/types/project'
import projectsData from '@/data/projects.json'

interface ProjectContextType {
  projects: Project[]
  getProjectById: (id: string) => Project | undefined
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const projects = projectsData.projects as Project[]

  const getProjectById = (id: string) => {
    return projects.find((project) => project.id === id)
  }

  return (
    <ProjectContext.Provider value={{ projects, getProjectById }}>
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
