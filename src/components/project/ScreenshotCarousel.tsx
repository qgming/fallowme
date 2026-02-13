import { useRef, useState, useEffect } from 'react'
import GlassCard from '@/components/ui/GlassCard'

interface ScreenshotCarouselProps {
  screenshots: string[]
}

export default function ScreenshotCarousel({ screenshots }: ScreenshotCarouselProps) {
  // 复制截图数组以实现无缝循环
  const duplicatedScreenshots = [...screenshots, ...screenshots]
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const animationRef = useRef<number | undefined>(undefined)

  // 自动滚动动画
  useEffect(() => {
    if (isDragging) return

    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    let scrollPosition = container.scrollLeft

    const animate = () => {
      scrollPosition += 0.5 // 滚动速度

      const itemWidth = 280 + 16 // 图片宽度 + gap
      const singleSetWidth = screenshots.length * itemWidth

      // 当滚动到第二组末尾时,重置到第一组开始
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = 0
        container.scrollLeft = 0
      }

      container.scrollLeft = scrollPosition
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [screenshots.length, isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-scroll py-4 cursor-grab active:cursor-grabbing scrollbar-hide"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className="flex gap-4">
        {duplicatedScreenshots.map((screenshot, index) => (
          <div key={index} className="flex-shrink-0">
            <GlassCard className="!p-2">
              <div className="relative h-[480px] rounded-lg overflow-hidden border border-border/50">
                <img
                  src={screenshot}
                  alt={`截图 ${(index % screenshots.length) + 1}`}
                  className="h-full w-auto object-contain pointer-events-none select-none"
                  draggable={false}
                />
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  )
}
