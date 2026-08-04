import { useRef, useEffect, memo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const useElapsedTime = () => {
  const startTime = useRef<number | null>(null)

  return () => {
    if (startTime.current === null) {
      startTime.current = performance.now()
    }
    return (performance.now() - startTime.current) * 0.001
  }
}

const generateConstellationData = (count: number) => {
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  const cyan = new THREE.Color('#00f0ff')
  const purple = new THREE.Color('#a855f7')
  const emerald = new THREE.Color('#34d399')

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 28
    pos[i * 3 + 1] = (Math.random() - 0.5) * 28
    pos[i * 3 + 2] = (Math.random() - 0.5) * 28

    const rand = Math.random()
    const color = rand > 0.6 ? cyan : rand > 0.3 ? purple : emerald
    col[i * 3] = color.r
    col[i * 3 + 1] = color.g
    col[i * 3 + 2] = color.b
  }
  return { pos, col }
}

const CONSTELLATION_DATA = generateConstellationData(2000)

const ConstellationDust = memo(() => {
  const getElapsedTime = useElapsedTime()
  const pointsRef = useRef<THREE.Points>(null)

  useFrame(() => {
    const t = getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.02
      pointsRef.current.rotation.x = Math.sin(t * 0.015) * 0.08
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[CONSTELLATION_DATA.pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[CONSTELLATION_DATA.col, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
})

const OrbitingSatellite = memo(({ radius, speed, color }: { radius: number; speed: number; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const getElapsedTime = useElapsedTime()

  useFrame(() => {
    const t = getElapsedTime() * speed
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * radius
      meshRef.current.position.z = Math.sin(t) * radius
      meshRef.current.position.y = Math.sin(t * 2) * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
})

const TimeLattice = memo(() => {
  const groupRef = useRef<THREE.Group>(null)
  const coreMeshRef = useRef<THREE.Mesh>(null)
  const wireCoreRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  const getElapsedTime = useElapsedTime()

  useFrame(() => {
    const t = getElapsedTime()

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.15
    }

    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.x = t * 0.3
      coreMeshRef.current.rotation.y = t * 0.4
    }

    if (wireCoreRef.current) {
      wireCoreRef.current.rotation.x = -t * 0.5
      wireCoreRef.current.rotation.z = t * 0.3
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.35
      ring1Ref.current.rotation.x = Math.sin(t * 0.4) * 0.4
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.25
      ring2Ref.current.rotation.y = Math.cos(t * 0.3) * 0.5
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.2
      ring3Ref.current.rotation.z = Math.sin(t * 0.25) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={coreMeshRef}>
        <dodecahedronGeometry args={[1.1, 0]} />
        <meshPhysicalMaterial
          color="#00f0ff"
          emissive="#002b36"
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.95}
        />
      </mesh>

      <mesh ref={wireCoreRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#4c1d95"
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.025, 16, 120]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#004d66"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.0, 0.02, 16, 120]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#581c87"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.6, 0.015, 16, 120]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#064e3b"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      <OrbitingSatellite radius={2.5} speed={1.2} color="#00f0ff" />
      <OrbitingSatellite radius={3.0} speed={-0.9} color="#a855f7" />
      <OrbitingSatellite radius={3.6} speed={0.7} color="#34d399" />
    </group>
  )
})

export const CanvasScene = memo(() => {
  const lightsRef = useRef<THREE.Group>(null)
  const getElapsedTime = useElapsedTime()
  const mouseRef = useRef({ x: 0, y: 0 })
  const { camera } = useThree()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    const t = getElapsedTime()
    if (lightsRef.current) {
      lightsRef.current.rotation.y = t * 0.25
    }

    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, mouseRef.current.y * 0.06, 0.05)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -mouseRef.current.x * 0.06, 0.05)
  })

  return (
    <>
      <ambientLight intensity={0.7} />

      <group ref={lightsRef}>
        <directionalLight position={[8, 6, 8]} intensity={2.2} color="#00f0ff" />
        <pointLight position={[-8, -6, -8]} intensity={2.5} color="#a855f7" />
        <pointLight position={[0, 8, -4]} intensity={1.8} color="#34d399" />
      </group>

      <TimeLattice />
      <ConstellationDust />
    </>
  )
})
