import { Calendar, Download, ExternalLink, GitFork, X } from 'lucide-react'
import type { Project, ProjectLink } from '@/types/project'
import type { ProjectUpdateInfo } from '@/lib/projectUpdates'

interface ProjectUpdateModalProps {
  project: Project
  updateInfo: ProjectUpdateInfo
  onClose: () => void
}

function isGithubLink(label: string, url: string) {
  return /github/i.test(label) || /github\.com/i.test(url)
}

function renderLinkIcon(label: string, url: string) {
  if (isGithubLink(label, url)) {
    return <GitFork className="h-4 w-4" />
  }

  if (/下载|夸克|百度网盘|windows|android|apk|exe/i.test(label)) {
    return <Download className="h-4 w-4" />
  }

  return <ExternalLink className="h-4 w-4" />
}

function getChangeLogLines(changeLog?: string) {
  if (!changeLog) {
    return []
  }

  return changeLog
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function cleanChangeLogLine(line: string) {
  return line.replace(/^(?:[-*]|\d+[.、])\s+/, '')
}

function UpdateLink({ link }: { link: ProjectLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-[8px] border border-border bg-background px-3 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-foreground"
    >
      {renderLinkIcon(link.label, link.url)}
      {link.label}
    </a>
  )
}

export default function ProjectUpdateModal({ project, updateInfo, onClose }: ProjectUpdateModalProps) {
  const changeLogLines = getChangeLogLines(updateInfo.changeLog)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-4 py-6 backdrop-blur-md"
      role="presentation"
      onClick={onClose}
    >
      <section
        aria-labelledby="project-update-title"
        aria-modal="true"
        role="dialog"
        className="max-h-[min(720px,90vh)] w-full max-w-2xl overflow-hidden rounded-[8px] border border-border bg-card shadow-subtle"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">更新日志</p>
            <div className="mt-2 flex flex-wrap items-center gap-2.5">
              <h3 id="project-update-title" className="text-xl font-semibold text-foreground">
                {project.name}
              </h3>
              {updateInfo.version && (
                <span className="rounded-[8px] border border-accent/25 bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                  v{updateInfo.version}
                </span>
              )}
            </div>
            {updateInfo.publishedAt && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted">
                <Calendar className="h-3.5 w-3.5" />
                {updateInfo.publishedAt}
              </p>
            )}
          </div>

          <button
            type="button"
            aria-label="关闭更新日志"
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[8px] border border-border text-muted transition-colors hover:border-accent hover:text-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(min(720px,90vh)-88px)] overflow-y-auto px-5 py-5 md:px-6">
          {changeLogLines.length > 0 ? (
            <ol className="space-y-3 text-sm leading-6 text-muted">
              {changeLogLines.map((line, index) => (
                <li key={`${project.name}-change-${index}`} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[8px] bg-accent/10 text-xs font-medium text-accent">
                    {index + 1}
                  </span>
                  <span>{cleanChangeLogLine(line)}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted">暂无更新日志。</p>
          )}

          {updateInfo.links.length > 0 && (
            <div className="mt-6 border-t border-border pt-4">
              <p className="mb-3 text-xs font-medium text-foreground">下载地址</p>
              <div className="flex flex-wrap gap-2">
                {updateInfo.links.map((link) => (
                  <UpdateLink key={`${project.name}-${link.label}-${link.url}`} link={link} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
