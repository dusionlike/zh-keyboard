export interface CanvasDrawerOptions {
  onDrawEnd?: () => void
  clearDelay?: number
}

export class CanvasDrawer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private lastX: number = 0
  private lastY: number = 0
  private strokeData: number[] = []
  private clearTimerId: number | null = null
  private isDrawing: boolean = false
  private options: CanvasDrawerOptions

  constructor(canvas: HTMLCanvasElement, options: CanvasDrawerOptions = {}) {
    this.canvas = canvas
    this.options = { clearDelay: 1000, ...options } // Default clearDelay is 1000ms
    const context = this.canvas.getContext('2d')
    if (!context) {
      throw new Error('Failed to get 2D rendering context')
    }
    this.ctx = context
    this.setupCanvas()
    this.attachEvents()
  }

  private setupCanvas(): void {
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 3
    this.ctx.strokeStyle = '#000'
    this.clearCanvas()
    this.drawGrid()
  }

  drawGrid(): void {
    const width = this.canvas.width
    const height = this.canvas.height

    this.ctx.save()
    this.ctx.strokeStyle = '#ddd'
    this.ctx.lineWidth = 1
    this.ctx.setLineDash([3, 3])

    this.ctx.beginPath()
    this.ctx.moveTo(0, height / 2)
    this.ctx.lineTo(width, height / 2)
    this.ctx.moveTo(width / 2, 0)
    this.ctx.lineTo(width / 2, height)
    this.ctx.stroke()

    // 外边框用实线
    this.ctx.setLineDash([])
    this.ctx.beginPath()
    this.ctx.rect(0, 0, width, height)
    this.ctx.stroke()

    this.ctx.restore()
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawGrid()
    this.strokeData = [] // 清除笔迹数据
    this.resetClearTimer() // 清除画布时也重置计时器
  }

  startDrawing(offsetX: number, offsetY: number): void {
    this.lastX = offsetX
    this.lastY = offsetY
    // Restore drawing style for actual strokes
    this.ctx.strokeStyle = '#000'
    this.ctx.lineWidth = 3
    this.ctx.setLineDash([]) // Solid line

    // 记录起始点，0表示不是笔画的最后一点
    this.strokeData.push(offsetX, offsetY, 0)
  }

  draw(offsetX: number, offsetY: number): void {
    this.ctx.beginPath()
    this.ctx.moveTo(this.lastX, this.lastY)
    this.ctx.lineTo(offsetX, offsetY)
    this.ctx.stroke()
    this.lastX = offsetX
    this.lastY = offsetY

    // 记录绘制点，0表示不是笔画的最后一点
    this.strokeData.push(offsetX, offsetY, 0)
  }

  endStroke(): void {
    // 标记笔画的最后一点，将最后一组坐标的c设为1
    if (this.strokeData.length >= 3) {
      this.strokeData[this.strokeData.length - 1] = 1
    }
  }

  getStrokeData(): ReadonlyArray<number> {
    return this.strokeData
  }

  resetClearTimer(): void {
    if (this.clearTimerId) {
      window.clearTimeout(this.clearTimerId)
      this.clearTimerId = null
    }
  }

  startClearTimer(): void {
    this.resetClearTimer()
    this.clearTimerId = window.setTimeout(() => {
      this.clearCanvas()
      this.clearTimerId = null
    }, this.options.clearDelay)
  }

  private getEventCoordinates(e: MouseEvent | TouchEvent): { offsetX: number, offsetY: number } {
    if (e instanceof MouseEvent) {
      return { offsetX: e.offsetX, offsetY: e.offsetY }
    } else {
      const touch = (e as TouchEvent).touches[0] || (e as TouchEvent).changedTouches[0]
      const rect = (e.target as HTMLElement).getBoundingClientRect()
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      }
    }
  }

  private handleStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    this.isDrawing = true
    const { offsetX, offsetY } = this.getEventCoordinates(e)
    this.startDrawing(offsetX, offsetY)
    this.resetClearTimer()
  }

  private handleMove = (e: MouseEvent | TouchEvent) => {
    if (!this.isDrawing)
      return
    e.preventDefault()
    const { offsetX, offsetY } = this.getEventCoordinates(e)
    this.draw(offsetX, offsetY)
    this.resetClearTimer()
  }

  private handleEnd = (e: MouseEvent | TouchEvent) => {
    if (!this.isDrawing)
      return
    e.preventDefault()
    this.isDrawing = false
    this.endStroke()
    this.startClearTimer()
    if (this.options.onDrawEnd) {
      this.options.onDrawEnd()
    }
  }

  private attachEvents(): void {
    this.canvas.addEventListener('mousedown', this.handleStart)
    this.canvas.addEventListener('mousemove', this.handleMove)
    this.canvas.addEventListener('mouseup', this.handleEnd)
    this.canvas.addEventListener('mouseleave', this.handleEnd)

    this.canvas.addEventListener('touchstart', this.handleStart, { passive: false })
    this.canvas.addEventListener('touchmove', this.handleMove, { passive: false })
    this.canvas.addEventListener('touchend', this.handleEnd)
    this.canvas.addEventListener('touchcancel', this.handleEnd)
  }

  private detachEvents(): void {
    this.canvas.removeEventListener('mousedown', this.handleStart)
    this.canvas.removeEventListener('mousemove', this.handleMove)
    this.canvas.removeEventListener('mouseup', this.handleEnd)
    this.canvas.removeEventListener('mouseleave', this.handleEnd)

    this.canvas.removeEventListener('touchstart', this.handleStart)
    this.canvas.removeEventListener('touchmove', this.handleMove)
    this.canvas.removeEventListener('touchend', this.handleEnd)
    this.canvas.removeEventListener('touchcancel', this.handleEnd)
  }

  destroy(): void {
    this.detachEvents()
    this.resetClearTimer()
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx
  }
}
