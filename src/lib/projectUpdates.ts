import type { Project, ProjectLink } from '@/types/project'

export interface ProjectUpdateInfo {
  version?: string
  publishedAt?: string
  changeLog?: string
  links: ProjectLink[]
}

interface ReadflowUpdateResponse {
  version?: string
  changeLog?: string
  downloadUrl?: string
  backupUrl?: string
}

interface ShenbiDownloadItem {
  packageKind?: string
  url?: string
}

interface ShenbiUpdateResponse {
  version?: string
  notes?: string
  publishedAt?: string
  downloads?: Record<string, ShenbiDownloadItem>
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isReadflowUpdateResponse(value: unknown): value is ReadflowUpdateResponse {
  return isRecord(value) && ('changeLog' in value || 'downloadUrl' in value || 'backupUrl' in value)
}

function isShenbiUpdateResponse(value: unknown): value is ShenbiUpdateResponse {
  return isRecord(value) && ('notes' in value || 'downloads' in value)
}

function normalizeReadflowUpdate(data: ReadflowUpdateResponse, fallbackLinks: ProjectLink[]): ProjectUpdateInfo {
  const links: ProjectLink[] = []

  if (typeof data.downloadUrl === 'string' && data.downloadUrl.length > 0) {
    links.push({ label: '下载', url: data.downloadUrl })
  }

  if (typeof data.backupUrl === 'string' && data.backupUrl.length > 0) {
    links.push({ label: '夸克网盘', url: data.backupUrl })
  }

  return {
    version: data.version,
    changeLog: data.changeLog,
    links: links.length > 0 ? links : fallbackLinks,
  }
}

function formatPlatformLabel(platform: string, packageKind?: string) {
  const normalized = platform.toLowerCase()

  if (normalized === 'windows-x64') {
    return 'Windows'
  }

  if (normalized === 'android-arm64') {
    return 'Android'
  }

  if (packageKind) {
    return `${platform} (${packageKind.toUpperCase()})`
  }

  return platform
}

function stripMarkdown(text: string) {
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
}

function normalizeShenbiUpdate(data: ShenbiUpdateResponse, fallbackLinks: ProjectLink[]): ProjectUpdateInfo {
  const links: ProjectLink[] = []

  if (data.downloads) {
    Object.entries(data.downloads).forEach(([platform, item]) => {
      if (typeof item.url === 'string' && item.url.length > 0) {
        links.push({
          label: formatPlatformLabel(platform, item.packageKind),
          url: item.url,
        })
      }
    })
  }

  return {
    version: data.version,
    publishedAt: data.publishedAt,
    changeLog: typeof data.notes === 'string' ? stripMarkdown(data.notes) : undefined,
    links: links.length > 0 ? links : fallbackLinks,
  }
}

function normalizeUnknownUpdate(value: unknown, fallbackLinks: ProjectLink[]): ProjectUpdateInfo {
  if (isReadflowUpdateResponse(value)) {
    return normalizeReadflowUpdate(value, fallbackLinks)
  }

  if (isShenbiUpdateResponse(value)) {
    return normalizeShenbiUpdate(value, fallbackLinks)
  }

  return { links: fallbackLinks }
}

export async function fetchProjectUpdateInfo(project: Project): Promise<ProjectUpdateInfo> {
  if (!project.updateServiceUrl) {
    return { links: project.links }
  }

  const response = await fetch(project.updateServiceUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch update service for ${project.name}`)
  }

  const data: unknown = await response.json()
  return normalizeUnknownUpdate(data, project.links)
}
