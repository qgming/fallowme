import { useProfile } from '@/contexts/ProfileContextValue'

interface BadgeItem {
  label: string
  badge: string
}

const skillItems: BadgeItem[] = [
  {
    label: 'TypeScript',
    badge: 'https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white',
  },
  {
    label: 'Vue',
    badge: 'https://img.shields.io/badge/Vue-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white',
  },
  {
    label: 'React',
    badge: 'https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB',
  },
  {
    label: 'Expo',
    badge: 'https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white',
  },
  {
    label: 'Tauri',
    badge: 'https://img.shields.io/badge/Tauri-24C8DB?style=flat-square&logo=tauri&logoColor=white',
  },
  {
    label: 'Electron',
    badge: 'https://img.shields.io/badge/Electron-47848F?style=flat-square&logo=electron&logoColor=white',
  },
]


export default function ProfileSection() {
  const { profile } = useProfile()
  const cardClassName = 'rounded-[8px] border border-border bg-card p-4 md:p-5'

  return (
    <section id="profile" className="section-anchor px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-border pb-4 md:mb-10">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">个人</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-stretch">
          <article className={`${cardClassName} h-full lg:min-h-[220px]`}>
            <div className="h-full overflow-hidden rounded-[8px] bg-background">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full rounded-[8px] object-cover"
              />
            </div>
          </article>

          <article className={`${cardClassName} flex h-full flex-col justify-between gap-5 lg:min-h-[220px]`}>
            <div className="space-y-2.5">
              <h1 className="text-4xl font-semibold leading-none tracking-tight text-foreground sm:text-5xl md:text-[4rem]">
                {profile.name}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                万物静观皆自得，四时佳兴与人同。
              </p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-[8px] border border-border bg-background px-3 py-1.5 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" />
              安静构建中
            </div>
          </article>

          <article className={`${cardClassName} flex h-full min-h-[116px] items-center`}>
            <div className="flex flex-wrap gap-2">
              {skillItems.map((item) => (
                <img
                  key={item.label}
                  src={item.badge}
                  alt={item.label}
                  className="h-6 rounded-[4px]"
                  loading="lazy"
                />
              ))}
            </div>
          </article>

          <article className={`hidden h-full md:block ${cardClassName}`}>
            <div className="overflow-x-auto scrollbar-hide">
              <img
                src="https://ghchart.rshah.org/3f766d/qgming"
                alt="qgming GitHub contributions chart"
                className="h-auto min-w-[660px] max-w-none"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
