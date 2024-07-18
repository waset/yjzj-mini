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

interface getcouponReq {
  /**
   * 来源 1：分享链接 2：派发 3：兑换码 4：商品详情
   */
  from: number
  /**
   * 卡券兑换码
   */
  fromNO?: string

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
  details: Detail[]
  /**
   * 邀请码
   */
  inviteCode?: string
  /**
   * 支付方式（"wechat":"jsApi","native"/ "aliPay":"web","pc"）
   */
  payMethod: string
  /**
   * 支付类型（"wechat", "aliPay"）
   */
  payType: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 用户地址id
   */
  userAddressID: number
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

interface orderinfoDataRes {
  code?: number
  data?: orderinfoData
  extra?: { [key: string]: any }
  msg?: string
  page?: Page
}

interface orderinfoData {
  cancelAt?: string
  createdAt?: string
  deletedAt?: null
  details?: sDetail[]
  express?: Express
  freezePrice?: string
  id?: number
  inviteUserID?: number
  no?: string
  payAt?: string
  payMethod?: string
  payPrice?: string
  payType?: string
  products?: Product[]
  rebateAmount?: string
  refundPrice?: string
  sellPrice?: string
  /**
   * 状态 1：待支付 2：支付成功 3：支付失败 4：部分退款 5：全部退款6：取消支付
   */
  status?: number
  ticketPrice?: string
  ticketSnapshot?: DataTicketSnapshot
  totalNumber?: number
  transactionID?: string
  updatedAt?: string
  userAddressSnapshot?: UserAddressSnapshot
  userID?: number
  userTicketID?: number
}

interface sDetail {
  createdAt: string
  deletedAt?: null
  details: sDetail[]
  evaluationReportID: string
  id: number
  inviteUserID: number
  no: string
  orderID: number
  parentNO: string
  payPrice: string
  productConfigID: number
  products: Product[]
  productConfigSnapshot: ProductConfigSnapshot
  productID: number
  productSnapshot: ProductSnapshot
  productTypeID: number
  productTypeName: string
  rebateAmount: string
  refundNumber: number
  refundPrice: string
  relationType: number
  sellPrice: string
  status: number
  ticketPrice: string
  ticketSnapshot?: DetailTicketSnapshot
  totalNumber: number
  updatedAt: string
  userID: number
  userTicketID: number

}

interface ProductConfigSnapshot {
  createAdminID?: number
  createdAt?: string
  createUserID?: number
  deletedAt?: null
  id?: number
  no?: string
  params?: null
  shareCode?: string
  status?: number
  uniqueCode?: string
  updatedAt?: string

}

interface ProductSnapshot {
  banner: string[]
  configNO?: string
  configUniqueCode?: string
  content?: string[]
  createAdminID?: number
  createdAt?: string
  deletedAt?: null
  description?: string
  freezeNumber?: number
  id?: number
  maxBuyNumber?: number
  mergeProductIDs?: null
  name?: string
  no?: string
  onceMaxNumber?: number
  onceMinNumber?: number
  priceType?: number
  rebateType?: number
  rebateValue?: number
  sellNumber?: number
  sellPrice?: string
  sort?: number
  status?: number
  stockNumber?: number
  tagPrice?: string
  tags?: number[] | null
  tags2?: null
  typeID?: number
  unOrderArea?: null
  updatedAt?: string

}

interface DetailTicketSnapshot {
  createAdminID?: number
  createdAt?: string
  deletedAt?: null
  description?: string
  discountPrice?: string
  getEndAt?: string
  getNumber?: number
  getStartAt?: string
  id?: number
  images?: null
  instruction?: string
  limitNumber?: number
  no?: string
  noUseAreas?: null
  otherSetting?: null
  overPrice?: string
  status?: number
  stockNumber?: number
  style?: string
  type?: number
  updatedAt?: string
  useEndAt?: string
  useNumber?: number
  useProductContent?: null
  useProductType?: number
  useStartAt?: string
  useTimeDays?: number
  useTimeType?: number

}

interface Express {
  companyCode?: string
  companyName?: string
  createAdminID?: number
  createdAt?: string
  deletedAt?: null
  id?: number
  no?: string
  orderID?: number
  snapshot?: Snapshot
  status?: number
  updatedAt?: string
  userID?: number

}

interface Snapshot {
  autoCheck?: string
  comNew?: string
  comOld?: string
  destResult?: DestResult
  lastResult?: LastResult
  message?: string
  status?: string

}

interface DestResult {
  com?: string
  data?: null
  ischeck?: string
  nu?: string
  state?: string

}

interface LastResult {
  com?: string
  data?: Datum[]
  ischeck?: string
  nu?: string
  state?: string

}

interface Datum {
  areaCode: string
  areaName: string
  context: string
  ftime: string
  status: string
  time: string

}

interface DataTicketSnapshot {
  createAdminID?: number
  createdAt?: string
  deletedAt?: null
  description?: string
  discountPrice?: string
  getEndAt?: string
  getNumber?: number
  getStartAt?: string
  id?: number
  images?: null
  instruction?: string
  limitNumber?: number
  no?: string
  noUseAreas?: null
  otherSetting?: null
  overPrice?: string
  status?: number
  stockNumber?: number
  style?: string
  type?: number
  updatedAt?: string
  useEndAt?: string
  useNumber?: number
  useProductContent?: null
  useProductType?: number
  useStartAt?: string
  useTimeDays?: number
  useTimeType?: number

}

interface UserAddressSnapshot {
  address?: string
  cityCode?: string
  countryCode?: string
  createdAt?: string
  deletedAt?: null
  id?: number
  isDefault?: number
  phone?: string
  provinceCode?: string
  status?: number
  updatedAt?: string
  userID?: number
  username?: string

}

interface Page {
  currentPage?: number
  LastPage?: number
  pageSize?: number
  total?: number

}

// 取消支付
interface cancelPayRes {
  code?: number
  data?: Data
  extra?: { [key: string]: any }
  msg?: string
  page?: Page
}

interface marklist {
  id: string
  title: string
}

interface checkParam {
  banner: string[] | null
  content: string[] | string
  createdAt: string
  default: string
  deletedAt: null
  desc: string
  id: number
  isGroup: number
  isRequired: number
  isSearch: number
  name: string
  number: number
  paramDesc: string
  paramType: string
  paramValue: string[] | number | string
  productTypeID: number
  remark: string
  sellPrice: string
  type: string
  updatedAt: string
  product?: any
}
