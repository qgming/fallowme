import { ChevronDown } from 'lucide-react'

export default function ScrollIndicator() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="scroll-indicator" onClick={scrollToProjects}>
      <ChevronDown className="w-8 h-8 text-muted" />
    </div>
  )
}
