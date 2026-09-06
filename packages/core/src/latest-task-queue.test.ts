import { describe, expect, it } from 'vitest'
import { LatestTaskQueue } from './latest-task-queue'

function deferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve
    reject = promiseReject
  })
  return { promise, resolve, reject }
}

describe('latest task queue', () => {
  it('executes the first task and only the latest pending task', async () => {
    const queue = new LatestTaskQueue()
    const first = deferred<void>()
    const started: string[] = []
    let activeTasks = 0
    let maxActiveTasks = 0

    const taskA = queue.submit(async () => {
      started.push('A')
      activeTasks++
      maxActiveTasks = Math.max(maxActiveTasks, activeTasks)
      try {
        await first.promise
      } finally {
        activeTasks--
      }
    })
    const taskB = queue.submit(() => {
      started.push('B')
      return 'B'
    })
    const taskC = queue.submit(() => {
      started.push('C')
      return 'C'
    })
    const taskD = queue.submit(() => {
      started.push('D')
      activeTasks++
      maxActiveTasks = Math.max(maxActiveTasks, activeTasks)
      activeTasks--
      return 'D'
    })

    expect(started).toEqual(['A'])
    expect(queue.isRunning).toBe(true)
    expect(queue.hasPending).toBe(true)

    first.resolve()

    await expect(taskA).resolves.toBeUndefined()
    await expect(taskB).resolves.toBeUndefined()
    await expect(taskC).resolves.toBeUndefined()
    await expect(taskD).resolves.toBe('D')
    expect(started).toEqual(['A', 'D'])
    expect(maxActiveTasks).toBe(1)
    expect(queue.isRunning).toBe(false)
    expect(queue.hasPending).toBe(false)
  })

  it('keeps replacing the pending task while the latest task is running', async () => {
    const queue = new LatestTaskQueue()
    const first = deferred<void>()
    const latest = deferred<void>()
    const latestStarted = deferred<void>()
    const started: string[] = []

    const taskA = queue.submit(async () => {
      started.push('A')
      await first.promise
    })
    const taskD = queue.submit(async () => {
      started.push('D')
      latestStarted.resolve()
      await latest.promise
    })

    first.resolve()
    await latestStarted.promise

    const taskE = queue.submit(() => {
      started.push('E')
      return 'E'
    })
    const taskF = queue.submit(() => {
      started.push('F')
      return 'F'
    })
    const taskG = queue.submit(() => {
      started.push('G')
      return 'G'
    })

    latest.resolve()

    await expect(taskA).resolves.toBeUndefined()
    await expect(taskD).resolves.toBeUndefined()
    await expect(taskE).resolves.toBeUndefined()
    await expect(taskF).resolves.toBeUndefined()
    await expect(taskG).resolves.toBe('G')
    expect(started).toEqual(['A', 'D', 'G'])
  })

  it('continues with the latest pending task after a failure', async () => {
    const queue = new LatestTaskQueue()
    const gate = deferred<void>()
    const error = new Error('recognition failed')
    const started: string[] = []

    const failedTask = queue.submit(async () => {
      started.push('A')
      await gate.promise
      throw error
    })
    const successfulTask = queue.submit(() => {
      started.push('D')
      return 'D'
    })

    gate.resolve()

    await expect(failedTask).rejects.toBe(error)
    await expect(successfulTask).resolves.toBe('D')
    expect(started).toEqual(['A', 'D'])
    expect(queue.isRunning).toBe(false)
    expect(queue.hasPending).toBe(false)
  })

  it('clears a pending task without cancelling the running task', async () => {
    const queue = new LatestTaskQueue()
    const running = deferred<void>()
    const started: string[] = []

    const runningTask = queue.submit(async () => {
      started.push('A')
      await running.promise
    })
    const pendingTask = queue.submit(() => {
      started.push('B')
    })

    queue.clearPending()
    expect(queue.hasPending).toBe(false)
    await expect(pendingTask).resolves.toBeUndefined()

    running.resolve()
    await expect(runningTask).resolves.toBeUndefined()
    expect(started).toEqual(['A'])
  })
})
