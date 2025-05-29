export interface RecognizerInitOptions {
  /**
   * 初始化进度回调函数
   * @param progress 进度范围为0到1，表示初始化的完成度
   * @returns void
   */
  onProgress?: (progress: number) => void
}

/**
 * 手写识别器接口
 * 用于实现手写汉字识别功能
 */
export interface HandwritingRecognizer {
  /**
   * 初始化手写识别服务
   * @returns 返回是否初始化成功
   */
  initialize(options?: RecognizerInitOptions): Promise<boolean>

  /**
   * 识别手写笔迹
   * @param strokeData 笔迹数据，格式为 x y c x y c ...，其中x和y是坐标，c表示是否为笔画的最后一点(1表示是，0表示否)
   * @returns 识别结果列表
   */
  recognize(strokeData: number[]): Promise<string[]>

  /**
   * 关闭手写识别服务
   */
  close(): Promise<void>
}
