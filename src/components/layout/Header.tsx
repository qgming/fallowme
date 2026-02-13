import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Header() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 md:py-4 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="glass-card rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-1.5 md:gap-2">
            <img
              src="/avatar.jpg"
              alt="Logo"
              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all"
            />
            <h1 className="text-sm md:text-base font-bold text-foreground group-hover:text-accent transition-colors">
              FallowMe
            </h1>
          </Link>

          {/* 导航 */}
          <nav className="flex items-center gap-1 md:gap-2">
            <Link
              to="/"
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                isActive("/")
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground hover:bg-accent/10"
              }`}
            >
              首页
            </Link>
            <Link
              to="/about"
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                isActive("/about")
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground hover:bg-accent/10"
              }`}
            >
              关于
            </Link>

            {/* 分隔线 */}
            <div className="w-px h-5 md:h-6 bg-border mx-1 md:mx-2" />

            {/* 主题切换按钮 */}
            <button
              onClick={toggleTheme}
              className="p-1.5 md:p-2 text-muted hover:text-foreground transition-colors rounded-full hover:bg-accent/10"
              aria-label="切换主题"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
