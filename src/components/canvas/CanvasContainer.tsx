import { memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ChronosScene } from './ChronosScene'

export const CanvasContainer = memo(() => {
  return (
    <div
      id="chronos-canvas-root"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
        background: 'radial-gradient(ellipse at 50% 45%, #0f172a 0%, #090d16 50%, #030509 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 48 }}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <ChronosScene />
      </Canvas>
    </div>
  )
})
