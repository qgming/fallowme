import { useEffect, useState } from 'react'
import { useProjects } from '@/contexts/ProjectContextValue'
import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_TITLE,
  SITE_URL,
  setCanonical,
  setNamedMeta,
  setPropertyMeta,
} from '@/lib/seo'
import LinksSection from '@/components/home/LinksSection'
import ProfileSection from '@/components/home/ProfileSection'
import ProjectsSection from '@/components/home/ProjectsSection'

const GREETING_TEXT = 'Hello,World'
const TYPING_DELAY_MS = 110
const LOOP_PAUSE_MS = 1400

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  return prefersReducedMotion
}

function useTypewriterText(text: string) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const delay = typedText === text ? LOOP_PAUSE_MS : TYPING_DELAY_MS
    const timer = window.setTimeout(() => {
      setTypedText((currentText) =>
        currentText === text ? '' : text.slice(0, currentText.length + 1),
      )
    }, delay)

    return () => {
      window.clearTimeout(timer)
    }
  }, [prefersReducedMotion, text, typedText])

  return prefersReducedMotion ? text : typedText
}

function TypewriterIntro() {
  const typedText = useTypewriterText(GREETING_TEXT)

  return (
    <section className="px-5 pt-20 pb-14 md:px-8 md:pt-32 md:pb-20">
      <div className="mx-auto flex max-w-6xl justify-center overflow-hidden text-center">
        <p className="whitespace-nowrap font-mono text-[3rem] font-black leading-none text-foreground sm:text-[4.5rem] md:text-[8.5rem] lg:text-[10rem]">
          <span className="sr-only">{GREETING_TEXT}</span>
          <span aria-hidden="true">
            {typedText}
            <span className="typewriter-cursor">|</span>
          </span>
        </p>
      </div>
    </section>
  )
}

function useHomeSeo() {
  useEffect(() => {
    document.title = SITE_TITLE
    setNamedMeta('description', SITE_DESCRIPTION)
    setNamedMeta('twitter:card', 'summary')
    setNamedMeta('twitter:title', SITE_TITLE)
    setNamedMeta('twitter:description', SITE_DESCRIPTION)
    setNamedMeta('twitter:image', SITE_IMAGE)
    setPropertyMeta('og:type', 'website')
    setPropertyMeta('og:site_name', 'FallowMe')
    setPropertyMeta('og:title', SITE_TITLE)
    setPropertyMeta('og:description', SITE_DESCRIPTION)
    setPropertyMeta('og:url', `${SITE_URL}/`)
    setPropertyMeta('og:image', SITE_IMAGE)
    setCanonical(`${SITE_URL}/`)

    document.getElementById('project-structured-data')?.remove()
  }, [])
}

export default function Home() {
  const { projects } = useProjects()
  useHomeSeo()

  return (
    <div className="relative min-h-screen">
      <TypewriterIntro />
      <ProfileSection />
      <ProjectsSection projects={projects} />
      <LinksSection />
    </div>
  )
}
