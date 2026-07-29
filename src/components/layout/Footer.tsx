import { memo } from 'react'

export const Footer = memo(() => {
  return (
    <footer className="w-full bg-[#0d1222]/80 backdrop-blur-xl border-t border-white/10 px-6 py-2.5 flex items-center justify-between text-xs font-mono text-gray-500">
      <span>Engine: <strong className="text-cyan-400">Three.js + R3F</strong></span>
      <span>Structure: <strong className="text-purple-400">HTML5 Semantic Shells</strong></span>
      <span>Status: <strong className="text-emerald-400">0 Frame-Rate Leak</strong></span>
    </footer>
  )
})
