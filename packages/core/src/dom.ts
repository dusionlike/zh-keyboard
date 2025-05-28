export interface KeyboardPosition {
  top: string
  left: string
}

/**
 * 计算键盘的显示位置
 * @param inputElement 输入框元素
 * @param keyboardElement 键盘元素
 * @param positionMode 位置模式：'static'（静态，不计算位置）、'float'（浮动，根据输入框位置计算）、'bottom'（固定在底部）
 * @returns 返回键盘的 top 和 left 位置，如果不需要计算则返回 null
 */
export function calculateKeyboardPosition(
  inputElement: HTMLElement | null,
  keyboardElement: HTMLElement | null,
  positionMode: 'static' | 'float' | 'bottom',
): KeyboardPosition | null {
  // 如果输入框或键盘元素不存在，或者模式为 'static'，则不进行计算
  if (!inputElement || !keyboardElement || positionMode === 'static') {
    return null
  }

  let top, left

  // 如果模式为 'bottom'，键盘固定在窗口底部
  if (positionMode === 'bottom') {
    top = window.innerHeight - keyboardElement.offsetHeight // 键盘顶部位置为窗口高度减去键盘高度
    left = 0 // 键盘左侧位置为0
  } else {
  // positionMode === 'float'，键盘位置根据输入框浮动
    const inputRect = inputElement.getBoundingClientRect() // 获取输入框的位置和尺寸信息
    const keyboardWidth = keyboardElement.offsetWidth // 获取键盘的宽度

    // 初始计算：键盘顶部在输入框底部，水平居中对齐输入框中心
    top = inputRect.bottom + window.scrollY // 键盘顶部在输入框底部，并考虑页面滚动
    left = inputRect.left + window.scrollX + inputRect.width / 2 - keyboardWidth / 2 // 键盘左侧在输入框中心减去键盘宽度的一半，并考虑页面滚动

    const viewportWidth = window.innerWidth // 获取视口宽度
    // 如果键盘右侧超出视口，则将键盘左侧位置调整到视口内，并留出10px边距
    if (left + keyboardWidth > viewportWidth) {
      left = viewportWidth - keyboardWidth - 10
    }
    // 如果键盘左侧超出视口（或过于靠左），则将键盘左侧位置调整到视口内，并留出10px边距
    if (left < 10) {
      left = 10
    }
  }
  return { top: `${top}px`, left: `${left}px` }
}
