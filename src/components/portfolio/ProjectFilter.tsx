import { Globe, Smartphone, Wrench } from 'lucide-react'

interface ProjectFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function ProjectFilter({ selectedCategory, onCategoryChange }: ProjectFilterProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-3 p-2 rounded-full glass-card">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-accent text-white'
              : 'hover:bg-accent/10 hover:text-accent'
          }`}
        >
          全部
        </button>
        <button
          onClick={() => onCategoryChange('web')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            selectedCategory === 'web'
              ? 'bg-accent text-white'
              : 'hover:bg-accent/10 hover:text-accent'
          }`}
        >
          <Globe className="w-4 h-4" />
          Web应用
        </button>
        <button
          onClick={() => onCategoryChange('mobile')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            selectedCategory === 'mobile'
              ? 'bg-accent text-white'
              : 'hover:bg-accent/10 hover:text-accent'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          移动应用
        </button>
        <button
          onClick={() => onCategoryChange('tool')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            selectedCategory === 'tool'
              ? 'bg-accent text-white'
              : 'hover:bg-accent/10 hover:text-accent'
          }`}
        >
          <Wrench className="w-4 h-4" />
          工具
        </button>
      </div>
    </div>
  )
}
