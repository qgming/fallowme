import { X } from 'lucide-react'
import type { Project } from '@/types/project'

interface ProjectQrModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectQrModal({ project, onClose }: ProjectQrModalProps) {
  if (!project.qrCodeImage) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-4 py-6 backdrop-blur-md"
      role="presentation"
      onClick={onClose}
    >
      <section
        aria-labelledby="project-qr-title"
        aria-modal="true"
        role="dialog"
        className="w-full max-w-md overflow-hidden rounded-[8px] border border-border bg-card shadow-subtle"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">微信小程序</p>
            <h3 id="project-qr-title" className="mt-2 text-xl font-semibold text-foreground">
              {project.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">{project.qrCodeLabel || '扫码打开小程序'}</p>
          </div>

          <button
            type="button"
            aria-label="关闭二维码"
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[8px] border border-border text-muted transition-colors hover:border-accent hover:text-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5 md:px-6">
          <div className="overflow-hidden rounded-[8px] border border-border bg-background p-3">
            <img src={project.qrCodeImage} alt={`${project.name} 小程序二维码`} className="h-auto w-full rounded-[6px]" />
          </div>
        </div>
      </section>
    </div>
  )
}
