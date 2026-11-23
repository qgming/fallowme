export interface Project {
  id: string
  name: string
  icon: string
  kind: string
  summary: string
  links: ProjectLink[]
}

export interface ProjectLink {
  label: string
  url: string
}
