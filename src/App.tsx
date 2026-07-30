import { useState } from 'react'
import { CanvasContainer } from './components/canvas/CanvasContainer'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { MobileDrawer } from './components/layout/MobileDrawer'
import { Footer } from './components/layout/Footer'
import { InputBufferShield } from './components/ui/InputBufferShield'
import { PerformanceHUD } from './components/ui/PerformanceHUD'
import { SettingsForm } from './components/ui/SettingsForm'
import { SystemArchitecture } from './components/ui/SystemArchitecture'
import './index.css'

export function App() {
  const [activeTab, setActiveTab] = useState('shield')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#07080c]">
      {/* 3D WebGL Canvas Layer (Isolated Background Thread) */}
      <CanvasContainer />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="relative z-10 pointer-events-none h-screen max-w-[1440px] mx-auto flex flex-col justify-between overflow-hidden">
        <div className="pointer-events-auto shrink-0">
          <Header
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>

        <div className="flex-1 min-h-0 flex w-full overflow-hidden">
          <div className="pointer-events-auto hidden md:flex shrink-0 h-full">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <main className="pointer-events-auto flex-1 h-full overflow-y-auto p-4 md:p-6 flex flex-col items-center">
            <div className="w-full max-w-md space-y-4 my-auto">
              {activeTab === 'shield' && (
                <>
                  <PerformanceHUD />
                  <InputBufferShield />
                </>
              )}

              {activeTab === 'metrics' && <PerformanceHUD />}

              {activeTab === 'settings' && <SettingsForm />}

              {activeTab === 'architecture' && <SystemArchitecture />}
            </div>
          </main>
        </div>

        <div className="pointer-events-auto shrink-0">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
