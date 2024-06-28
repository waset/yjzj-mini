/**
 * 配置单类型定义
 */
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
  no?: string
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
interface Page {
  currentPage?: number
  LastPage?: number
  pageSize?: number
  total?: number
}
