import { CanvasContainer } from './components/canvas/CanvasContainer'
import { InputBufferShield } from './components/ui/InputBufferShield'
import { PerformanceHUD } from './components/ui/PerformanceHUD'
import './index.css'

export function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#07080c]">
      {/* 3D WebGL Canvas Layer (Isolated Background Thread) */}
      <CanvasContainer />

      {/* Interactive HTML UI Overlay Layer */}
      <div className="relative z-10 pointer-events-none min-h-screen flex items-center justify-center p-6">
        <div className="pointer-events-auto w-full max-w-md space-y-4">
          <PerformanceHUD />
          <InputBufferShield />
        </div>
      </div>
    </div>
  )
}

export default App
