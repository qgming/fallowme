import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleArrowUp, QrCode, RefreshCw } from 'lucide-react'
import type { Project } from '@/types/project'
import { fetchProjectUpdateInfo, type ProjectUpdateInfo } from '@/lib/projectUpdates'
import { getProjectActions } from '@/lib/projectLinks'
import ProjectQrModal from '@/components/home/ProjectQrModal'
import ProjectUpdateModal from '@/components/home/ProjectUpdateModal'

interface ProjectsSectionProps {
  projects: Project[]
}

type ProjectUpdateState = Record<string, ProjectUpdateInfo | undefined>

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const navigate = useNavigate()
  const [updates, setUpdates] = useState<ProjectUpdateState>({})
  const [failedUpdates, setFailedUpdates] = useState<Set<string>>(() => new Set())
  const [activeUpdateProjectId, setActiveUpdateProjectId] = useState<string | null>(null)
  const [activeQrProjectId, setActiveQrProjectId] = useState<string | null>(null)

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

          setUpdates((currentUpdates) => ({ ...currentUpdates, [project.id]: updateInfo }))
        })
        .catch(() => {
          if (controller.signal.aborted) {
            return
          }

          setFailedUpdates((currentFailures) => new Set(currentFailures).add(project.id))
        })
    })

    return () => {
      controller.abort()
    }
  }, [projects])

  useEffect(() => {
    if (!activeUpdateProjectId && !activeQrProjectId) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveUpdateProjectId(null)
        setActiveQrProjectId(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeQrProjectId, activeUpdateProjectId])

  const activeUpdateProject = activeUpdateProjectId
    ? projects.find((project) => project.id === activeUpdateProjectId)
    : undefined
  const activeUpdateInfo = activeUpdateProjectId ? updates[activeUpdateProjectId] : undefined
  const activeQrProject = activeQrProjectId
    ? projects.find((project) => project.id === activeQrProjectId)
    : undefined

  return (
    <section id="projects" className="section-anchor border-y border-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-border pb-4 md:mb-10">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">项目</h2>
        </div>

        <div className="grid min-w-0 gap-4 lg:grid-cols-2 lg:gap-5">
          {projects.map((project) => {
            const updateInfo = updates[project.id]
            const hasUpdateService = Boolean(project.updateServiceUrl)
            const isLoadingUpdate = hasUpdateService && !updateInfo && !failedUpdates.has(project.id)
            const actions = getProjectActions(project, updateInfo)
            const canOpenChangeLog = Boolean(updateInfo?.changeLog)
            const canOpenQrCode = Boolean(project.qrCodeImage)

            return (
              <article
                key={project.id}
                role="link"
                tabIndex={0}
                className="group relative flex min-w-0 cursor-pointer flex-col justify-between rounded-[8px] border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-subtle focus:outline-none focus:ring-2 focus:ring-accent/30 md:p-5"
                onClick={() => navigate(`/${project.id}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    navigate(`/${project.id}`)
                  }
                }}
              >
                <div className="min-w-0 space-y-4">
                  <div className="flex min-w-0 items-start gap-3 md:gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-border bg-background">
                      {project.avatar ? (
                        <img src={project.avatar} alt={project.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-lg font-semibold text-accent">{project.name.charAt(0)}</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                        <h3 className="min-w-0 break-words text-xl font-semibold tracking-tight text-foreground">
                          {project.name}
                        </h3>
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
                            className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-[8px] border border-border bg-background text-muted transition-colors hover:border-accent hover:text-foreground"
                            onClick={(event) => {
                              event.stopPropagation()
                              setActiveUpdateProjectId(project.id)
                            }}
                          >
                            <CircleArrowUp className="h-4 w-4" />
                          </button>
                        )}
                        {isLoadingUpdate && (
                          <span className="inline-flex min-w-0 items-center gap-1.5 rounded-[8px] border border-border px-2 py-1 text-xs text-muted">
                            <RefreshCw className="h-3 w-3 shrink-0 animate-spin" />
                            同步中
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 truncate text-sm leading-6 text-muted" title={project.summary}>{project.summary}</p>
                    </div>
                  </div>

                  {project.tags.length > 0 && (
                    <div className="flex min-w-0 flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="max-w-full break-words rounded-[8px] border border-border bg-background px-2.5 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {(actions.length > 0 || canOpenQrCode) && (
                  <div className="relative z-10 mt-4 flex min-w-0 flex-wrap items-center gap-2">
                    {canOpenQrCode && (
                      <button
                        type="button"
                        className="inline-flex max-w-full items-center gap-1.5 rounded-[8px] border border-border bg-background px-3 py-2 text-sm text-muted transition-colors hover:border-accent hover:bg-card hover:text-foreground"
                        onClick={(event) => {
                          event.stopPropagation()
                          setActiveQrProjectId(project.id)
                        }}
                      >
                        <QrCode className="h-4 w-4 shrink-0" />
                        <span className="truncate">小程序</span>
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
                          className="inline-flex max-w-full items-center gap-1.5 rounded-[8px] border border-border bg-background px-3 py-2 text-sm text-muted transition-colors hover:border-accent hover:bg-card hover:text-foreground"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="truncate">{action.label}</span>
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
          onClose={() => setActiveUpdateProjectId(null)}
        />
      )}

      {activeQrProject && (
        <ProjectQrModal project={activeQrProject} onClose={() => setActiveQrProjectId(null)} />
      )}
    </section>
  )
}
