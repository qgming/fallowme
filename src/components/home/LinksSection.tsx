import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy, Github, Mail, QrCode, X, type LucideIcon } from 'lucide-react'
import { useProfile } from '@/contexts/ProfileContext'

const WECHAT_OFFICIAL_QR = '/assets/profile/wxgzh-qr.jpg'

interface LinkItem {
  label: string
  value: string
  href?: string
  icon: LucideIcon
  qrImage?: string
  copyValue?: string
}

function QrModal({ title, description, image, onClose }: { title: string; description: string; image: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-4 py-6 backdrop-blur-md"
      role="presentation"
      onClick={onClose}
    >
      <section
        aria-labelledby="link-qr-title"
        aria-modal="true"
        role="dialog"
        className="w-full max-w-md overflow-hidden rounded-[8px] border border-border bg-card shadow-subtle"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">二维码</p>
            <h3 id="link-qr-title" className="mt-2 text-xl font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
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
            <img src={image} alt={`${title}二维码`} className="h-auto w-full rounded-[6px]" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default function LinksSection() {
  const { profile } = useProfile()
  const [activeQr, setActiveQr] = useState<LinkItem | null>(null)
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null)

  useEffect(() => {
    if (!activeQr) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveQr(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeQr])

  const copyToClipboard = async (item: LinkItem) => {
    if (!item.copyValue) {
      return
    }

    await navigator.clipboard.writeText(item.copyValue)
    setCopiedLabel(item.label)

    window.setTimeout(() => {
      setCopiedLabel(null)
    }, 1600)
  }

  const links: LinkItem[] = []

  if (profile.social.github) {
    links.push({ label: 'GitHub', value: 'github.com/qgming', href: profile.social.github, icon: Github })
  }

  if (profile.social.email) {
    links.push({ label: 'Email', value: profile.social.email, icon: Mail, copyValue: profile.social.email })
  }

  if (profile.social.wechat) {
    links.push({
      label: '微信公众号',
      value: profile.social.wechat.name,
      icon: QrCode,
      qrImage: WECHAT_OFFICIAL_QR,
    })
  }

  return (
    <section id="links" className="section-anchor px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-border pb-4 md:mb-10">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">链接</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {links.map((item) => {
            const Icon = item.icon
            const content = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-border bg-background text-accent transition-colors group-hover:border-accent/30">
                    <Icon className="h-4 w-4" />
                  </span>
                  {(item.href || item.qrImage || item.copyValue) && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-[8px] text-muted transition-colors group-hover:bg-background group-hover:text-accent">
                      {item.copyValue && copiedLabel === item.label ? (
                        <Check className="h-4 w-4" />
                      ) : item.copyValue ? (
                        <Copy className="h-4 w-4" />
                      ) : item.qrImage ? (
                        <QrCode className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-base font-semibold text-foreground">{item.label}</p>
                  <p className="break-all text-sm leading-6 text-muted">{item.value}</p>
                </div>
              </>
            )

            if (item.copyValue) {
              return (
                <button
                  type="button"
                  key={item.label}
                  className="group flex min-h-[176px] flex-col justify-between rounded-[8px] border border-border bg-card p-5 text-left transition-all hover:border-accent hover:shadow-subtle"
                  onClick={() => void copyToClipboard(item)}
                >
                  {content}
                </button>
              )
            }

            if (item.qrImage) {
              return (
                <button
                  type="button"
                  key={item.label}
                  className="group flex min-h-[176px] flex-col justify-between rounded-[8px] border border-border bg-card p-5 text-left transition-all hover:border-accent hover:shadow-subtle"
                  onClick={() => setActiveQr(item)}
                >
                  {content}
                </button>
              )
            }

            if (!item.href) {
              return (
                <article
                  key={item.label}
                  className="group flex min-h-[176px] flex-col justify-between rounded-[8px] border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-subtle"
                >
                  {content}
                </article>
              )
            }

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="group flex min-h-[176px] flex-col justify-between rounded-[8px] border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-subtle"
              >
                {content}
              </a>
            )
          })}
        </div>
      </div>

      {activeQr?.qrImage && (
        <QrModal
          title={activeQr.label}
          description={activeQr.value}
          image={activeQr.qrImage}
          onClose={() => setActiveQr(null)}
        />
      )}
    </section>
  )
}
