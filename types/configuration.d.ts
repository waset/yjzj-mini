/**
 * 配置单类型定义
 */
interface Configuration {
  code?: number
  data?: Datum[]
  extra?: null
  msg?: string
  page?: Page
}

interface Datum {
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
  params?: DatumParam[]
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

interface DatumParam {
  num: number
  pID: number
}

interface Product {
  banner: string[]
  configNO: string
  configUniqueCode: string
  content: string[]
  createAdminID: number
  createdAt: string
  deletedAt: null
  description: string
  freezeNumber: number
  id: number
  maxBuyNumber: number
  mergeProductIDs: null
  name: string
  no: string
  onceMaxNumber: number
  onceMinNumber: number
  params: ProductParam[]
  priceType: number
  rebateType: number
  rebateValue: number
  sellNumber: number
  sellPrice: string
  sort: number
  status: number
  stockNumber: number
  tagPrice: string
  tags: number[] | null
  tags2: null
  tagTitle: string
  typeID: number
  typeName: string
  unOrderArea: null
  updatedAt: string
}

interface ProductParam {
  createdAt: string
  deletedAt: null
  formProductID: number
  id: number
  number: number
  paramDesc: string
  paramID: number
  paramType: string
  paramValue: any[] | string
  productID: number
  productTypeID: number
  updatedAt: string
}

interface Page {
  currentPage?: number
  LastPage?: number
  pageSize?: number
  total?: number
}
