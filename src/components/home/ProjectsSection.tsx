import { useEffect, useState } from 'react'
import { CircleArrowUp, Download, ExternalLink, Github, QrCode, RefreshCw, type LucideIcon } from 'lucide-react'
import type { Project } from '@/types/project'
import { fetchProjectUpdateInfo, type ProjectUpdateInfo } from '@/lib/projectUpdates'
import ProjectQrModal from '@/components/home/ProjectQrModal'
import ProjectUpdateModal from '@/components/home/ProjectUpdateModal'

interface ProjectsSectionProps {
  projects: Project[]
}

type ProjectUpdateState = Record<string, ProjectUpdateInfo | undefined>

function getProjectActions(project: Project, updateInfo?: ProjectUpdateInfo) {
  const actions: Array<{ label: string; href: string; icon: LucideIcon }> = []
  const links = updateInfo?.links ?? project.links

  links.forEach((link) => {
    actions.push({ label: link.label, href: link.url, icon: getLinkIcon(link.label, link.url) })
  })

  return actions
}

function getProjectBadges(project: Project) {
  const githubLink = project.links.find((link) => isGithubLink(link.label, link.url))
  if (!githubLink) {
    return []
  }

  const match = githubLink.url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i)
  if (!match) {
    return []
  }

  const [, owner, repo] = match

  return [
    {
      label: 'Stars',
      src: `https://img.shields.io/github/stars/${owner}/${repo}?style=flat-square`,
    },
    {
      label: 'Last Commit',
      src: `https://img.shields.io/github/last-commit/${owner}/${repo}?style=flat-square`,
    },
    {
      label: 'Release',
      src: `https://img.shields.io/github/v/release/${owner}/${repo}?style=flat-square`,
    },
  ]
}

function getLinkIcon(label: string, url: string) {
  if (isGithubLink(label, url)) {
    return Github
  }

  if (/下载|夸克|百度网盘/i.test(label)) {
    return Download
  }

  return ExternalLink
}

function isGithubLink(label: string, url: string) {
  return /github/i.test(label) || /github\.com/i.test(url)
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [updates, setUpdates] = useState<ProjectUpdateState>({})
  const [failedUpdates, setFailedUpdates] = useState<Set<string>>(() => new Set())
  const [activeUpdateProjectName, setActiveUpdateProjectName] = useState<string | null>(null)
  const [activeQrProjectName, setActiveQrProjectName] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    projects.forEach((project) => {
      if (!project.updateServiceUrl) {
        return
      }

      fetchProjectUpdateInfo(project)
        .then((updateInfo) => {
          if (controller.signal.aborted) {
            return
          }

          setUpdates((currentUpdates) => ({ ...currentUpdates, [project.name]: updateInfo }))
        })
        .catch(() => {
          if (controller.signal.aborted) {
            return
          }

          setFailedUpdates((currentFailures) => new Set(currentFailures).add(project.name))
        })
    })

    return () => {
      controller.abort()
    }
  }, [projects])

  useEffect(() => {
    if (!activeUpdateProjectName && !activeQrProjectName) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveUpdateProjectName(null)
        setActiveQrProjectName(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeQrProjectName, activeUpdateProjectName])

  const activeUpdateProject = activeUpdateProjectName
    ? projects.find((project) => project.name === activeUpdateProjectName)
    : undefined
  const activeUpdateInfo = activeUpdateProjectName ? updates[activeUpdateProjectName] : undefined
  const activeQrProject = activeQrProjectName
    ? projects.find((project) => project.name === activeQrProjectName)
    : undefined

  return (
    <section id="projects" className="section-anchor border-y border-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-border pb-4 md:mb-10">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">项目</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {projects.map((project) => {
            const updateInfo = updates[project.name]
            const hasUpdateService = Boolean(project.updateServiceUrl)
            const isLoadingUpdate = hasUpdateService && !updateInfo && !failedUpdates.has(project.name)
            const actions = getProjectActions(project, updateInfo)
            const badges = getProjectBadges(project)
            const canOpenChangeLog = Boolean(updateInfo?.changeLog)
            const canOpenQrCode = Boolean(project.qrCodeImage)

            return (
              <article
                key={project.name}
                className="group flex h-full flex-col justify-between rounded-[8px] border border-border bg-card p-4 transition-all hover:border-accent hover:shadow-subtle md:p-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-border bg-background">
                      {project.avatar ? (
                        <img src={project.avatar} alt={project.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-lg font-semibold text-accent">{project.name.charAt(0)}</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl font-semibold tracking-tight text-foreground">{project.name}</h3>
                        {updateInfo?.version && (
                          <span className="inline-flex h-7 items-center rounded-[8px] border border-accent/25 bg-accent/10 px-2 text-xs font-medium text-accent">
                            v{updateInfo.version}
                          </span>
                        )}
                        {canOpenChangeLog && (
                          <button
                            type="button"
                            aria-label={`${project.name} 更新日志`}
                            title="更新日志"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] border border-border bg-background text-muted transition-colors hover:border-accent hover:text-foreground"
                            onClick={() => setActiveUpdateProjectName(project.name)}
                          >
                            <CircleArrowUp className="h-4 w-4" />
                          </button>
                        )}
                        {isLoadingUpdate && (
                          <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-border px-2 py-1 text-xs text-muted">
                            <RefreshCw className="h-3 w-3 animate-spin" />
                            同步中
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 truncate text-sm leading-6 text-muted" title={project.summary}>{project.summary}</p>
                    </div>
                  </div>

                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-[8px] border border-border bg-background px-2.5 py-1 text-xs text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {badges.map((badge) => (
                        <img
                          key={`${project.name}-${badge.label}`}
                          src={badge.src}
                          alt={badge.label}
                          className="h-5 rounded-[4px]"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {(actions.length > 0 || canOpenQrCode) && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {canOpenQrCode && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-[8px] border border-border bg-background px-3 py-2 text-sm text-muted transition-colors hover:border-accent hover:bg-card hover:text-foreground"
                        onClick={() => setActiveQrProjectName(project.name)}
                      >
                        <QrCode className="h-4 w-4" />
                        小程序
                      </button>
                    )}
                    {actions.map((action) => {
                      const Icon = action.icon

                      return (
                        <a
                          key={`${project.name}-${action.label}`}
                          href={action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-[8px] border border-border bg-background px-3 py-2 text-sm text-muted transition-colors hover:border-accent hover:bg-card hover:text-foreground"
                        >
                          <Icon className="h-4 w-4" />
                          {action.label}
                        </a>
                      )
                    })}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>

      {activeUpdateProject && activeUpdateInfo && (
        <ProjectUpdateModal
          project={activeUpdateProject}
          updateInfo={activeUpdateInfo}
          onClose={() => setActiveUpdateProjectName(null)}
        />
      )}

      {activeQrProject && (
        <ProjectQrModal project={activeQrProject} onClose={() => setActiveQrProjectName(null)} />
      )}
    </section>
  )
}
