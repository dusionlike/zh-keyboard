import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CanvasDrawer } from './canvas'

function canvas() {
  const context = new Proxy({}, { get: () => vi.fn() })
  return {
    width: 200,
    height: 200,
    getContext: () => context,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as HTMLCanvasElement
}

describe('canvas idle timer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('window', globalThis)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('delegates to the idle handler without losing strokes before recognition completes', () => {
    const onIdle = vi.fn()
    const drawer = new CanvasDrawer(canvas(), { clearDelay: 2000, onIdle })
    drawer.startDrawing(10, 20)
    drawer.endStroke()
    drawer.startClearTimer()
    vi.advanceTimersByTime(1999)
    expect(onIdle).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(onIdle).toHaveBeenCalledOnce()
    expect(drawer.getStrokeData()).toEqual([10, 20, 1])
    drawer.destroy()
  })

  it('keeps the previous clear-only behavior when no idle handler is supplied', () => {
    const drawer = new CanvasDrawer(canvas(), { clearDelay: 1000 })
    drawer.startDrawing(10, 20)
    drawer.startClearTimer()
    vi.advanceTimersByTime(1000)
    expect(drawer.getStrokeData()).toEqual([])
    drawer.destroy()
  })

  it('restarts the pending timer when the configured waiting time changes', () => {
    const onIdle = vi.fn()
    const drawer = new CanvasDrawer(canvas(), { clearDelay: 1000, onIdle })
    drawer.startDrawing(10, 20)
    drawer.startClearTimer()
    vi.advanceTimersByTime(500)
    drawer.setClearDelay(3000)
    vi.advanceTimersByTime(2999)
    expect(onIdle).not.toHaveBeenCalled()
    expect(drawer.getStrokeData()).toEqual([10, 20, 0])
    vi.advanceTimersByTime(1)
    expect(onIdle).toHaveBeenCalledOnce()
    drawer.destroy()
  })

  it('cancels the idle timer on explicit clearing or unmount', () => {
    const onIdle = vi.fn()
    const drawer = new CanvasDrawer(canvas(), { clearDelay: 2000, onIdle })
    drawer.startClearTimer()
    drawer.clearCanvas()
    vi.advanceTimersByTime(2000)
    drawer.startClearTimer()
    drawer.destroy()
    vi.advanceTimersByTime(2000)
    expect(onIdle).not.toHaveBeenCalled()
  })

  it('keeps the new first point when confirming the previous word clears the canvas', () => {
    class MouseInput {
      offsetX = 12
      offsetY = 34
      preventDefault = vi.fn()
    }
    vi.stubGlobal('MouseEvent', MouseInput)
    const element = canvas()
    const drawer: CanvasDrawer = new CanvasDrawer(element, { onDrawStart: () => drawer.clearCanvas() })
    const start = vi.mocked(element.addEventListener).mock.calls.find(([type]) => type === 'mousedown')![1] as EventListener
    start(new MouseInput() as unknown as Event)
    expect(drawer.getStrokeData()).toEqual([12, 34, 0])
    drawer.destroy()
  })
})
