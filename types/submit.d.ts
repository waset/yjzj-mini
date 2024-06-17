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

// 下单请求接口
interface submitOrderReq {
  /**
   * 购物车ids
   */
  cartIDs?: string[]
  /**
   * 购买商品详情
   */
  details?: Detail[]
  /**
   * 邀请码
   */
  inviteCode?: string
  /**
   * 支付方式（"wechat":"jsApi","native"/ "aliPay":"web","pc"）
   */
  payMethod?: string
  /**
   * 支付类型（"wechat", "aliPay"）
   */
  payType?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 用户地址id
   */
  userAddressID?: number
  /**
   * 用户卡券id
   */
  userTicketID?: number

}
//  购买商品详情
interface Detail {
  /**
   * 商品id
   */
  id?: number
  /**
   * 数量
   */
  number?: number
  /**
   * 关联类型（1：商品 2：配置单）
   */
  relationType?: number

}

// 下单返回接口
interface submitRes {
  code?: number
  data?: submitResData
  extra?: { [key: string]: any }
  msg?: string
  page?: Page

}

interface submitResData {
  /**
   * 扫码支付二维码
   */
  codeUrl?: string
  jsapiPayParams?: JsapiPayParams
  /**
   * 订单id
   */
  orderID?: number
  /**
   * 第三方预支付订单id
   */
  prePayID?: string

}

interface JsapiPayParams {
  appId: string
  nonceStr: string
  package: string
  paySign: string
  signType: string
  timeStamp: string

}

interface Page {
  currentPage?: number
  LastPage?: number
  pageSize?: number
  total?: number

}
