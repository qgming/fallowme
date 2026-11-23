import { useEffect, useRef } from 'react'

type Cell = { x: number; y: number; seed: number; ambient: boolean }
type Wave = { x: number; y: number; time: number }

const characters = '01x+*=/<>\\'

function noise(x: number, y: number) {
  let value = Math.imul(x + 4096, 374761393) + Math.imul(y + 4096, 668265263)
  value = Math.imul(value ^ (value >>> 13), 1274126177)
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296
}

export default function CharacterField({ className = '' }: { className?: string }) {
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
    const image = new Image()
    let pixels: Uint8ClampedArray | undefined
    let cells: Cell[] = []
    let waves: Wave[] = []
    let width = 0
    let height = 0
    let cellSize = 8
    let ratio = 1
    let color = '#999999'
    let reduced = motionPreference.matches
    let inView = true
    let disposed = false
    let frame = 0
    let elapsed = 0
    let previousTime = 0
    let lastPaint = 0
    const pointer = { x: 0, y: 0, time: -1000000 }

    function buildCells() {
      const data = pixels
      if (!data || !width || !height) return
      const size = Math.min(width, height) * 0.81
      let step = Math.max(5, Math.min(width, height) / 54)
      do {
        const next: Cell[] = []
        const rows = Math.ceil(height / (step * 1.3))
        const columns = Math.ceil(width / step)
        for (let row = 0; row <= rows; row++) {
          for (let column = 0; column <= columns; column++) {
            const x = (column - columns / 2) * step
            const y = (row - rows / 2) * step * 1.3
            const sampleX = Math.floor((x / size + 0.5) * 256)
            const sampleY = Math.floor((y / size + 0.5) * 256)
            const seed = noise(column, row)
            const filled = sampleX >= 0 && sampleX < 256 && sampleY >= 0 && sampleY < 256
              && data[(sampleY * 256 + sampleX) * 4 + 3] > 96
            const distance = Math.hypot(x, y)
            const ambient = !filled && seed > 0.982 && distance > size * 0.52 && distance < size * 0.84
            if (filled || ambient) next.push({ x, y, seed, ambient })
          }
        }
        cells = next
        cellSize = step
        step *= 1.12
      } while (cells.length > 1400)
    }

    function draw() {
      if (disposed || !width || !height) return
      context!.setTransform(ratio, 0, 0, ratio, 0, 0)
      context!.clearRect(0, 0, width, height)
      context!.fillStyle = color
      context!.font = `${cellSize * 1.12}px "SFMono-Regular", Consolas, "Liberation Mono", monospace`
      context!.textAlign = 'center'
      context!.textBaseline = 'middle'
      const time = reduced ? 0 : elapsed
      const angle = -0.09 + Math.sin(time / 18000) * 0.014
      const cosine = Math.cos(angle)
      const sine = Math.sin(angle)
      const radius = Math.min(width, height) * 0.25
      const hover = reduced ? 0 : Math.exp(-(elapsed - pointer.time) / 700)
      waves = reduced ? [] : waves.filter((wave) => elapsed - wave.time < 2600)

      for (const cell of cells) {
        let x = cell.x * cosine - cell.y * sine
        let y = cell.x * sine + cell.y * cosine
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
            x += dx / distance * ring * 3
            y += dy / distance * ring * 3
          }
        }
        const base = cell.ambient ? 0.13 + cell.seed * 0.1 : 0.52 + cell.seed * 0.27
        context!.globalAlpha = Math.min(1, base + intensity * 0.37)
        const index = Math.floor(cell.seed * characters.length + time / 11000) % characters.length
        context!.fillText(characters[index], width / 2 + x, height / 2 + y)
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
    window.addEventListener('resize', resize, { passive: true })
    image.onload = () => {
      if (disposed) return
      const mask = document.createElement('canvas')
      mask.width = 256
      mask.height = 256
      const maskContext = mask.getContext('2d', { willReadFrequently: true })
      if (!maskContext) return
      maskContext.drawImage(image, 0, 0, 256, 256)
      pixels = maskContext.getImageData(0, 0, 256, 256).data
      buildCells()
      synchronize()
    }
    color = getComputedStyle(container).getPropertyValue('--glyph-color').trim() || '#999999'
    resize()
    image.src = `${import.meta.env.BASE_URL}assets/profile/mark.svg`

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      interactionTarget.removeEventListener('pointermove', move)
      interactionTarget.removeEventListener('click', click)
      document.removeEventListener('visibilitychange', synchronize)
      motionPreference.removeEventListener('change', changeMotion)
      window.removeEventListener('resize', resize)
      image.onload = null
    }
  }, [])

  return <div ref={containerRef} className={`character-field ${className}`.trim()} aria-hidden="true" style={{ pointerEvents: 'none' }}><canvas ref={canvasRef} /></div>
}
