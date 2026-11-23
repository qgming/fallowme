import { ArrowDown } from 'lucide-react'
import CharacterField from './CharacterField'
import GlyphText from './GlyphText'
import profile from '@/data/profile.json'

export default function ProfileSection() {
  return (
    <section id="profile" className="intro page-width" aria-labelledby="intro-title">
      <CharacterField />
      <div className="intro-copy">
        <h1 id="intro-title" aria-label={profile.name}>
          <GlyphText text={profile.name} />
        </h1>
        <ul className="intro-tags" aria-label="标签">
          {profile.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <a className="intro-scroll" href="#contact" aria-label="向下浏览">
        <ArrowDown size={18} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </section>
  )
}
