import type { ChangelogEntry } from '@/types/project'
import GlassCard from '@/components/ui/GlassCard'

interface ChangelogProps {
  changelog: ChangelogEntry[]
}

export default function Changelog({ changelog }: ChangelogProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">更新日志</h2>
      <div className="space-y-6">
        {changelog.map((entry, index) => (
          <GlassCard key={index} className="p-6 hover:bg-accent/5 transition-colors duration-300">
            <div className="flex items-start gap-4">
              {/* 版本标签 */}
              <div className="flex-shrink-0">
                <div className="px-4 py-2 bg-accent/10 text-accent rounded-lg border border-accent/20 font-semibold">
                  {entry.version}
                </div>
              </div>

              {/* 更新内容 */}
              <div className="flex-1">
                <div className="text-sm text-muted mb-3">{entry.date}</div>
                <ul className="space-y-2">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start gap-2 text-muted">
                      <span className="text-accent mt-1.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
