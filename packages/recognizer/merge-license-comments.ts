import type { OutputBundle, Plugin } from 'rolldown'

const LICENSE_COMMENT_RE = /\/\*(?:\*|!)[\s\S]*?@license[\s\S]*?\*\//g
const COPYRIGHT_LINE_RE = /^copyright\b/i

interface LicenseGroup {
  body: string[]
  copyrights: string[]
  license: string
}

function getCommentLines(comment: string): string[] {
  const lines = comment
    .replace(/^\/\*+!?[ \t]?/, '')
    .replace(/\*\/$/, '')
    .split(/\r?\n/)
    .map(line => line.replace(/^\s*\* ?/, '').trimEnd())
    .map(line => line.trim())

  while (lines.length > 0 && lines[0] === '') {
    lines.shift()
  }
  while (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop()
  }
  return lines
}

function normalizeLicenseLine(line: string): string {
  return line
    .toLowerCase()
    .replace(/https?:\/\/www\.apache\.org\/licenses\/license-2\.0/g, 'apache-license-url')
    .replace(/["']/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function mergeLicenseComment(comment: string, groups: Map<string, LicenseGroup>): void {
  const lines = getCommentLines(comment)
  const licenseIndex = lines.findIndex(line => /^@license\b/i.test(line))
  const license = licenseIndex >= 0 ? lines[licenseIndex] : '@license'
  const copyrights = lines.filter(line => COPYRIGHT_LINE_RE.test(line))
  const body = lines.filter((line, index) => index !== licenseIndex && !COPYRIGHT_LINE_RE.test(line))
  const key = [license, ...body].map(normalizeLicenseLine).filter(Boolean).join('\n')
  const group = groups.get(key)

  if (group) {
    for (const copyright of copyrights) {
      if (!group.copyrights.includes(copyright)) {
        group.copyrights.push(copyright)
      }
    }
    return
  }

  groups.set(key, { body, copyrights, license })
}

function renderLicenseGroup(group: LicenseGroup): string {
  const renderLine = (line: string): string => line === '' ? ' *' : ` * ${line}`
  return [
    '/**',
    renderLine(group.license),
    ...group.copyrights.map(renderLine),
    ...group.body.map(renderLine),
    ' */',
  ].join('\n')
}

export function mergeLicenseComments(code: string): string {
  const groups = new Map<string, LicenseGroup>()
  const codeWithoutLicenses = code.replace(LICENSE_COMMENT_RE, (comment) => {
    mergeLicenseComment(comment, groups)
    return '\n'
  })

  if (groups.size === 0) {
    return code
  }

  const licenses = [...groups.values()].map(renderLicenseGroup).join('\n\n')
  return `${licenses}\n${codeWithoutLicenses.trimStart()}`
}

export function mergeLicenseCommentsPlugin(): Plugin {
  return {
    name: 'merge-license-comments',
    generateBundle(_options, bundle: OutputBundle) {
      for (const output of Object.values(bundle)) {
        if (output.type === 'chunk') {
          output.code = mergeLicenseComments(output.code)
        }
      }
    },
  }
}
