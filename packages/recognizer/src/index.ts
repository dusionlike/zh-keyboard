import type { GraphModel, Tensor } from '@tensorflow/tfjs'
import type { HandwritingRecognizer, RecognizerInitOptions } from '@zh-keyboard/core'
import { loadGraphModel } from '@tensorflow/tfjs-converter'
import * as tf from '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-cpu'

export interface RecognizerOptions {
  /**
   * 模型路径
   */
  modelPath: string
  /**
   * 字典路径
   */
  dictPath: string
  /**
   * 后端类型
   */
  backend?: 'webgl' | 'cpu'
}

export class ZhkRecognizer implements HandwritingRecognizer {
  private model?: GraphModel
  private dict: string[] = []
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private modelPath: string
  private dictPath: string
  private backend: 'webgl' | 'cpu'

  constructor(options: RecognizerOptions) {
    this.modelPath = options.modelPath
    this.dictPath = options.dictPath
    this.backend = options.backend || 'cpu'
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.canvas.height = 64
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!
  }

  async initialize(options?: RecognizerInitOptions) {
    const text = await fetch(this.dictPath).then(r => r.text())
    this.dict = text.split('\n')
    this.model = await loadGraphModel(this.modelPath, {
      streamWeights: true,
      onProgress: options?.onProgress,
    })
    // 如果后端为webgl，则需要进行预热
    if (this.backend === 'webgl') {
      await tf.setBackend('webgl')
      await tf.ready()
      await this.recognize([10, 10, 0, 20, 20, 1])
    } else {
      await tf.setBackend('cpu')
    }
    return true
  }

  async recognize(strokeData: number[]): Promise<string[]> {
    if (!this.model) {
      throw new Error('Model not initialized')
    }
    const { canvas, ctx, model, dict } = this
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const n = strokeData.length / 3
    const strokes = Array.from({ length: n }, (_, i) => ({
      x: strokeData[3 * i],
      y: strokeData[3 * i + 1],
      isEnd: strokeData[3 * i + 2] === 1,
    }))

    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const { x, y } of strokes) {
      if (x < minX) {
        minX = x
      }
      if (x > maxX) {
        maxX = x
      }
      if (y < minY) {
        minY = y
      }
      if (y > maxY) {
        maxY = y
      }
    }

    const w = maxX - minX || 1
    const h = maxY - minY || 1
    const cx = (minX + maxX) / 2
    const cy = (minY + maxY) / 2
    const scale = Math.min(canvas.width * 0.9 / w, canvas.height * 0.9 / h)

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    let last: { x: number, y: number, isEnd: boolean } | null = null
    for (const s of strokes) {
      const x = canvas.width / 2 + (s.x - cx) * scale
      const y = canvas.height / 2 + (s.y - cy) * scale
      if (last && !last.isEnd) {
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2 + (last.x - cx) * scale, canvas.height / 2 + (last.y - cy) * scale)
        ctx.lineTo(x, y)
        ctx.stroke()
      } else {
        ctx.beginPath()
        ctx.moveTo(x, y)
      }
      last = s
    }

    return tf.tidy(() => {
      const image = tf.browser.fromPixels(canvas, 3)
      const floatImage = tf.cast(image, 'float32')
      const normalizedImage = tf.div(floatImage, 255)
      const batchedImage = tf.expandDims(normalizedImage, 0)

      const probs = (model!.predict(batchedImage) as Tensor).dataSync()
      const idxs = Array.from(probs.keys()).sort((a, b) => probs[b] - probs[a]).slice(0, 10)

      return idxs.map(i => (i < dict.length ? dict[i] : '')).filter(Boolean)
    })
  }

  async close() {
    this.model?.dispose()
    this.model = undefined
  }
}
