import { useEffect, useRef } from 'react'

type Cell = { x: number; y: number; seed: number }
type Wave = { x: number; y: number; time: number }

const GLYPHS = '01x+*=/<>\\'
const ROW_COUNT = 17

function metrics(height: number) {
  const rowHeight = height / ROW_COUNT
  return { rowHeight, columnWidth: rowHeight / 1.3 }
}

function noise(x: number, y: number) {
  let value = Math.imul(x + 4096, 374761393) + Math.imul(y + 4096, 668265263)
  value = Math.imul(value ^ (value >>> 13), 1274126177)
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296
}

export default function GlyphText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const interactionTarget = container.closest<HTMLElement>('section') ?? container.parentElement ?? container
    let pixels: Uint8ClampedArray | undefined
    let cells: Cell[] = []
    let waves: Wave[] = []
    let width = 0
    let height = 0
    let ratio = 1
    let color = '#eeeeee'
    let reduced = motionPreference.matches
    let inView = true
    let disposed = false
    let frame = 0
    let elapsed = 0
    let previousTime = 0
    let lastPaint = 0
    const pointer = { x: 0, y: 0, time: -1000000 }

    function buildCells() {
      if (!pixels || !width || !height) return
      const { rowHeight, columnWidth } = metrics(height)
      const columns = Math.ceil(width / columnWidth)
      const rows = Math.ceil(height / rowHeight)
      const maskHeight = pixels.length / 4 / 320
      const next: Cell[] = []
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const x = (column + 0.5) * columnWidth
          const y = (row + 0.5) * rowHeight
          const sampleX = Math.floor((x / width) * 320)
          const sampleY = Math.floor((y / height) * maskHeight)
          if (sampleX < 0 || sampleX >= 320 || sampleY < 0 || sampleY >= maskHeight) continue
          if (pixels[(sampleY * 320 + sampleX) * 4 + 3] < 80) continue
          next.push({ x: x - width / 2, y: y - height / 2, seed: noise(column, row) })
        }
      }
      cells = next
    }

    function draw() {
      if (disposed || !width || !height) return
      const { columnWidth } = metrics(height)
      context!.setTransform(ratio, 0, 0, ratio, 0, 0)
      context!.clearRect(0, 0, width, height)
      context!.fillStyle = color
      context!.font = `${columnWidth * 1.12}px "SFMono-Regular", Consolas, "Liberation Mono", monospace`
      context!.textAlign = 'center'
      context!.textBaseline = 'middle'
      const time = reduced ? 0 : elapsed
      const radius = Math.min(width, height) * 0.85
      const hover = reduced ? 0 : Math.exp(-(elapsed - pointer.time) / 700)
      waves = reduced ? [] : waves.filter((wave) => elapsed - wave.time < 2600)

      for (const cell of cells) {
        let x = cell.x
        let y = cell.y
        let intensity = 0
        if (hover > 0.01) {
          const distance = Math.hypot(x - pointer.x, y - pointer.y)
          intensity = Math.max(0, 1 - distance / radius) ** 2 * hover
          x += Math.sin(time / 260 + cell.seed * 20) * intensity * 2.2
          y += Math.cos(time / 310 + cell.seed * 20) * intensity * 2.2
        }
        for (const wave of waves) {
          const age = elapsed - wave.time
          const dx = x - wave.x
          const dy = y - wave.y
          const distance = Math.hypot(dx, dy)
          const ring = Math.exp(-(((distance - age * 0.115) / 19) ** 2)) * Math.exp(-age / 1150)
          intensity += ring * 0.85
          if (distance > 1) {
            x += (dx / distance) * ring * 3
            y += (dy / distance) * ring * 3
          }
        }
        const base = 0.6 + cell.seed * 0.32
        context!.globalAlpha = Math.min(1, base + intensity * 0.37)
        const index = Math.floor(cell.seed * GLYPHS.length) % GLYPHS.length
        context!.fillText(GLYPHS[index], width / 2 + x, height / 2 + y)
      }
      context!.globalAlpha = 1
    }

    function tick(now: number) {
      if (disposed || reduced || !inView || document.hidden) {
        frame = 0
        previousTime = 0
        return
      }
      if (previousTime) elapsed += Math.min(now - previousTime, 80)
      previousTime = now
      if (now - lastPaint >= 1000 / 30) {
        draw()
        lastPaint = now
      }
      frame = requestAnimationFrame(tick)
    }

    function synchronize() {
      cancelAnimationFrame(frame)
      frame = 0
      previousTime = 0
      if (disposed || !inView || document.hidden) return
      draw()
      if (!reduced && cells.length) frame = requestAnimationFrame(tick)
    }

    function resize() {
      const bounds = container!.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(width * ratio)
      canvas!.height = Math.round(height * ratio)
      const mask = document.createElement('canvas')
      mask.width = 320
      mask.height = Math.round((320 * height) / width)
      const maskContext = mask.getContext('2d', { willReadFrequently: true })
      if (!maskContext) return
      maskContext.fillStyle = '#fff'
      maskContext.textAlign = 'center'
      maskContext.textBaseline = 'middle'
      maskContext.font = `800 ${mask.height * 0.84}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
      maskContext.fillText(text, mask.width / 2, mask.height / 2)
      pixels = maskContext.getImageData(0, 0, mask.width, mask.height).data
      buildCells()
      synchronize()
    }

    function move(event: PointerEvent) {
      if (reduced || event.pointerType === 'touch') return
      const bounds = container!.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left - width / 2
      pointer.y = event.clientY - bounds.top - height / 2
      pointer.time = elapsed
    }

    function click(event: MouseEvent) {
      if (reduced) return
      const bounds = container!.getBoundingClientRect()
      waves = [...waves.slice(-2), {
        x: event.clientX - bounds.left - width / 2,
        y: event.clientY - bounds.top - height / 2,
        time: elapsed,
      }]
    }

    function changeMotion() {
      reduced = motionPreference.matches
      pointer.time = -1000000
      waves = []
      synchronize()
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      synchronize()
    })
    resizeObserver.observe(container)
    intersectionObserver.observe(container)
    interactionTarget.addEventListener('pointermove', move, { passive: true })
    interactionTarget.addEventListener('click', click, { passive: true })
    document.addEventListener('visibilitychange', synchronize)
    motionPreference.addEventListener('change', changeMotion)
    color = getComputedStyle(container).getPropertyValue('--text').trim() || '#eeeeee'
    resize()

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      interactionTarget.removeEventListener('pointermove', move)
      interactionTarget.removeEventListener('click', click)
      document.removeEventListener('visibilitychange', synchronize)
      motionPreference.removeEventListener('change', changeMotion)
    }
  }, [text])

  return (
    <div ref={containerRef} className="glyph-text" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
