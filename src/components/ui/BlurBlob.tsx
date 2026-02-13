import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface BlurBlobProps {
  className?: string
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  style?: CSSProperties
}

export default function BlurBlob({
  className = '',
  size = 400,
  top,
  left,
  right,
  bottom,
  style: customStyle,
}: BlurBlobProps) {
  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    top,
    left,
    right,
    bottom,
    ...customStyle,
  }

  return <div className={cn('blur-blob bg-accent', className)} style={style} />
}
