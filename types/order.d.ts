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
  deletedAt: string | null
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
  status: number
  ticketPrice: string
  totalNumber: number
  transactionID: string
  updatedAt: string
  userTicketID: number
}

interface orderDetail {
  createdAt: string
  productSnapshot: Product
  deletedAt: string | null
  details: any | null
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
