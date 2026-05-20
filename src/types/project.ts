export interface Project {
  name: string
  avatar?: string
  summary: string
  tags: string[]
  links: ProjectLink[]
}

export interface ProjectLink {
  label: string
  url: string
}
