import { describe, expect, it, vi } from 'vitest'
import { HandwritingSession } from './handwriting-session'
import { LatestTaskQueue } from './latest-task-queue'

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => {
    resolve = done
  })
  return { promise, resolve }
}

function setup(recognize = vi.fn(async (_strokeData: number[]) => ['你', '好'])) {
  const onCandidates = vi.fn()
  const onCommit = vi.fn()
  const onClear = vi.fn()
  const onError = vi.fn()
  const onPreview = vi.fn()
  const session = new HandwritingSession({ recognize, onCandidates, onPreview, onCommit, onClear, onError })
  return { session, onCandidates, onPreview, onCommit, onClear, onError }
}

describe('handwriting session', () => {
  it('previews the first candidate and keeps it visible until recognition updates or commits', async () => {
    const onPreview = vi.fn()
    const onCommit = vi.fn()
    const session = new HandwritingSession({
      recognize: async strokes => strokes.length > 3 ? ['二', '三'] : ['一'],
      onCandidates: vi.fn(),
      onClear: vi.fn(),
      onCommit,
      onPreview,
    })
    session.startStroke()
    await session.recognize([1, 2, 1])
    expect(onPreview).toHaveBeenLastCalledWith('一')
    session.startStroke()
    expect(onPreview).toHaveBeenCalledOnce()
    await session.recognize([1, 2, 1, 3, 4, 1])
    expect(onPreview).toHaveBeenLastCalledWith('二')
    expect(onCommit).not.toHaveBeenCalled()
    await session.finish()
    expect(onCommit).not.toHaveBeenCalled()
    expect(onPreview).toHaveBeenLastCalledWith('二')
    session.startStroke()
    expect(onCommit).toHaveBeenCalledExactlyOnceWith('二')
    expect(onPreview).toHaveBeenLastCalledWith('')
  })

  it('clears only the strokes on idle and still allows selecting another candidate', async () => {
    const { session, onCommit, onCandidates, onPreview, onClear } = setup()
    session.startStroke()
    await session.recognize([1, 2, 1])
    expect(onCandidates).toHaveBeenLastCalledWith(['你', '好'])

    await session.finish()
    await session.finish()

    expect(onCommit).not.toHaveBeenCalled()
    expect(onCandidates).toHaveBeenLastCalledWith(['你', '好'])
    expect(onPreview).toHaveBeenLastCalledWith('你')
    expect(onClear).toHaveBeenCalledOnce()
    session.select(1)
    expect(onCommit).toHaveBeenCalledExactlyOnceWith('好')
    expect(onCandidates).toHaveBeenLastCalledWith([])
    expect(onPreview).toHaveBeenLastCalledWith('')
  })

  it('allows an explicit alternative candidate without a later duplicate', async () => {
    const { session, onCommit } = setup()
    session.startStroke()
    await session.recognize([1, 2, 1])
    session.select(1)
    await session.finish()
    expect(onCommit).toHaveBeenCalledExactlyOnceWith('好')
  })

  it('waits for the final stroke to be recognized instead of using an earlier candidate', async () => {
    const final = deferred<string[]>()
    const recognize = vi.fn(async (_strokeData: number[]) => ['一'])
    recognize.mockImplementationOnce(async () => ['一']).mockImplementationOnce(() => final.promise)
    const { session, onCommit } = setup(recognize)
    session.startStroke()
    await session.recognize([1, 2, 1])
    session.startStroke()
    const recognition = session.recognize([1, 2, 1, 3, 4, 1])
    const finishing = session.finish()
    expect(onCommit).not.toHaveBeenCalled()

    final.resolve(['二'])
    await recognition
    await finishing
    expect(onCommit).not.toHaveBeenCalled()
    session.startStroke()
    expect(onCommit).toHaveBeenCalledExactlyOnceWith('二')
  })

  it('cancels an expired idle request when the user resumes drawing', async () => {
    const first = deferred<string[]>()
    const recognize = vi.fn(async (_strokeData: number[]) => ['二'])
    recognize.mockImplementationOnce(() => first.promise)
    const { session, onCommit, onCandidates } = setup(recognize)
    session.startStroke()
    const oldRecognition = session.recognize([1, 2, 1])
    const oldFinish = session.finish()
    session.startStroke()
    const latestRecognition = session.recognize([1, 2, 1, 3, 4, 1])

    first.resolve(['一'])
    await oldRecognition
    await oldFinish
    await latestRecognition
    expect(onCandidates).not.toHaveBeenCalledWith(['一'])
    expect(onCommit).not.toHaveBeenCalled()

    await session.finish()
    expect(onCommit).not.toHaveBeenCalled()
    session.startStroke()
    expect(onCommit).toHaveBeenCalledExactlyOnceWith('二')
  })

  it('keeps the canvas intact when recognition fails or returns no candidates', async () => {
    const recognize = vi.fn(async (_strokeData: number[]) => [] as string[])
    const { session, onCommit, onClear, onError } = setup(recognize)
    session.startStroke()
    await session.recognize([1, 2, 1])
    await session.finish()
    recognize.mockRejectedValueOnce(new Error('recognition failed'))
    session.startStroke()
    await session.recognize([1, 2, 1, 3, 4, 1])
    await session.finish()

    expect(onError).toHaveBeenCalledOnce()
    expect(onCommit).not.toHaveBeenCalled()
    expect(onClear).not.toHaveBeenCalled()
  })

  it('ignores late results after the composition is reset', async () => {
    const result = deferred<string[]>()
    const { session, onCommit, onCandidates } = setup(vi.fn(() => result.promise))
    session.startStroke()
    const recognition = session.recognize([1, 2, 1])
    const finishing = session.finish()
    session.reset()
    result.resolve(['你'])
    await recognition
    await finishing
    expect(onCandidates).not.toHaveBeenCalledWith(['你'])
    expect(onCommit).not.toHaveBeenCalled()
  })

  it('does not commit into a different input target', async () => {
    let target = 'first input'
    const onCommit = vi.fn()
    const session = new HandwritingSession({
      recognize: async () => ['你'],
      onCandidates: vi.fn(),
      onClear: vi.fn(),
      onCommit,
      getTarget: () => target,
    })
    session.startStroke()
    await session.recognize([1, 2, 1])
    target = 'second input'
    await session.finish()
    session.select(0)
    expect(onCommit).not.toHaveBeenCalled()
  })

  it('ignores recognition still running after the component unmounts', async () => {
    const result = deferred<string[]>()
    const { session, onCommit, onCandidates } = setup(vi.fn(() => result.promise))
    session.startStroke()
    const recognition = session.recognize([1, 2, 1])
    const finishing = session.finish()
    session.dispose()
    result.resolve(['你'])
    await recognition
    await finishing
    expect(onCandidates).not.toHaveBeenCalledWith(['你'])
    expect(onCommit).not.toHaveBeenCalled()
  })

  it('keeps recognition serialized when resizing recreates a session', async () => {
    const queue = new LatestTaskQueue()
    const first = deferred<string[]>()
    const recognize = vi.fn(async (_strokeData: number[]) => ['二'])
    recognize.mockImplementationOnce(() => first.promise)
    const options = { queue, recognize, onCandidates: vi.fn(), onClear: vi.fn(), onCommit: vi.fn() }
    const oldSession = new HandwritingSession(options)
    oldSession.startStroke()
    const oldRecognition = oldSession.recognize([1, 2, 1])
    oldSession.dispose()

    const newSession = new HandwritingSession(options)
    newSession.startStroke()
    const newRecognition = newSession.recognize([3, 4, 1])
    expect(recognize).toHaveBeenCalledOnce()

    first.resolve(['一'])
    await oldRecognition
    await newRecognition
    await newSession.finish()
    expect(options.onCommit).not.toHaveBeenCalled()
    newSession.startStroke()
    expect(options.onCandidates).not.toHaveBeenCalledWith(['一'])
    expect(options.onCommit).toHaveBeenCalledExactlyOnceWith('二')
  })
})
