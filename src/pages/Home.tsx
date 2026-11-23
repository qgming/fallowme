import { useEffect } from 'react'
import ContactSection from '@/components/home/ContactSection'
import ProfileSection from '@/components/home/ProfileSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import projects from '@/data/projects.json'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, setCanonical, setNamedMeta } from '@/lib/seo'

export default function Home() {
  useEffect(() => {
    document.title = SITE_TITLE
    setNamedMeta('description', SITE_DESCRIPTION)
    setNamedMeta('robots', 'index,follow')
    setCanonical(`${SITE_URL}/`)
  }, [])

  return (
    <>
      <ProfileSection />
      <ContactSection />
      <ProjectsSection projects={projects} />
    </>
  )
}
