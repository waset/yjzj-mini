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
  logo: string
}

interface GetProductParams {
  /**
   * 小分类 ID （比如组件的cpu）
   */
  typeID?: number
  /**
   * 分类 ID （比如组件）
   */
  typeParentID?: number
  /**
   * 分类名称
   */
  name?: string | number | undefined
}

interface GetrecommendPar {
  CPUType: string
  productTypeParentID: number
  sellPriceMax: number
  sellPriceMin: number
}
interface Product_res {
  data: Product[]
  code: number
  msg: string
  page: Page

}
interface Product {
  banner: string[]
  brand: Brand
  brandID: number
  configNO: string
  configUniqueCode: string
  content: string[]
  createAdmin: CreateAdmin
  createAdminID: number
  createdAt: string
  deletedAt: null
  /**
   * 描述
   */
  description: string
  freezeNumber: number
  id: number
  maxBuyNumber: number
  mergeProductIDs: number[] | null
  /**
   * 名称
   */
  name: string
  /**
   * 编号
   */
  no: string
  /**
   * 单次最大购买数量
   */
  onceMaxNumber: number
  /**
   * 单次最小购买数量
   */
  onceMinNumber: number
  /**
   * 产品参数
   */
  params: Param[]
  priceType: number
  sellNumber: number
  /**
   * 现价
   */
  sellPrice: string
  sort: number
  status: number
  stockNumber: number
  /**
   * 原价
   */
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
  quantity?: number
  select?: boolean
  delete?: boolean
  alloaction?: number
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
  product: Product
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
  product: Param[]
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

// 产品类目类型
type Categorys = { [key in CategoryKey]: CategorysItem }

interface CategorysItem {
  label: string
  value: number
  icon: string
}
