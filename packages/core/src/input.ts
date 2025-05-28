/**
 * 判断元素是否为可输入元素（支持文本输入的 input 或 textarea）
 * @param el 要检测的元素
 * @returns 如果是可输入元素则返回 true
 */
export function isInputElement(el?: Element | null): el is HTMLInputElement {
  if (!el) {
    return false
  }
  if (el.tagName === 'TEXTAREA') {
    return true
  }

  if (el.tagName === 'INPUT') {
    // 获取输入框类型
    const inputElement = el as HTMLInputElement
    const inputType = (inputElement.type || 'text').toLowerCase()

    // 这些类型的input不支持文本输入
    const nonTextInputTypes = [
      'checkbox',
      'radio',
      'button',
      'submit',
      'reset',
      'file',
      'image',
      'range',
      'color',
      'hidden',
      'date',
      'datetime-local',
      'month',
      'week',
      'time',
    ]

    return !nonTextInputTypes.includes(inputType)
  }

  // 不是 input 或 textarea
  return false
}

/**
 * 获取当前激活的输入元素
 * @throws {Error} 如果当前没有激活的输入框
 */
export function getInputElement() {
  if (document.activeElement && isInputElement(document.activeElement)) {
    return document.activeElement as HTMLInputElement
  } else {
    throw new Error('输入框没有被激活')
  }
}

/**
 * 更新输入框值并设置光标，触发 input 事件
 */
function applyEdit(inputElement: HTMLInputElement, value: string, cursor: number) {
  inputElement.value = value
  moveCursor(inputElement, cursor)
  inputElement.dispatchEvent(new Event('input', { bubbles: true }))
}

/**
 * 通用字符串编辑：从 start 位置删除 deleteCount 个字符，并插入 insertText
 */
function editString(text: string, start: number, deleteCount: number, insertText = ''): string {
  return text.slice(0, start) + insertText + text.slice(start + deleteCount)
}

/**
 * 通用输入框编辑：插入文本或删除字符
 */
function processInputElement(
  inputElement: HTMLInputElement,
  insertText = '',
) {
  const maxlength = Number(inputElement.getAttribute('maxlength'))
  let start = inputElement.selectionStart ?? 0
  const end = inputElement.selectionEnd ?? start
  let deleteCount: number
  if (insertText.length > 0) {
    // 插入或替换选区
    deleteCount = end - start
  } else {
    // 删除操作：优先删除选区，否则退格删除
    const selLen = end - start
    if (selLen > 0) {
      deleteCount = selLen
    } else if (start > 0) {
      deleteCount = 1
      start--
    } else {
      return
    }
  }
  // 插入时检查 maxlength
  if (
    insertText.length > 0
    && maxlength
    && inputElement.value.length - deleteCount + insertText.length > maxlength
  ) {
    return
  }
  const newValue = editString(inputElement.value, start, deleteCount, insertText)
  const newCursor = start + insertText.length
  applyEdit(inputElement, newValue, newCursor)
}

/**
 * 向输入框插入文本
 * @param inputElement 输入框元素
 * @param text 要插入的文本
 */
export function writeToInputElement(inputElement: HTMLInputElement, text: string) {
  processInputElement(inputElement, text)
}

/**
 * 向输入框删除文本
 * @param inputElement 输入框元素
 */
export function delToInputElement(inputElement: HTMLInputElement) {
  processInputElement(inputElement)
}

/**
 * 设置输入框光标位置
 * @param inputElement 输入框元素
 * @param index 光标位置索引
 */
export function moveCursor(inputElement: HTMLInputElement, index: number) {
  inputElement.selectionStart = index
  inputElement.selectionEnd = index
}
