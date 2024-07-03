/**
 * 配置单类型定义
 */
interface ConfigurationListReq {
  no?: string
  page: number
  pageSize: number
}

interface ConfigurationListRes {
  code: number
  data: Configuration[]
  msg: string
  page: ConfigPage
}
interface Configuration {
  cartNumber?: number
  collectNumber?: number
  createAdmin?: CreateAdmin
  createAdminID?: number
  createdAt?: string
  createUserID?: number
  deletedAt?: null
  id?: number
  isCollect?: number
  no?: string | ''
  params?: ConfigurationParam[]
  products?: Product[]
  sellNumber?: number
  sellPrice?: string
  shareCode?: string
  status?: number
  uniqueCode?: string
  updatedAt?: string
}

interface CreateAdmin {
  phone?: string
  userName?: string
}

interface ConfigurationParam {
  num: number
  pID: number
}
interface ConfigPage {
  currentPage: number
  lastPage: number
  pageSize: number
  total: number
}
