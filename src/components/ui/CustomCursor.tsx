import { useEffect, useRef, memo } from 'react'
import gsap from 'gsap'

export const CustomCursor = memo(() => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const isHovered = useRef(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.getAttribute('role') === 'switch' ||
          target.closest('button') ||
          target.closest('a'))
      ) {
        isHovered.current = true
      } else {
        isHovered.current = false
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    const setDotX = gsap.quickSetter(dotRef.current, 'x', 'px')
    const setDotY = gsap.quickSetter(dotRef.current, 'y', 'px')
    const setRingX = gsap.quickSetter(ringRef.current, 'x', 'px')
    const setRingY = gsap.quickSetter(ringRef.current, 'y', 'px')
    const setRingScale = gsap.quickSetter(ringRef.current, 'scale')

    const updatePhysics = () => {
      setDotX(pos.current.x - 4)
      setDotY(pos.current.y - 4)

      ringPos.current.x += (pos.current.x - 16 - ringPos.current.x) * 0.18
      ringPos.current.y += (pos.current.y - 16 - ringPos.current.y) * 0.18

      setRingX(ringPos.current.x)
      setRingY(ringPos.current.y)
      setRingScale(isHovered.current ? 1.6 : 1.0)
    }

    gsap.ticker.add(updatePhysics)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      gsap.ticker.remove(updatePhysics)
    }
  }, [])

  return (
    <div className="hidden md:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50 shadow-[0_0_8px_#00f0ff]"
      ></div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/60 pointer-events-none z-50 transition-colors duration-150 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
      ></div>
    </div>
  )
})
