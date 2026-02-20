import { useRef } from 'react'

export function useInit(fn: () => void) {
  const didRun = useRef(false)
  if (!didRun.current) {
    fn()
    didRun.current = true
  }
}
