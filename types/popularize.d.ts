interface Popularize_req {
  page: number
  pageSize: number
}

interface Response {
  code: number
  data: Withdrawlist[] | Rebatelist[]
  msg: string
  page: Page
}

interface Withdrawlist {
  adminID: number
  applyAmount: string
  auditedAt: string
  balanceAmountAfter: string
  balanceAmountBefore: string
  createdAt: string
  deletedAt: null
  feeAmount: string
  id: number
  no: string
  openID: string
  remark: string
  status: number
  thirdPaymentNO: string
  updatedAt: string
  userID: number
  userIDCard: string
  userInfo: UserInfo
  userRealName: string
  withdrawAmount: string
  [property: string]: any
}

interface Rebatelist {
  createdAt?: string
  deletedAt?: null
  id?: number
  orderID?: number
  orderNO?: string
  rebateAmount?: string
  rebateAt?: string
  rebateUserID?: number
  status?: number
  updatedAt?: string
  userID?: number
  userInfo?: UserInfo
  [property: string]: any
}

interface CashWithdraw_req {
  applyAmount: number
}
