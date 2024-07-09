export const contact_customer_service = () => {
  // #ifdef MP-WEIXIN
  const url = import.meta.env.VITE_CUSTOMER_SERVICE_URL || ''
  const corpId = import.meta.env.VITE_CORP_ID || ''
  // @ts-expect-error all
  wx.openCustomerServiceChat({
    extInfo: { url },
    corpId,
  })
  // #endif
}
