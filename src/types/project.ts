export interface Project {
  name: string
  avatar?: string
  summary: string
  updateServiceUrl?: string
  qrCodeImage?: string
  qrCodeLabel?: string
  tags: string[]
  links: ProjectLink[]
}

export interface ProjectLink {
  label: string
  url: string
}
