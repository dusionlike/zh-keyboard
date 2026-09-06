import { describe, expect, it } from 'vitest'
import { mergeLicenseComments } from './merge-license-comments.ts'

function license(copyright: string, terms: string): string {
  return [
    '/**',
    ' * @license',
    ` * ${copyright}`,
    ` * ${terms}`,
    ' */',
  ].join('\n')
}

describe('mergeLicenseComments', () => {
  it('merges equivalent license comments and moves them to the top', () => {
    const source = [
      license('Copyright 2020 Google LLC.', 'Licensed under Apache License 2.0.'),
      'const first = 1',
      license('Copyright 2021 Google LLC.', 'Licensed under Apache License 2.0.'),
      'const second = 2',
    ].join('\n')

    const result = mergeLicenseComments(source)

    expect(result.indexOf('@license')).toBeLessThan(result.indexOf('const first'))
    expect([...result.matchAll(/@license/g)]).toHaveLength(1)
    expect(result).toContain('Copyright 2020 Google LLC.')
    expect(result).toContain('Copyright 2021 Google LLC.')
  })

  it('keeps different license bodies as separate notices', () => {
    const source = [
      license('Copyright 2020 Google LLC.', 'Licensed under Apache License 2.0.'),
      'const first = 1',
      license('Copyright 2021 Example.', 'Licensed under MIT.'),
      'const second = 2',
    ].join('\n')

    const result = mergeLicenseComments(source)

    expect([...result.matchAll(/@license/g)]).toHaveLength(2)
    expect(result.indexOf('const first')).toBeGreaterThan(result.lastIndexOf('*/'))
    expect(result).toContain('Copyright 2021 Example.')
  })

  it('returns code unchanged when no license comment exists', () => {
    const source = 'const value = 1'

    expect(mergeLicenseComments(source)).toBe(source)
  })

  it('preserves single-line license comments', () => {
    const result = mergeLicenseComments('/*! @license MIT */\nconst value = 1')

    expect(result).toContain('* @license MIT')
    expect(result).toContain('const value = 1')
  })
})
