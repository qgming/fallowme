import { ArrowUpRight } from 'lucide-react'
import GithubMark from '@/components/icons/GithubMark'
import type { Project } from '@/types/project'

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="projects page-width" aria-label="项目">
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <div className={`project-icon project-icon--${project.id}`}>
              <img src={project.icon} alt="" width="46" height="46" loading="lazy" />
            </div>
            <div className="project-heading">
              <h3>{project.name}</h3>
              <span className="project-kind">{project.kind}</span>
            </div>
            <p className="project-summary">{project.summary}</p>
            <div className="project-links">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  className="project-icon-link"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} ${link.label}`}
                  title={link.label}
                >
                  {link.label === 'GitHub'
                    ? <GithubMark size={17} />
                    : <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
