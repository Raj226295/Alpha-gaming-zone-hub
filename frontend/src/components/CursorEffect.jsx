import { useEffect, useEffectEvent, useRef, useState } from 'react'

const interactiveSelector = [
  'a',
  'button',
  '.card',
  '.glass-card',
  '[role="button"]',
  'label',
  'summary',
  'select',
].join(', ')

const textInputSelector = [
  'textarea',
  '[contenteditable="true"]',
  'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="file"]):not([type="color"])',
].join(', ')

const hiddenPosition = -100

function supportsCursorEffect() {
  if (typeof window === 'undefined') {
    return false
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }

  return (
    window.matchMedia('(pointer: fine)').matches ||
    window.matchMedia('(any-pointer: fine)').matches ||
    window.matchMedia('(hover: hover)').matches
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

function CursorEffect() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const animationFrameRef = useRef(0)
  const pointerRef = useRef({ x: hiddenPosition, y: hiddenPosition })
  const trailPositionRef = useRef({ x: hiddenPosition, y: hiddenPosition })
  const isVisibleRef = useRef(false)

  const [isEnabled, setIsEnabled] = useState(() => supportsCursorEffect())
  const [isVisible, setIsVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)

  const syncVisibleState = useEffectEvent((nextVisible) => {
    if (isVisibleRef.current === nextVisible) {
      return
    }

    isVisibleRef.current = nextVisible
    setIsVisible(nextVisible)
  })

  const resetCursor = useEffectEvent(() => {
    pointerRef.current = { x: hiddenPosition, y: hiddenPosition }
    trailPositionRef.current = { x: hiddenPosition, y: hiddenPosition }

    if (cursorRef.current) {
      cursorRef.current.style.left = `${hiddenPosition}px`
      cursorRef.current.style.top = `${hiddenPosition}px`
    }

    if (trailRef.current) {
      trailRef.current.style.left = `${hiddenPosition}px`
      trailRef.current.style.top = `${hiddenPosition}px`
    }
  })

  const handlePointerSupportChange = useEffectEvent(() => {
    const nextSupport = supportsCursorEffect()

    setIsEnabled(nextSupport)

    if (!nextSupport) {
      syncVisibleState(false)
      setIsInteractive(false)
      resetCursor()
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const mediaQueries = [
      window.matchMedia('(pointer: fine)'),
      window.matchMedia('(any-pointer: fine)'),
      window.matchMedia('(hover: hover)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ]
    const handleChange = () => handlePointerSupportChange()

    for (const mediaQuery of mediaQueries) {
      mediaQuery.addEventListener('change', handleChange)
    }

    return () => {
      for (const mediaQuery of mediaQueries) {
        mediaQuery.removeEventListener('change', handleChange)
      }
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
      const trail = trailRef.current
      const pointer = pointerRef.current
      const trailPosition = trailPositionRef.current

      trailPosition.x += (pointer.x - trailPosition.x) * 0.15
      trailPosition.y += (pointer.y - trailPosition.y) * 0.15

      if (trail) {
        trail.style.left = `${trailPosition.x}px`
        trail.style.top = `${trailPosition.y}px`
      }

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

      if (nextVariant === 'text') {
        syncVisibleState(false)
        setIsInteractive(false)
        return
      }

      pointerRef.current = { x: nextX, y: nextY }

      if (!isVisibleRef.current) {
        trailPositionRef.current = { x: nextX, y: nextY }
      }

      if (cursorRef.current) {
        cursorRef.current.style.left = `${nextX}px`
        cursorRef.current.style.top = `${nextY}px`
      }

      setIsInteractive(nextVariant === 'interactive')
      syncVisibleState(true)
    }

    const handlePointerLeave = () => {
      syncVisibleState(false)
      setIsInteractive(false)
      resetCursor()
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true })
    window.addEventListener('blur', handlePointerLeave, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('blur', handlePointerLeave)
    }
  }, [isEnabled])

  if (!isEnabled) {
    return null
  }

  const className = ['cursor-effects', isVisible ? 'visible' : '', isInteractive ? 'interactive' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className} aria-hidden="true">
      <div ref={cursorRef} className="cursor"></div>
      <div ref={trailRef} className="cursor-trail"></div>
    </div>
  )
}

export default CursorEffect
