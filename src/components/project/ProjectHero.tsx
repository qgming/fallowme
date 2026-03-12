import type { Project } from '@/types/project'
import { Download, ExternalLink, Github, Globe } from 'lucide-react'
import Button from '@/components/ui/Button'

interface ProjectHeroProps {
  project: Project
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative pt-32 pb-12 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Logo 和标题 */}
        <div className="flex flex-col items-center justify-center gap-6 mb-6">
          {/* 项目 Logo */}
          {project.icon ? (
            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-accent/5 flex items-center justify-center border border-border/50">
              <img
                src={project.icon}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-border/50">
              <span className="text-4xl font-bold text-accent">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* 标题 */}
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-bold animate-fade-in-up">
              {project.title}
            </h1>
            {project.version && (
              <span className="absolute -top-2 -right-2 translate-x-full ml-2 px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full whitespace-nowrap border border-accent/20">
                {project.version}
              </span>
            )}
          </div>
        </div>

        {/* 副标题 */}
        <p className="text-xl md:text-2xl text-muted mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {project.subtitle}
        </p>

        {/* CTA 按钮组 */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* 下载按钮 - 支持单个或多个下载链接 */}
          {project.links.download && (
            typeof project.links.download === 'string' ? (
              // 兼容旧格式：单个字符串
              <a href={project.links.download} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" icon={<Download className="w-5 h-5" />}>
                  立即下载
                </Button>
              </a>
            ) : (
              // 新格式：多个下载链接数组
              project.links.download.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant={link.variant || 'primary'}
                    size="lg"
                    icon={<Download className="w-5 h-5" />}
                  >
                    {link.label}
                  </Button>
                </a>
              ))
            )
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" icon={<ExternalLink className="w-5 h-5" />}>
                在线体验
              </Button>
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              <Button variant="glass" size="lg" icon={<Github className="w-5 h-5" />}>
                源码
              </Button>
            </a>
          )}
          {project.links.website && (
            <a href={project.links.website} target="_blank" rel="noopener noreferrer">
              <Button variant="glass" size="lg" icon={<Globe className="w-5 h-5" />}>
                官网
              </Button>
            </a>
          )}
        </div>

        {/* 统计数据 */}
        {project.stats && (
          <div className="flex justify-center gap-8 mt-12">
            {project.stats.downloads && (
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{project.stats.downloads.toLocaleString()}</div>
                <div className="text-sm text-muted mt-1">下载量</div>
              </div>
            )}
            {project.stats.stars && (
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{project.stats.stars.toLocaleString()}</div>
                <div className="text-sm text-muted mt-1">Stars</div>
              </div>
            )}
            {project.stats.users && (
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{project.stats.users.toLocaleString()}</div>
                <div className="text-sm text-muted mt-1">用户</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
