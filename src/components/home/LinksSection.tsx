import { ArrowUpRight, Github, Mail, MessageCircle, Twitter, type LucideIcon } from 'lucide-react'
import { useProfile } from '@/contexts/ProfileContext'

interface LinkItem {
  label: string
  value: string
  href?: string
  icon: LucideIcon
}

export default function LinksSection() {
  const { profile } = useProfile()

  const links: LinkItem[] = []

  if (profile.social.github) {
    links.push({ label: 'GitHub', value: 'github.com/qgming', href: profile.social.github, icon: Github })
  }

  if (profile.social.twitter) {
    links.push({ label: 'X', value: 'x.com/qgmingx', href: profile.social.twitter, icon: Twitter })
  }

  if (profile.social.email) {
    links.push({ label: 'Email', value: profile.social.email, href: `mailto:${profile.social.email}`, icon: Mail })
  }

  if (profile.social.weibo) {
    links.push({ label: '微博', value: 'weibo.com/u/6521776570', href: profile.social.weibo, icon: MessageCircle })
  }

  if (profile.social.bilibili) {
    links.push({ label: 'Bilibili', value: 'space.bilibili.com/312954339', href: profile.social.bilibili, icon: MessageCircle })
  }

  if (profile.social.wechat) {
    links.push({
      label: '微信',
      value: profile.social.wechat.name,
      icon: MessageCircle,
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
                  {item.href && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-[8px] text-muted transition-colors group-hover:bg-background group-hover:text-accent">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-base font-semibold text-foreground">{item.label}</p>
                  <p className="break-all text-sm leading-6 text-muted">{item.value}</p>
                </div>
              </>
            )

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
    </section>
  )
}
