import {
  Apple,
  Cloud,
  Download,
  ExternalLink,
  GitFork,
  MonitorDown,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import type { Project, ProjectLink } from '@/types/project'
import type { ProjectUpdateInfo } from '@/lib/projectUpdates'

export interface ProjectAction {
  label: string
  href: string
  icon: LucideIcon
}

function linkText(label: string, url: string) {
  return `${label} ${url}`.toLowerCase()
}

export function getProjectLinkIcon(label: string, url: string): LucideIcon {
  const text = linkText(label, url)

  if (/android|apk/.test(text)) {
    return Smartphone
  }

  if (/windows|win32|win64|win-x64|windows-x64|\.exe|\.msi/.test(text)) {
    return MonitorDown
  }

  if (/macos|darwin|\bmac\b|ios|iphone|ipad|\.dmg|\.pkg|\.ipa/.test(text)) {
    return Apple
  }

  if (/github|github\.com/.test(text)) {
    return GitFork
  }

  if (/夸克|百度网盘|飞书|网盘|pan\.|cloud|my\.feishu\.cn/.test(text)) {
    return Cloud
  }

  if (/下载|download|release|releases/.test(text)) {
    return Download
  }

  return ExternalLink
}

export function getProjectLinkLabel(label: string, url: string) {
  const normalizedUrl = url.toLowerCase()
  const text = linkText(label, url)

  if (normalizedUrl.includes('pan.quark.cn')) {
    return '夸克网盘'
  }

  if (normalizedUrl.includes('pan.baidu.com')) {
    return '百度网盘'
  }

  if (normalizedUrl.includes('my.feishu.cn')) {
    return '飞书'
  }

  if (/android|apk/.test(text)) {
    return 'Android'
  }

  if (/windows|win32|win64|win-x64|windows-x64|\.exe|\.msi/.test(text)) {
    return 'Windows'
  }

  if (/macos|darwin|\bmac\b|\.dmg|\.pkg/.test(text)) {
    return 'macOS'
  }

  if (/ios|iphone|ipad|\.ipa/.test(text)) {
    return 'iOS'
  }

  return label
}

export function getProjectActions(project: Project, updateInfo?: ProjectUpdateInfo): ProjectAction[] {
  const links: ProjectLink[] = updateInfo?.links ?? project.links

  return links.map((link) => ({
    label: getProjectLinkLabel(link.label, link.url),
    href: link.url,
    icon: getProjectLinkIcon(link.label, link.url),
  }))
}
