import type { GraphModel } from '@tensorflow/tfjs-converter'
import type { Tensor } from '@tensorflow/tfjs-core'
import type { HandwritingRecognizer, RecognizerInitOptions } from '@zh-keyboard/core'
import { MathBackendCPU } from '@tensorflow/tfjs-backend-cpu/dist/backend_cpu'
import { _fusedMatMulConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/_FusedMatMul'
import { addConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/Add'
import { addNConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/AddN'
import { castConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/Cast'
import { conv2DConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/Conv2D'
import { expandDimsConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/ExpandDims'
import { fusedConv2DConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/FusedConv2D'
import { identityConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/Identity'
import { padV2Config } from '@tensorflow/tfjs-backend-cpu/dist/kernels/PadV2'
import { realDivConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/RealDiv'
import { reluConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/Relu'
import { reshapeConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/Reshape'
import { transposeConfig } from '@tensorflow/tfjs-backend-cpu/dist/kernels/Transpose'
import { loadGraphModel } from '@tensorflow/tfjs-converter/dist/executor/graph_model'
import { browser, cast, div, expandDims, ready, registerBackend, registerKernel, setBackend, tidy } from '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-converter/dist/flags'

const cpuKernelConfigs = [
  _fusedMatMulConfig,
  addConfig,
  addNConfig,
  castConfig,
  conv2DConfig,
  expandDimsConfig,
  fusedConv2DConfig,
  identityConfig,
  padV2Config,
  realDivConfig,
  reluConfig,
  reshapeConfig,
  transposeConfig,
]

registerBackend('cpu', () => new MathBackendCPU(), 1)
for (const kernelConfig of cpuKernelConfigs) {
  registerKernel(kernelConfig)
}

const MODEL_INPUT_SIZE = 48
const MODEL_INPUT_CHANNELS = 1
const RESULT_COUNT = 10
type RecognitionCanvas = HTMLCanvasElement | OffscreenCanvas
type RecognitionContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D

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
  private canvas: RecognitionCanvas
  private ctx: RecognitionContext
  private modelPath: string
  private dictPath: string
  private backend: 'webgl' | 'cpu'

  constructor(options: RecognizerOptions) {
    this.modelPath = options.modelPath
    this.dictPath = options.dictPath
    this.backend = options.backend || 'cpu'
    if (typeof document !== 'undefined') {
      this.canvas = document.createElement('canvas')
    } else if (typeof OffscreenCanvas !== 'undefined') {
      this.canvas = new OffscreenCanvas(MODEL_INPUT_SIZE, MODEL_INPUT_SIZE)
    } else {
      throw new TypeError('Handwriting recognizer requires a document or OffscreenCanvas')
    }
    this.canvas.width = this.canvas.height = MODEL_INPUT_SIZE
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!
  }

  async initialize(options?: RecognizerInitOptions) {
    const backendReady = await setBackend(this.backend)
    if (!backendReady) {
      throw new TypeError(`TensorFlow.js backend is not available: ${this.backend}`)
    }
    await ready()

    const text = await fetch(this.dictPath).then(r => r.text())
    this.dict = text.split('\n')
    this.model = await loadGraphModel(this.modelPath, {
      streamWeights: true,
      onProgress: options?.onProgress,
    })
    // 预热模型，避免第一次真实识别承担初始化开销。
    await this.recognize([10, 10, 0, 20, 20, 1])
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

    return tidy(() => {
      // The new model expects [1, 48, 48, 1] float32 input. Keep the
      // white-background/black-stroke representation and normalize it to 0..1.
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const image = browser.fromPixels(imageData, MODEL_INPUT_CHANNELS)
      const floatImage = cast(image, 'float32')
      const normalizedImage = div(floatImage, 255)
      const batchedImage = expandDims(normalizedImage, 0)

      // The new model returns logits rather than probabilities. Their order is
      // still sufficient for Top-K decoding, so applying softmax is unnecessary.
      const logits = (model!.predict(batchedImage) as Tensor).dataSync()
      const idxs = Array.from(logits.keys()).sort((a, b) => logits[b] - logits[a]).slice(0, RESULT_COUNT)

      return idxs.map(i => (i < dict.length ? dict[i] : '')).filter(Boolean)
    })
  }

  async close() {
    this.model?.dispose()
    this.model = undefined
  }
}
