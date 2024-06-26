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
  details: orderDetail[]
  evaluationReportID: string
  id: number
  inviteUserID: number
  no: string
  orderID: number
  parentNO: string

  productConfigSnapshot: ProductConfigSnapshot
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

interface Express {
  /**
   * 快递公司信息
   */
  companyCode: string
  companyName?: string
  createAdminID?: number
  createdAt?: string
  deletedAt?: null
  id?: number
  no?: string
  orderID?: number
  snapshot?: ExpressSnapshot
  status?: number
  updatedAt?: string
  userID?: number
}

interface ExpressSnapshot {
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
