import { useEffect, useRef } from 'react'

const LAYERS = [
  { count: 1000, size: 1, duration: 50 },
  { count: 400, size: 2, duration: 100 },
  { count: 200, size: 3, duration: 150 },
]

const DRIFT = 2000
const FACTOR = 0.05
const STIFFNESS = 50
const DAMPING = 20

function generateStars(count: number) {
  const shadows: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * DRIFT * 2) - DRIFT
    const y = Math.floor(Math.random() * DRIFT * 2) - DRIFT
    shadows.push(`${x}px ${y}px`)
  }
  return shadows.join(', ')
}

export default function StarsBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    const parallax = parallaxRef.current
    if (!container || !parallax) return

    layerRefs.current.forEach((layer, index) => {
      if (!layer) return
      const shadow = generateStars(LAYERS[index].count)
      layer.querySelectorAll<HTMLElement>('.stars-dot').forEach((dot) => {
        dot.style.boxShadow = shadow
      })
    })

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = motionPreference.matches
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let velocityX = 0
    let velocityY = 0
    let frame = 0
    let previous = 0

    function syncPaused() {
      container!.classList.toggle('is-paused', reduced || document.hidden)
      if (document.hidden || reduced) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    function step(now: number) {
      const delta = Math.min((now - previous) / 1000, 1 / 20)
      previous = now
      velocityX += ((targetX - x) * STIFFNESS - velocityX * DAMPING) * delta
      velocityY += ((targetY - y) * STIFFNESS - velocityY * DAMPING) * delta
      x += velocityX * delta
      y += velocityY * delta
      parallax!.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
      const settled = Math.abs(targetX - x) < 0.05 && Math.abs(velocityX) < 0.05
        && Math.abs(targetY - y) < 0.05 && Math.abs(velocityY) < 0.05
      if (settled) {
        x = targetX
        y = targetY
        velocityX = 0
        velocityY = 0
        frame = 0
        return
      }
      frame = requestAnimationFrame(step)
    }

    function start() {
      if (frame || reduced || document.hidden) return
      previous = performance.now()
      frame = requestAnimationFrame(step)
    }

    function shift(clientX: number, clientY: number) {
      if (reduced) return
      targetX = -(clientX - window.innerWidth / 2) * FACTOR
      targetY = -(clientY - window.innerHeight / 2) * FACTOR
      start()
    }

    function move(event: PointerEvent) {
      if (event.pointerType === 'touch') return
      shift(event.clientX, event.clientY)
    }

    function press(event: PointerEvent) {
      shift(event.clientX, event.clientY)
    }

    function changeMotion() {
      reduced = motionPreference.matches
      if (reduced) {
        targetX = 0
        targetY = 0
        x = 0
        y = 0
        velocityX = 0
        velocityY = 0
        parallax!.style.transform = ''
      }
      syncPaused()
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', press, { passive: true })
    document.addEventListener('visibilitychange', syncPaused)
    motionPreference.addEventListener('change', changeMotion)
    syncPaused()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', press)
      document.removeEventListener('visibilitychange', syncPaused)
      motionPreference.removeEventListener('change', changeMotion)
    }
  }, [])

  return (
    <div ref={containerRef} className="stars-background" aria-hidden="true">
      <div ref={parallaxRef} className="stars-parallax">
        {LAYERS.map((layer, index) => (
          <div
            key={layer.size}
            ref={(node) => { layerRefs.current[index] = node }}
            className="stars-layer"
            style={{ animationDuration: `${layer.duration}s` }}
          >
            <span className="stars-dot" style={{ width: layer.size, height: layer.size }} />
            <span className="stars-dot stars-dot--second" style={{ width: layer.size, height: layer.size }} />
          </div>
        ))}
      </div>
    </div>
  )
}
