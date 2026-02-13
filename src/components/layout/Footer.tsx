import { Github, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden mt-12 md:mt-20">
      <div className="relative mx-auto max-w-7xl px-4 md:px-12 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* 左侧：版权信息 */}
          <p className="text-xs md:text-sm text-muted text-center md:text-left">
            © {currentYear} FallowMe. 保留所有权利.
          </p>

          {/* 中间：社交图标 */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="https://github.com/qgming"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:qgming@qq.com"
              aria-label="Email"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* 右侧：Made with */}
          <p className="text-xs md:text-sm text-muted flex items-center gap-1 text-center md:text-left">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by
            qgming
          </p>
        </div>
      </div>
    </footer>
  );
}
