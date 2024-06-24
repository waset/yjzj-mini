/**
 * 复制字符串到剪贴板
 *
 * @param str 复制的字符串
 */
export function copyText(str: string) {
  uni.setClipboardData({
    data: str,
    success: () => {
      uni.showToast({ title: '复制成功' })
    },
    fail: () => {
      uni.showToast({ title: '复制失败' })
    },
  })
}
