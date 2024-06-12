interface couponList {
  createdAt: string
  deletedAt: null
  /**
   * 来源 1：分享链接 2：派发 3：兑换码
   */
  from: number
  fromNO: string
  fromUserID: number
  /**
   * 获取时间
   */
  getAt: string
  id: number
  orderID: number
  orderNO: string
  /**
   * 状态（1：未使用 2：已使用 3:已过期4:失效5:冻结）
   */
  status: number
  ticketID: number
  /**
   * 卡券
   */
  ticketInfo: TicketInfo
  updatedAt: string
  /**
   * 使用时间
   */
  useAt: string
  /**
   * 结束使用时间
   */
  useEndAt: string
  userID: number
  /**
   * 开始使用时间
   */
  useStartAt: string

}

interface TicketInfo {
  createAdminId?: number
  createdAt?: string
  deletedAt?: null
  description?: string
  discountPrice?: string
  getEndAt?: string
  getNumber?: number
  getStartAt?: string
  id?: number
  images?: string[]
  instruction?: string
  limitNumber?: number
  no?: string
  noUseAreas?: string[]
  otherSetting?: number[]
  overPrice?: string
  status?: number
  stockNumber?: number
  style?: string
  type?: number
  updatedAt?: string
  useEndAt?: string
  useNumber?: number
  useProductContent?: string[]
  useProductType?: number
  useStartAt?: string
  useTimeDays?: number
  useTimeType?: number

}

interface couponReq {
  /**
   * 来源 1：分享链接 2：派发 3：兑换码 4：商品详情
   */
  from: number
  /**
   * 卡券兑换码
   */
  fromNO?: string
  /**
   * 邀请人id
   */
  fromUserID: number
  /**
   * 卡券id
   */
  ticketID: number
}
