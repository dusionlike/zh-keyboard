export interface KeyEvent {
  key: string
  isControl?: boolean
}

export type KeyBoardMode = 'zh' | 'en' | 'en_cap' | 'hand' | 'num' | 'symbol'
