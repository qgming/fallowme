import GlassCard from '@/components/ui/GlassCard'

interface TechStackProps {
  techStack: string[]
}

export default function TechStack({ techStack }: TechStackProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {techStack.map((tech) => (
        <GlassCard
          key={tech}
          className="px-6 py-3 hover:scale-110 transition-transform duration-300"
          hover={false}
        >
          <span className="text-sm font-medium">{tech}</span>
        </GlassCard>
      ))}
    </div>
  )
}
