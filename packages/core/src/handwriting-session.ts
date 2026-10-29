import { LatestTaskQueue } from './latest-task-queue'

export interface HandwritingSessionOptions {
  recognize: (strokeData: number[]) => Promise<string[]>
  onCandidates: (candidates: string[]) => void
  onPreview?: (candidate: string) => void
  onCommit: (candidate: string) => void
  onClear: () => void
  onError?: (error: unknown) => void
  getTarget?: () => unknown
  /** Reuse recognition serialization when a canvas is recreated on resize. */
  queue?: LatestTaskQueue
}

/** Keeps the current candidate editable until selection or the next character. */
export class HandwritingSession {
  private queue: LatestTaskQueue
  private revision = 0
  private candidates: string[] = []
  private recognition: Promise<void> | undefined
  private target: unknown
  private disposed = false
  private readyForNextCharacter = false

  constructor(private options: HandwritingSessionOptions) {
    this.queue = options.queue ?? new LatestTaskQueue()
  }

  startStroke(): void {
    if (this.disposed)
      return
    if (this.readyForNextCharacter) {
      if (this.isCurrent(this.revision)) {
        this.select(0)
      } else {
        this.reset()
      }
    }
    this.revision++
    this.queue.clearPending()
    this.target = this.options.getTarget?.()
  }

  async recognize(strokeData: number[]): Promise<void> {
    if (this.disposed) {
      return
    }
    const revision = this.revision
    this.recognition = this.queue.submit(() => this.options.recognize(strokeData))
      .then((results) => {
        if (results !== undefined && this.isCurrent(revision)) {
          this.setCandidates(results)
        }
      })
      .catch((error: unknown) => {
        if (this.isCurrent(revision)) {
          this.setCandidates([])
          this.options.onError?.(error)
        }
      })
    await this.recognition
  }

  async finish(): Promise<void> {
    const revision = this.revision
    // Finish recognizing the character before clearing its strokes. Keep the
    // candidates and pre-edit available until the user selects or writes again.
    await this.recognition
    if (this.isCurrent(revision) && this.candidates.length > 0 && !this.readyForNextCharacter) {
      this.readyForNextCharacter = true
      this.options.onClear()
    }
  }

  select(index: number): void {
    const candidate = this.candidates[index]
    if (!candidate || !this.isCurrent(this.revision)) {
      return
    }
    this.revision++
    this.queue.clearPending()
    this.recognition = undefined
    this.readyForNextCharacter = false
    this.options.onCommit(candidate)
    this.setCandidates([])
    this.options.onClear()
  }

  reset(): void {
    this.revision++
    this.queue.clearPending()
    this.recognition = undefined
    this.readyForNextCharacter = false
    this.setCandidates([])
    this.options.onClear()
  }

  dispose(): void {
    this.disposed = true
    this.revision++
    this.options.onPreview?.('')
    if (this.options.queue) {
      this.queue.clearPending()
    } else {
      this.queue.dispose()
    }
  }

  private isCurrent(revision: number): boolean {
    return !this.disposed
      && revision === this.revision
      && this.target === this.options.getTarget?.()
  }

  private setCandidates(candidates: string[]): void {
    this.candidates = candidates
    this.options.onCandidates(candidates)
    this.options.onPreview?.(candidates[0] ?? '')
  }
}
