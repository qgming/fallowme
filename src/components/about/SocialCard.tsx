import { Github, Twitter, Mail, Linkedin } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import { useState } from 'react'

type SocialPlatform = 'github' | 'twitter' | 'email' | 'wechat' | 'weibo' | 'zhihu' | 'bilibili' | 'juejin' | 'linkedin'

interface SocialCardProps {
  platform: SocialPlatform
  url?: string
  username: string
  qrCode?: string
}

export default function SocialCard({ platform, url, username, qrCode }: SocialCardProps) {
  const [showQR, setShowQR] = useState(false)

  const icons = {
    github: Github,
    twitter: Twitter,
    email: Mail,
    linkedin: Linkedin,
    wechat: Mail, // 使用占位图标
    weibo: Mail,
    zhihu: Mail,
    bilibili: Mail,
    juejin: Mail,
  }

  const labels = {
    github: 'GitHub',
    twitter: 'Twitter',
    email: 'Email',
    wechat: '微信公众号',
    weibo: '微博',
    zhihu: '知乎',
    bilibili: 'B站',
    juejin: '掘金',
    linkedin: 'LinkedIn',
  }

  const Icon = icons[platform]

  // 微信公众号特殊处理
  if (platform === 'wechat' && qrCode) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowQR(!showQR)}
          className="w-full"
        >
          <GlassCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
            <Icon className="w-8 h-8 mx-auto mb-4 text-accent" />
            <h3 className="font-semibold mb-2">{labels[platform]}</h3>
            <p className="text-sm text-muted">{username}</p>
          </GlassCard>
        </button>

        {showQR && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50">
            <GlassCard className="p-4">
              <img src={qrCode} alt="微信公众号二维码" className="w-48 h-48" />
              <p className="text-sm text-center mt-2 text-muted">扫码关注</p>
            </GlassCard>
          </div>
        )}
      </div>
    )
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <GlassCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
        <Icon className="w-8 h-8 mx-auto mb-4 text-accent" />
        <h3 className="font-semibold mb-2">{labels[platform]}</h3>
        <p className="text-sm text-muted">{username}</p>
      </GlassCard>
    </a>
  )
}
