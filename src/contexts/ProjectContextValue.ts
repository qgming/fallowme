import { createContext, useContext } from 'react'
import type { Project } from '@/types/project'

export interface ProjectContextType {
  projects: Project[]
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function useProjects() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjects 必须在 ProjectProvider 内使用')
  }
  return context
}
