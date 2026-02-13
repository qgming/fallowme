import GlassCard from '@/components/ui/GlassCard'

interface ProfileCardProps {
  name: string
  title: string
  bio: string
}

export default function ProfileCard({ name, title, bio }: ProfileCardProps) {
  return (
    <GlassCard className="p-8">
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">{name}</h2>
          <p className="text-lg text-accent">{title}</p>
        </div>
        <p className="text-base text-muted leading-relaxed">{bio}</p>
      </div>
    </GlassCard>
  )
}
