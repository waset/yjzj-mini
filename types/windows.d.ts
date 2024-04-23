interface WindowsRes {
  content: ContentObject
  createAdminID: number
  createdAt: string
  deletedAt: null
  id: number
  name: string
  no: string
  remark: string
  sort: number
  status: number
  type: number
  updatedAt: string
}
interface ContentObject {
  images: WindowsImage[] | null
  products: Product[]
}

interface WindowsImage {
  imageUrl: string
  src: string
  title: string
}

interface Product {
  banner: string[]
  brand: Brand
  brandID: number
  configNO: string
  configUniqueCode: string
  content: string[]
  costPrice: string
  createAdmin: CreateAdmin
  createAdminID: number
  createdAt: string
  deletedAt: null
  description: string
  freezeNumber: number
  id: number
  maxBuyNumber: number
  mergeProductIDs: number[] | null
  name: string
  no: string
  onceMaxNumber: number
  onceMinNumber: number
  params: Param[]
  priceType: number
  sellNumber: number
  sellPrice: string
  sort: number
  status: number
  stockNumber: number
  tagPrice: string
  tags: number[]
  tags2: number[] | null
  tags2Name: string[] | null
  tagsName: string[]
  typeID: number
  typeName: string
  typeParentID: number
  unOrderArea: null
  updatedAt: string
}

interface Brand {
  icon: string
  name: string
}

interface CreateAdmin {
  phone: string
  userName: string
}

interface Param {
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
}
