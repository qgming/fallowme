import { useProfile } from '@/contexts/ProfileContext'
import ProfileCard from '@/components/about/ProfileCard'
import SocialCard from '@/components/about/SocialCard'

export default function About() {
  const { profile } = useProfile()

  return (
    <div className="relative min-h-screen">
      {/* Hero 区域 */}
      <section className="pt-32 pb-12 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <div className="glass-card inline-block p-2 rounded-full mb-8">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">关于我</h1>
          <p className="text-xl text-accent animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {profile.title}
          </p>
        </div>
      </section>

      {/* 个人简介 */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <ProfileCard
            name={profile.name}
            title={profile.title}
            bio={profile.bio}
          />
        </div>
      </section>

      {/* 联系方式 */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12">联系方式</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {profile.social.github && (
              <SocialCard
                platform="github"
                url={profile.social.github}
                username={profile.social.github.split('/').pop() || ''}
              />
            )}
            {profile.social.email && (
              <SocialCard
                platform="email"
                url={`mailto:${profile.social.email}`}
                username={profile.social.email}
              />
            )}
            {profile.social.twitter && (
              <SocialCard
                platform="twitter"
                url={profile.social.twitter}
                username={profile.social.twitter.split('/').pop() || ''}
              />
            )}
            {profile.social.wechat && (
              <SocialCard
                platform="wechat"
                username={profile.social.wechat.name}
                qrCode={profile.social.wechat.qrCode}
              />
            )}
            {profile.social.weibo && (
              <SocialCard
                platform="weibo"
                url={profile.social.weibo}
                username={profile.social.weibo.split('/').pop() || ''}
              />
            )}
            {profile.social.zhihu && (
              <SocialCard
                platform="zhihu"
                url={profile.social.zhihu}
                username={profile.social.zhihu.split('/').pop() || ''}
              />
            )}
            {profile.social.bilibili && (
              <SocialCard
                platform="bilibili"
                url={profile.social.bilibili}
                username={profile.social.bilibili.split('/').pop() || ''}
              />
            )}
            {profile.social.juejin && (
              <SocialCard
                platform="juejin"
                url={profile.social.juejin}
                username={profile.social.juejin.split('/').pop() || ''}
              />
            )}
            {profile.social.linkedin && (
              <SocialCard
                platform="linkedin"
                url={profile.social.linkedin}
                username={profile.social.linkedin.split('/').pop() || ''}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
