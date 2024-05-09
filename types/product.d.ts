/**
 * 产品分类
 */
interface ProductType {
  createdAt: string
  deletedAt: null
  id: number
  /**
   * 名称
   */
  name: string
  /**
   * 父id
   */
  partnerID: number
  /**
   * 排序
   */
  sort: number
  updatedAt: string
  /**
   * 跳转url
   */
  url: string
  [property: string]: any
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

// 产品类目
enum Category {
  laptop = 3,
  components = 4,
  peripherals = 5,
  diy = 6,
  diyGoods = 7,
}

// 产品类目键
type CategoryKey = keyof typeof Category

interface CategorysItem {
  label: string
  value: number
  icon: string
}
// 产品类目类型
interface Categorys {
  [key: CategoryKey | string]: CategorysItem
}

interface CategorysArray extends CategorysItem {
  name: string
}

interface GetProductParams {
  typeID?: number
  typeParentID?: number
  name?: string
}
