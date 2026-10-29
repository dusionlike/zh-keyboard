import { moveCursor, setInputValue } from './input'

interface CompositionState {
  input: HTMLInputElement
  originalValue: string
  start: number
  end: number
  text: string
  value: string
}

export interface InputCompositionOptions {
  onConfirm?: () => void
  onCancel?: () => void
}

/** Pre-edit text and an underline for existing input/textarea elements. */
export class InputComposition {
  private state?: CompositionState
  private overlay?: HTMLDivElement
  private viewport?: HTMLDivElement
  private mirror?: HTMLDivElement
  private marker?: HTMLSpanElement
  private observer?: ResizeObserver
  private frame?: number
  private writing = false

  constructor(private options: InputCompositionOptions = {}) {}

  update(input: HTMLInputElement | null, text: string): void {
    if (!input || !text) {
      this.cancel()
      return
    }
    if (input.disabled || input.readOnly || input.selectionStart === null) {
      this.cancel()
      return
    }
    if (this.state && (this.state.input !== input || input.value !== this.state.value)) {
      this.cancel()
      this.options.onCancel?.()
      return
    }

    const start = this.state?.start ?? input.selectionStart
    const end = this.state?.end ?? input.selectionEnd ?? start
    const originalValue = this.state?.originalValue ?? input.value
    const value = originalValue.slice(0, start) + text + originalValue.slice(end)
    if (input.maxLength >= 0 && value.length > input.maxLength) {
      this.cancel()
      return
    }
    if (!this.state) {
      this.state = { input, originalValue, start, end, text: '', value: input.value }
      this.listen(input)
      this.dispatchComposition('compositionstart', '')
    }
    this.state.text = text
    this.state.value = value
    this.writing = true
    try {
      this.dispatchComposition('compositionupdate', text)
      setInputValue(input, value)
      moveCursor(input, start + text.length)
      input.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        composed: true,
        inputType: 'insertCompositionText',
        isComposing: true,
        data: text,
      }))
    } finally {
      this.writing = false
    }
    this.render()
    this.scheduleRender()
  }

  commit(text: string, insert: () => void): void {
    const state = this.state
    if (!state) {
      insert()
      return
    }
    if (state.input.value !== state.value) {
      this.cancel()
      return
    }
    // Show an explicitly selected alternative before ending composition.
    this.update(state.input, text)
    if (!this.state)
      return
    this.writing = true
    try {
      this.dispatchComposition('compositionend', text)
      this.clear()
      // The existing key handler replaces the draft rather than appending it.
      state.input.setSelectionRange(state.start, state.start + text.length)
      insert()
    } finally {
      this.writing = false
    }
  }

  cancel(): void {
    const state = this.state
    if (!state)
      return
    this.writing = true
    try {
      if (state.input.value === state.value) {
        setInputValue(state.input, state.originalValue)
        state.input.setSelectionRange(state.start, state.end)
      }
      this.dispatchComposition('compositionend', '')
      state.input.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        composed: true,
        inputType: 'deleteCompositionText',
        isComposing: false,
        data: null,
      }))
    } finally {
      this.writing = false
      this.clear()
    }
  }

  private dispatchComposition(type: string, data: string): void {
    this.state?.input.dispatchEvent(new CompositionEvent(type, { bubbles: true, composed: true, data }))
  }

  private listen(input: HTMLInputElement): void {
    input.addEventListener('scroll', this.scheduleRender, { passive: true })
    input.addEventListener('input', this.handleInput)
    input.addEventListener('keydown', this.handleKeyDown)
    input.addEventListener('pointerdown', this.handlePointerDown)
    input.addEventListener('blur', this.handleBlur)
    window.addEventListener('scroll', this.scheduleRender, { capture: true, passive: true })
    window.addEventListener('resize', this.scheduleRender, { passive: true })
    this.observer = new ResizeObserver(this.scheduleRender)
    this.observer.observe(input)
  }

  private handleInput = () => {
    if (!this.writing) {
      this.options.onCancel?.()
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(event.key))
      return
    if (event.key === 'Escape') {
      event.preventDefault()
      this.options.onCancel?.()
    } else {
      if (event.key === 'Enter')
        event.preventDefault()
      this.options.onConfirm?.()
    }
  }

  private handlePointerDown = () => this.options.onConfirm?.()
  private handleBlur = () => this.options.onCancel?.()

  private scheduleRender = () => {
    if (this.frame === undefined) {
      this.frame = window.requestAnimationFrame(() => {
        this.frame = undefined
        this.render()
      })
    }
  }

  private render(): void {
    const state = this.state
    if (!state)
      return
    const { input, text, start, originalValue, end } = state
    if (!input.isConnected)
      return
    const style = window.getComputedStyle(input)
    const rect = input.getBoundingClientRect()
    if (!this.overlay) {
      this.overlay = document.createElement('div')
      this.overlay.dataset.zhkComposition = ''
      this.overlay.setAttribute('aria-hidden', 'true')
      this.viewport = document.createElement('div')
      this.mirror = document.createElement('div')
      this.marker = document.createElement('span')
      this.marker.dataset.zhkPreedit = ''
      this.viewport.append(this.mirror)
      this.overlay.append(this.viewport)
      document.body.append(this.overlay)
    }
    const viewport = this.viewport!
    const mirror = this.mirror!
    const marker = this.marker!
    const paddingLeft = Number.parseFloat(style.paddingLeft) || 0
    const paddingRight = Number.parseFloat(style.paddingRight) || 0
    const paddingTop = Number.parseFloat(style.paddingTop) || 0
    const paddingBottom = Number.parseFloat(style.paddingBottom) || 0
    Object.assign(this.overlay.style, {
      position: 'fixed',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      pointerEvents: 'none',
      zIndex: '2147483647',
      overflow: 'hidden',
      color: 'transparent',
      background: 'transparent',
      margin: '0',
      padding: '0',
      border: '0',
    })
    const multiline = input.tagName === 'TEXTAREA'
    Object.assign(viewport.style, {
      position: 'absolute',
      left: `${input.clientLeft + paddingLeft}px`,
      top: `${input.clientTop + paddingTop}px`,
      width: `${input.clientWidth - paddingLeft - paddingRight}px`,
      height: `${input.clientHeight - paddingTop - paddingBottom}px`,
      // Let single-line underlines extend into the input's vertical padding.
      overflow: multiline ? 'hidden' : 'visible',
      clipPath: multiline ? 'none' : 'inset(-6px 0)',
      display: multiline ? 'block' : 'flex',
      alignItems: 'center',
    })
    Object.assign(mirror.style, {
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      fontStyle: style.fontStyle,
      fontVariant: style.fontVariant,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      wordSpacing: style.wordSpacing,
      textAlign: style.textAlign,
      textIndent: style.textIndent,
      textTransform: style.textTransform,
      direction: style.direction,
      tabSize: style.tabSize,
      whiteSpace: multiline && input.getAttribute('wrap') !== 'off' ? 'pre-wrap' : 'pre',
      overflowWrap: 'break-word',
      wordBreak: style.wordBreak,
      width: '100%',
      flex: 'none',
      color: 'transparent',
      transform: `translate(${-input.scrollLeft}px, ${-input.scrollTop}px)`,
    })
    // Password fields keep their existing masked appearance.
    const visibleText = (value: string) => input.type === 'password' ? '•'.repeat(value.length) : value
    marker.textContent = visibleText(text)
    Object.assign(marker.style, {
      display: 'inline',
      font: 'inherit',
      margin: '0',
      padding: '0',
      border: '0',
      color: 'transparent',
      textDecorationLine: 'underline',
      textDecorationColor: style.color,
      textUnderlineOffset: '2px',
      textDecorationThickness: '1px',
    })
    mirror.replaceChildren(
      document.createTextNode(visibleText(originalValue.slice(0, start))),
      marker,
      document.createTextNode(visibleText(originalValue.slice(end))),
    )
  }

  private clear(): void {
    const input = this.state?.input
    input?.removeEventListener('scroll', this.scheduleRender)
    input?.removeEventListener('input', this.handleInput)
    input?.removeEventListener('keydown', this.handleKeyDown)
    input?.removeEventListener('pointerdown', this.handlePointerDown)
    input?.removeEventListener('blur', this.handleBlur)
    window.removeEventListener('scroll', this.scheduleRender, true)
    window.removeEventListener('resize', this.scheduleRender)
    this.observer?.disconnect()
    if (this.frame !== undefined)
      window.cancelAnimationFrame(this.frame)
    this.overlay?.remove()
    this.state = undefined
    this.overlay = undefined
    this.viewport = undefined
    this.mirror = undefined
    this.marker = undefined
    this.frame = undefined
    this.observer = undefined
  }
}
