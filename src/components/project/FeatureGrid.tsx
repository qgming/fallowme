import type { Feature } from '@/types/project'
import GlassCard from '@/components/ui/GlassCard'

interface FeatureGridProps {
  features: Feature[]
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <GlassCard key={index} className="p-6">
          {feature.icon && (
            <div className="text-4xl mb-4">{feature.icon}</div>
          )}
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted">{feature.description}</p>
        </GlassCard>
      ))}
    </div>
  )
}
