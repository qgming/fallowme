import { ArrowRight, Download, ExternalLink, Github, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '@/types/project'

interface ProjectsSectionProps {
  projects: Project[]
}

function getProjectActions(project: Project) {
  const actions: Array<{ label: string; href: string; icon: LucideIcon }> = []

  if (project.links.website) {
    actions.push({ label: '官网', href: project.links.website, icon: ExternalLink })
  }

  if (project.links.github) {
    actions.push({ label: 'GitHub', href: project.links.github, icon: Github })
  }

  if (project.links.download) {
    const downloadUrl = Array.isArray(project.links.download)
      ? project.links.download[0]?.url
      : project.links.download

    if (downloadUrl) {
      actions.push({ label: '下载', href: downloadUrl, icon: Download })
    }
  }

  return actions
}

function getProjectBadges(project: Project) {
  if (!project.links.github) {
    return []
  }

  const match = project.links.github.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i)
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

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="section-anchor border-y border-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-border pb-4 md:mb-10">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">项目</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {projects.map((project) => {
            const actions = getProjectActions(project)
            const badges = getProjectBadges(project)

            return (
              <article
                key={project.id}
                className="group flex h-full flex-col justify-between rounded-[8px] border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-subtle md:p-6"
              >
                <div className="space-y-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-border bg-background">
                      {project.icon ? (
                        <img src={project.icon} alt={project.title} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-lg font-semibold text-accent">{project.title.charAt(0)}</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
                        {project.version && (
                          <span className="rounded-[8px] border border-border px-2 py-1 text-xs text-muted">
                            {project.version}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted">{project.subtitle}</p>
                    </div>
                  </div>

                  {project.tags && project.tags.length > 0 && (
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
                          key={`${project.id}-${badge.label}`}
                          src={badge.src}
                          alt={badge.label}
                          className="h-5 rounded-[4px]"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                  {actions.map((action) => {
                    const Icon = action.icon

                    return (
                      <a
                        key={`${project.id}-${action.label}`}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-[8px] border border-transparent px-2.5 py-2 text-sm text-muted transition-colors hover:border-border hover:bg-background hover:text-foreground"
                      >
                        <Icon className="h-4 w-4" />
                        {action.label}
                      </a>
                    )
                  })}
                  <Link
                    to={`/projects/${project.id}`}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-[8px] border border-transparent px-2.5 py-2 text-sm font-medium text-accent transition-colors hover:border-border hover:bg-background"
                  >
                    详情
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
