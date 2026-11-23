import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import GithubMark from '@/components/icons/GithubMark'
import profile from '@/data/profile.json'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="contact page-width" aria-label="联系方式">
      <a className="contact-card" href={profile.blog} target="_blank" rel="noopener noreferrer">
        <span className="contact-icon">
          <span className="contact-logo" aria-hidden="true" />
        </span>
        <span className="contact-name">博客</span>
        <ArrowUpRight className="contact-arrow" size={16} strokeWidth={1.5} aria-hidden="true" />
      </a>
      <a className="contact-card" href={profile.github} target="_blank" rel="noopener noreferrer">
        <span className="contact-icon">
          <GithubMark size={20} />
        </span>
        <span className="contact-name">GitHub</span>
        <ArrowUpRight className="contact-arrow" size={16} strokeWidth={1.5} aria-hidden="true" />
      </a>
      <button
        className="contact-card"
        type="button"
        onClick={() => void copyEmail()}
        aria-label="复制邮箱"
        title="复制邮箱"
      >
        <span className="contact-icon">
          <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="contact-name">邮箱</span>
        <span className="contact-end">
          <span className="contact-status" role="status">{copied ? '已复制' : ''}</span>
          <span className="contact-action">
            {copied
              ? <Check size={16} strokeWidth={1.5} aria-hidden="true" />
              : <Copy size={16} strokeWidth={1.5} aria-hidden="true" />}
          </span>
        </span>
      </button>
    </section>
  )
}
