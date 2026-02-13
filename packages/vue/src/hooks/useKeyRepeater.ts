import { createKeyRepeater } from '@zh-keyboard/core'
import { onBeforeUnmount } from 'vue'

export function useKeyRepeater() {
  const repeater = createKeyRepeater()

  function startRepeat(e: PointerEvent, action: () => void) {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement | null)?.setPointerCapture?.(e.pointerId)
    repeater.start(action)
  }

  function stopRepeat() {
    repeater.stop()
  }

  onBeforeUnmount(() => {
    repeater.stop()
  })

  return {
    startRepeat,
    stopRepeat,
  }
}
