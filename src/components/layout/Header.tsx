import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

const navItems = [
  { label: '个人', hash: '#profile' },
  { label: '项目', hash: '#projects' },
  { label: '链接', hash: '#links' },
]

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const activeHash = location.hash || '#profile'

  const handleSectionNavigation = (hash: string) => {
    const sectionId = hash.replace('#', '')

    if (location.pathname !== '/') {
      navigate(`/${hash}`)

      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)

      return
    }

    navigate({ hash })
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-3 md:px-6 md:py-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-[8px] border border-border bg-card/90 px-3 py-2.5 shadow-subtle backdrop-blur md:px-4">
          <Link to="/#profile" className="group flex items-center gap-2">
            <img
              src="/avatar.jpg"
              alt="Logo"
              className="h-7 w-7 rounded-full object-cover ring-1 ring-border transition-colors group-hover:ring-accent md:h-8 md:w-8"
            />
            <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent md:text-base">
              FallowMe
            </span>
          </Link>

          <nav className="flex items-center gap-1 md:gap-2" aria-label="主导航">
            {navItems.map((item) => (
              <button
                key={item.hash}
                type="button"
                onClick={() => handleSectionNavigation(item.hash)}
                className={`rounded-[8px] px-2.5 py-1.5 text-xs font-medium transition-colors md:px-3 md:text-sm ${
                  activeHash === item.hash
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted hover:bg-background hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="mx-1 h-5 w-px bg-border md:mx-2" />

            <button
              onClick={toggleTheme}
              className="rounded-[8px] p-1.5 text-muted transition-colors hover:bg-background hover:text-foreground md:p-2"
              aria-label="切换主题"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
