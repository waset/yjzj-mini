/**
 * 订单类型定义
 */
interface Order {
  id: number
  no: string
  userID: number
  /**
   * 订单详情
   */
  details: orderDetail[]
  cancelAt: string
  createdAt: string
  deletedAt: null
  express: Express
  inviteUserID: number
  payAt: string
  payMethod: string
  payPrice: string
  payType: string
  /**
   * 回扣金额
   */
  rebateAmount: string
  refundPrice: string
  sellPrice: string
  status: OrderStatus
  ticketPrice: string
  totalNumber: number
  transactionID: string
  updatedAt: string
  userTicketID: number
}

interface orderDetail {
  createdAt: string
  productSnapshot: Product
  deletedAt: null
  details: null
  evaluationReportID: string
  id: number
  inviteUserID: number
  no: string
  orderID: number
  parentNO: string

  payPrice: string
  productConfigID: number
  productID: number
  rebateAmount: string
  refundNumber: number
  refundPrice: string
  relationType: number
  sellPrice: string
  status: number
  tagTitle: string
  ticketPrice: string
  totalNumber: number
  typeParentID: number
  updatedAt: string
  userID: number
  userTicketID: number
}

interface Express {
  /**
   * 快递公司信息
   */
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

/**
 * 购物车关联类型（1：商品，2：商品配置）
 */
enum CartRelationType {
  CartRelationTypeProduct = 1,
  CartRelationTypeProductConfig = 2,
}

enum OrderStatus {
  /**
   * 状态 0：全部  1：待支付 2：支付成功 3：支付失败 4：部分退款 5：全部退款6：取消支付
   * 0 全部订单，1 待付款订单，2 已付款订单，3 支付失败订单，4 部分退款订单，5 全部退款订单，6 取消支付订单
   */
  All = 0,
  Wait = 1,
  PaymentSuccessful = 2,
  PaymentFailed = 3,
  PartialRefund = 4,
  FullRefund = 5,
  CancelPayment = 6,
}
