import type React from 'react'
import { createKeyRepeater } from '@zh-keyboard/core'
import { useCallback, useEffect, useRef } from 'react'

export function useKeyRepeater() {
  const repeaterRef = useRef(createKeyRepeater())

  useEffect(() => {
    const repeater = repeaterRef.current
    return () => {
      repeater.stop()
    }
  }, [])

  const startRepeat = useCallback((e: React.PointerEvent, action: () => void) => {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement | null)?.setPointerCapture?.(e.pointerId)
    repeaterRef.current.start(action)
  }, [])

  const stopRepeat = useCallback(() => {
    repeaterRef.current.stop()
  }, [])

  return {
    startRepeat,
    stopRepeat,
  }
}
