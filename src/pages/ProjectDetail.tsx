import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CircleArrowDown,
  QrCode,
  RefreshCw,
} from 'lucide-react'
import { useProjects } from '@/contexts/ProjectContextValue'
import type { Project } from '@/types/project'
import { fetchProjectUpdateInfo, type ProjectUpdateInfo } from '@/lib/projectUpdates'
import { getProjectActions } from '@/lib/projectLinks'
import { SITE_URL, setCanonical, setNamedMeta, setPropertyMeta } from '@/lib/seo'
import ProjectQrModal from '@/components/home/ProjectQrModal'
import NotFound from '@/pages/NotFound'

type UpdateState =
  | { status: 'idle'; info?: undefined }
  | { status: 'loading'; info?: undefined }
  | { status: 'ready'; info: ProjectUpdateInfo }
  | { status: 'error'; info?: undefined }

function useProjectSeo(project: Project) {
  useEffect(() => {
    const title = `${project.name} - FallowMe`
    const url = `${SITE_URL}/${project.id}`
    const image = project.avatar ? new URL(project.avatar, SITE_URL).toString() : undefined

    document.title = title
    setNamedMeta('description', project.summary)
    setNamedMeta('twitter:title', title)
    setNamedMeta('twitter:description', project.summary)
    setPropertyMeta('og:title', title)
    setPropertyMeta('og:description', project.summary)
    setPropertyMeta('og:type', 'website')
    setPropertyMeta('og:url', url)
    setCanonical(url)

    if (image) {
      setPropertyMeta('og:image', image)
      setNamedMeta('twitter:image', image)
    }

    let structuredData = document.getElementById('project-structured-data') as HTMLScriptElement | null
    if (!structuredData) {
      structuredData = document.createElement('script')
      structuredData.id = 'project-structured-data'
      structuredData.type = 'application/ld+json'
      document.head.appendChild(structuredData)
    }

    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: project.name,
      description: project.summary,
      url,
      image,
      applicationCategory: project.tags.join(', '),
      author: {
        '@type': 'Person',
        name: 'qgming',
      },
      sameAs: project.links.map((link) => link.url),
    })
  }, [project])
}

function ProjectIcon({ project }: { project: Project }) {
  return (
    <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-[8px] border border-border bg-card shadow-subtle md:h-36 md:w-36">
      {project.avatar ? (
        <img src={project.avatar} alt={project.name} className="h-full w-full object-cover" />
      ) : (
        <span className="text-5xl font-semibold text-accent">{project.name.charAt(0)}</span>
      )}
    </div>
  )
}

function ProjectDetailContent({ project }: { project: Project }) {
  const [updateState, setUpdateState] = useState<UpdateState>(() => (
    project.updateServiceUrl ? { status: 'loading' } : { status: 'idle' }
  ))
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)

  useProjectSeo(project)

  useEffect(() => {
    if (!project.updateServiceUrl) {
      return
    }

    let isMounted = true

    fetchProjectUpdateInfo(project)
      .then((info) => {
        if (!isMounted) {
          return
        }

        setUpdateState({ status: 'ready', info })
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setUpdateState({ status: 'error' })
      })

    return () => {
      isMounted = false
    }
  }, [project])

  const updateInfo = updateState.info
  const actions = useMemo(() => getProjectActions(project, updateInfo), [project, updateInfo])
  const hasChangeLog = Boolean(updateInfo?.changeLog)

  return (
    <div className="min-h-screen bg-background px-5 py-8 md:px-8 md:py-10">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center py-16 text-center">
        <ProjectIcon project={project} />

        <div className="mt-8 w-full">
          <div className="flex w-full justify-center">
            <div className="relative inline-block max-w-full">
              <h1 className="text-center text-4xl font-bold tracking-tight text-foreground md:text-6xl">{project.name}</h1>
              {updateInfo?.version && (
                <span className="absolute left-full top-0 ml-3 hidden h-8 items-center whitespace-nowrap rounded-[8px] border border-accent/25 bg-accent/10 px-2.5 text-sm font-medium text-accent md:inline-flex">
                  v{updateInfo.version}
                </span>
              )}
            </div>
          </div>
          {updateInfo?.version && (
            <div className="mt-4 flex justify-center md:hidden">
              <span className="inline-flex h-8 items-center rounded-[8px] border border-accent/25 bg-accent/10 px-2.5 text-sm font-medium text-accent">
                v{updateInfo.version}
              </span>
            </div>
          )}

          {updateState.status === 'loading' && (
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-[8px] border border-border px-2.5 py-1 text-xs text-muted">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              同步云端数据
            </p>
          )}

          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-[8px] border border-border bg-card px-3 py-1.5 text-sm text-muted">
                {tag}
              </span>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted md:text-lg md:leading-9">{project.summary}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {actions.length > 0 ? (
              actions.map((action) => {
                const Icon = action.icon

                return (
                  <a
                    key={`${action.label}-${action.href}`}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4" />
                    {action.label}
                  </a>
                )
              })
            ) : (
              <span className="rounded-[8px] border border-border bg-card px-5 py-3 text-sm text-muted">暂无下载链接</span>
            )}

            {project.qrCodeImage && (
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent"
                onClick={() => setIsQrModalOpen(true)}
              >
                <QrCode className="h-4 w-4" />
                小程序
              </button>
            )}
          </div>

          {updateState.status === 'error' && project.updateServiceUrl && (
            <p className="mt-5 text-sm text-muted">云端数据暂时不可用，已显示本地项目信息。</p>
          )}

          {hasChangeLog && updateInfo?.changeLog && (
            <section className="mx-auto mt-14 max-w-2xl border-t border-border pt-8 text-left">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <CircleArrowDown className="h-5 w-5 text-accent" />
                更新日志
              </h2>
              {updateInfo.publishedAt && <p className="mb-3 text-sm text-muted">{updateInfo.publishedAt}</p>}
              <p className="whitespace-pre-wrap text-sm leading-7 text-muted md:text-base md:leading-8">{updateInfo.changeLog}</p>
            </section>
          )}
        </div>
      </main>

      {project.qrCodeImage && isQrModalOpen && (
        <ProjectQrModal project={project} onClose={() => setIsQrModalOpen(false)} />
      )}
    </div>
  )
}

export default function ProjectDetail() {
  const { projectId } = useParams()
  const { projects } = useProjects()
  const project = projects.find((item) => item.id === projectId)

  if (!project) {
    return <NotFound />
  }

  return <ProjectDetailContent key={project.id} project={project} />
}
