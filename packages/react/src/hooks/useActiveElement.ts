import { useCallback, useEffect, useState } from 'react'

/**
 * React hook for tracking `document.activeElement`
 *
 * @returns 当前激活的元素
 */
export function useActiveElement<T extends HTMLElement>() {
  const getDeepActiveElement = useCallback(() => {
    let element = document.activeElement
    while (element?.shadowRoot) {
      element = element.shadowRoot.activeElement
    }
    return element as T | null | undefined
  }, [])

  const [activeElement, setActiveElement] = useState<T | null | undefined>(() => getDeepActiveElement())

  const trigger = useCallback(() => {
    setActiveElement(getDeepActiveElement())
  }, [getDeepActiveElement])

  useEffect(() => {
    const listenerOptions = {
      capture: true,
      passive: true,
    }

    // 处理窗口失焦事件
    const handleBlur = (event: FocusEvent) => {
      if (event.relatedTarget !== null) {
        return
      }
      trigger()
    }

    // 处理窗口聚焦事件
    window.addEventListener('blur', handleBlur, listenerOptions)
    window.addEventListener('focus', trigger, listenerOptions)

    // 清理函数
    return () => {
      window.removeEventListener('blur', handleBlur, listenerOptions)
      window.removeEventListener('focus', trigger, listenerOptions)
    }
  }, [trigger])

  return activeElement
}
