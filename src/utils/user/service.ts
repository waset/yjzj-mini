/**
 * 联系客服参数
 */
interface serviceParams {
  // 标题
  sendMessageTitle: string
  // 小程序路径
  sendMessagePath: string
  // 图片
  sendMessageImg?: string
}

/**
 * 联系客服
 *
 * @param params 小程序参数
 */
export const contact_customer_service = (params?: serviceParams) => {
  // #ifdef MP-WEIXIN
  const url = import.meta.env.VITE_CUSTOMER_SERVICE_URL
  const corpId = import.meta.env.VITE_CORP_ID
  if (!url || !corpId) {
    return
  }
  /**
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/open-api/service-chat/wx.openCustomerServiceChat.html
   */
  // @ts-expect-error all
  wx.openCustomerServiceChat({
    extInfo: { url },
    corpId,
    showMessageCard: !!params,
    ...params,
  })
  // #endif
}
