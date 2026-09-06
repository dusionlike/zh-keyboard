export type LatestTask<T> = () => T | PromiseLike<T>

interface PendingTask {
  run: () => unknown | PromiseLike<unknown>
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}

/**
 * A single-concurrency queue that keeps only the latest pending task.
 *
 * A task that has already started is never cancelled. When a pending task is
 * replaced, its submit promise resolves with `undefined` and its callback is
 * released without being executed.
 */
export class LatestTaskQueue {
  private pendingTask?: PendingTask
  private running = false
  private disposed = false

  get isRunning(): boolean {
    return this.running
  }

  get hasPending(): boolean {
    return this.pendingTask !== undefined
  }

  submit<T>(task: LatestTask<T>): Promise<T | undefined> {
    if (this.disposed) {
      return Promise.reject(new Error('LatestTaskQueue has been disposed'))
    }

    let resolveTask!: (value: T | undefined | PromiseLike<T | undefined>) => void
    let rejectTask!: (reason?: unknown) => void
    const result = new Promise<T | undefined>((resolve, reject) => {
      resolveTask = resolve
      rejectTask = reject
    })

    // Resolve the previous pending call before dropping its callback. This
    // prevents callers from waiting forever and releases its captured data.
    this.pendingTask?.resolve(undefined)
    this.pendingTask = {
      run: task,
      resolve: value => resolveTask(value as T | undefined),
      reject: rejectTask,
    }
    this.startNext()

    return result
  }

  /**
   * Drop the current pending task while keeping the queue usable.
   * The running task, if any, is allowed to finish.
   */
  clearPending(): void {
    const pendingTask = this.pendingTask
    this.pendingTask = undefined
    pendingTask?.resolve(undefined)
  }

  /**
   * Permanently stop accepting tasks and release the pending task, if any.
   * A task that is already running is not cancelled.
   */
  dispose(): void {
    this.disposed = true
    this.clearPending()
  }

  private startNext(): void {
    if (this.running || this.disposed || !this.pendingTask) {
      return
    }

    // Take the task out of pending before invoking it. A task may submit a
    // newer task synchronously; that task must become pending behind this one.
    const task = this.pendingTask
    this.pendingTask = undefined
    this.running = true

    let taskResult: unknown | PromiseLike<unknown>
    try {
      taskResult = task.run()
    } catch (error) {
      task.reject(error)
      this.finishCurrentTask()
      return
    }

    void Promise.resolve(taskResult)
      .then(
        value => task.resolve(value),
        reason => task.reject(reason),
      )
      .finally(() => this.finishCurrentTask())
  }

  private finishCurrentTask(): void {
    this.running = false
    this.startNext()
  }
}
