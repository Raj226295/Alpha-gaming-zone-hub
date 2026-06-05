import { useEffect, useEffectEvent, useRef, useState } from 'react'

const interactiveSelector = [
  'a',
  'button',
  'label',
  'summary',
  'select',
  '[role="button"]',
  '[data-cursor="interactive"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
  'input[type="range"]',
  'input[type="submit"]',
  'input[type="button"]',
  'input[type="reset"]',
].join(', ')

const textInputSelector = [
  'textarea',
  '[contenteditable="true"]',
  'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="file"]):not([type="color"])',
].join(', ')

const hiddenPosition = -160
const trailScales = [1, 0.92, 0.82, 0.72, 0.62, 0.52, 0.42]
const trailOpacities = [0.82, 0.68, 0.56, 0.44, 0.34, 0.24, 0.14]
const sparkleParticles = [
  { distance: 22, spread: -16, scale: 1.05, delay: '0s' },
  { distance: 44, spread: 10, scale: 0.92, delay: '0.14s' },
  { distance: 68, spread: -6, scale: 0.84, delay: '0.28s' },
  { distance: 92, spread: 14, scale: 0.72, delay: '0.09s' },
  { distance: 118, spread: -12, scale: 0.62, delay: '0.22s' },
]

function supportsCursorEffect() {
  if (typeof window === 'undefined') {
    return false
  }

  return (
    window.matchMedia('(any-pointer: fine)').matches ||
    window.matchMedia('(hover: hover)').matches ||
    !window.matchMedia('(pointer: coarse)').matches
  )
}

function resolveCursorVariant(target) {
  if (!(target instanceof Element)) {
    return 'default'
  }

  if (target.closest(textInputSelector)) {
    return 'text'
  }

  if (target.closest(interactiveSelector)) {
    return 'interactive'
  }

  return 'default'
}

function buildTrailPath(points) {
  const visiblePoints = points.filter(({ x, y }) => x !== hiddenPosition && y !== hiddenPosition)

  if (visiblePoints.length < 2) {
    return ''
  }

  let path = `M ${visiblePoints[0].x.toFixed(2)} ${visiblePoints[0].y.toFixed(2)}`

  for (let index = 1; index < visiblePoints.length; index += 1) {
    const point = visiblePoints[index]
    path += ` L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
  }

  return path
}

function CursorEffect() {
  const trailGlowPathRef = useRef(null)
  const trailCorePathRef = useRef(null)
  const trailAccentPathRef = useRef(null)
  const trailNodeRefs = useRef([])
  const animationFrameRef = useRef(null)
  const pointerRef = useRef({ x: hiddenPosition, y: hiddenPosition })
  const previousPointerRef = useRef({ x: hiddenPosition, y: hiddenPosition })
  const trailPointsRef = useRef(
    trailScales.map(() => ({
      x: hiddenPosition,
      y: hiddenPosition,
    })),
  )

  const [isEnabled, setIsEnabled] = useState(() => {
    return supportsCursorEffect()
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [variant, setVariant] = useState('default')

  const setRootVar = useEffectEvent((name, value) => {
    if (typeof document === 'undefined') {
      return
    }

    document.documentElement.style.setProperty(name, value)
  })

  const setCursorPosition = useEffectEvent((x, y) => {
    setRootVar('--cursor-x', `${x}px`)
    setRootVar('--cursor-y', `${y}px`)
  })

  const setCursorMotion = useEffectEvent((dx, dy) => {
    const distance = Math.hypot(dx, dy)
    const angle = distance > 0 ? Math.atan2(dy, dx) * (180 / Math.PI) : 0
    const intensity = Math.min(Math.max(distance / 26, 0.24), 1)
    const trailLength = 76 + Math.min(distance * 3.4, 144)

    setRootVar('--cursor-angle', `${angle}deg`)
    setRootVar('--cursor-intensity', intensity.toFixed(3))
    setRootVar('--cursor-trail-length', `${trailLength}px`)
  })

  const setTrailPath = useEffectEvent((path) => {
    if (trailGlowPathRef.current) {
      trailGlowPathRef.current.setAttribute('d', path)
    }

    if (trailCorePathRef.current) {
      trailCorePathRef.current.setAttribute('d', path)
    }

    if (trailAccentPathRef.current) {
      trailAccentPathRef.current.setAttribute('d', path)
    }
  })

  const resetCursor = useEffectEvent(() => {
    pointerRef.current = { x: hiddenPosition, y: hiddenPosition }
    previousPointerRef.current = { x: hiddenPosition, y: hiddenPosition }
    trailPointsRef.current = trailScales.map(() => ({
      x: hiddenPosition,
      y: hiddenPosition,
    }))
    setCursorPosition(hiddenPosition, hiddenPosition)
    setRootVar('--cursor-angle', '0deg')
    setRootVar('--cursor-intensity', '0.24')
    setRootVar('--cursor-trail-length', '76px')
    setTrailPath('')
  })

  const handlePointerSupportChange = useEffectEvent(() => {
    const isSupported = supportsCursorEffect()

    setIsEnabled(isSupported)

    if (!isSupported) {
      setIsVisible(false)
      setIsPressed(false)
      setVariant('default')
      resetCursor()
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const finePointerQuery = window.matchMedia('(pointer: fine)')
    const hoverQuery = window.matchMedia('(hover: hover)')
    const handleChange = () => handlePointerSupportChange()

    finePointerQuery.addEventListener('change', handleChange)
    hoverQuery.addEventListener('change', handleChange)

    return () => {
      finePointerQuery.removeEventListener('change', handleChange)
      hoverQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined
    }

    const root = document.documentElement

    if (isEnabled) {
      root.classList.add('cursor-enabled')
      root.classList.add('cursor-enhanced')
    } else {
      root.classList.remove('cursor-enabled')
      root.classList.remove('cursor-enhanced')
    }

    return () => {
      root.classList.remove('cursor-enabled')
      root.classList.remove('cursor-enhanced')
    }
  }, [isEnabled])

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') {
      return undefined
    }

    const animateTrail = () => {
      const points = trailPointsRef.current
      const nodes = trailNodeRefs.current

      for (let index = 0; index < points.length; index += 1) {
        const target = index === 0 ? pointerRef.current : points[index - 1]
        const easing = Math.max(0.18, 0.32 - index * 0.025)

        points[index].x += (target.x - points[index].x) * easing
        points[index].y += (target.y - points[index].y) * easing

        const node = nodes[index]

        if (node) {
          node.style.transform = `translate3d(${points[index].x}px, ${points[index].y}px, 0) translate(-50%, -50%) scale(${trailScales[index]})`
        }
      }

      setTrailPath(buildTrailPath(points))

      animationFrameRef.current = window.requestAnimationFrame(animateTrail)
    }

    animationFrameRef.current = window.requestAnimationFrame(animateTrail)

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isEnabled])

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') {
      return undefined
    }

    const handlePointerMove = (event) => {
      const nextVariant = resolveCursorVariant(event.target)
      const nextX = event.clientX
      const nextY = event.clientY

      setVariant(nextVariant)

      if (nextVariant === 'text') {
        setIsVisible(false)
        setIsPressed(false)
        previousPointerRef.current = { x: nextX, y: nextY }
        return
      }

      const previous = previousPointerRef.current
      const dx = previous.x === hiddenPosition ? 0 : nextX - previous.x
      const dy = previous.y === hiddenPosition ? 0 : nextY - previous.y

      pointerRef.current = { x: nextX, y: nextY }
      previousPointerRef.current = { x: nextX, y: nextY }

      setCursorPosition(nextX, nextY)
      setCursorMotion(dx, dy)
      setIsVisible(true)
    }

    const handlePointerLeave = () => {
      setIsVisible(false)
      setIsPressed(false)
      setVariant('default')
      resetCursor()
    }

    const handlePointerDown = (event) => {
      if (resolveCursorVariant(event.target) === 'text') {
        return
      }

      setIsPressed(true)
    }

    const handlePointerUp = () => {
      setIsPressed(false)
    }

    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('mouseleave', handlePointerLeave)
    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('mouseup', handlePointerUp)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('blur', handlePointerLeave)

    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('mouseup', handlePointerUp)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('blur', handlePointerLeave)
    }
  }, [isEnabled])

  if (!isEnabled) {
    return null
  }

  const className = [
    'cursor-effects',
    isVisible ? 'visible' : '',
    isPressed ? 'active' : '',
    variant === 'interactive' ? 'interactive' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className} aria-hidden="true">
      <svg className="cursor-trail-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path ref={trailGlowPathRef} className="cursor-trail-path cursor-trail-path-glow"></path>
        <path ref={trailCorePathRef} className="cursor-trail-path cursor-trail-path-core"></path>
        <path ref={trailAccentPathRef} className="cursor-trail-path cursor-trail-path-accent"></path>
      </svg>
      {trailScales.map((scale, index) => (
        <div
          key={scale}
          ref={(node) => {
            trailNodeRefs.current[index] = node
          }}
          className="cursor-effect cursor-trail-node"
          style={{ '--trail-opacity': trailOpacities[index] }}
        ></div>
      ))}
      {sparkleParticles.map((particle) => (
        <div
          key={`${particle.distance}-${particle.spread}`}
          className="cursor-effect cursor-sparkle"
          style={{
            '--spark-distance': `${particle.distance}px`,
            '--spark-spread': `${particle.spread}px`,
            '--spark-scale': particle.scale,
            '--spark-delay': particle.delay,
          }}
        ></div>
      ))}
    </div>
  )
}

export default CursorEffect
