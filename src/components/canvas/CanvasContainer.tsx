import { memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { CanvasScene } from './CanvasScene'

export const CanvasContainer = memo(() => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto bg-[#07080c]">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 48 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <CanvasScene />
      </Canvas>
    </div>
  )
})
