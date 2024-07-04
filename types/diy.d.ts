// 游戏列表 返回值
interface gamesList {
  cover: string
  createAdminID: number
  createdAt: string
  deletedAt?: null
  id: number
  name: string
  updatedAt: string
}

// 性能请求参数
interface powerParams {
  cpuTag2IDS?: number[]
  displayCardTag2IDs?: number[]
  gameID?: number
  resolutionType?: number
  page?: number
  pageSize?: number
}

// 性能返回值
interface FpsPowerRes {

  cpuTag2ID: number
  cpuTag2Name: string
  createAdminID: number
  createAdminInfo: null
  createdAt: string
  deletedAt: null
  displayCardTag2ID: number
  displayCardTag2Name: ''
  fpsAvg: number
  fpsMax: number
  fpsMin: number
  gameID: number
  gameInfo: gamesList
  cover: string
  createAdminID: number
  createdAt: string
  deletedAt: null
  id: number
  name: string
  updatedAt: string
  id: number
  no: string
  resolutionType: number
  updatedAt: string
}

// 改配请求
interface Modification {
  params?: ProductParm[]
  productTypeParentID: number
  productTypeID: number
  productTypeIDs?: number[]
  sellPriceMin?: any
  sellPriceMax?: any
  productName?: string
  order?: string
  sort?: string
  brandIDs?: number[]
  paramDescArr?: ProductParamDesc[]
  status?: any
  keywords?: string
  page: number
  pageSize: number
}
interface ProductParm {
  id?: number
  v?: any
  type?: type
  number?: number
}

interface ProductParamDesc {
  desc: string
  valueStringArr: string[]
}

// 配置单列表
interface configurationListReq {

  page: number
  pageSize: number
}

// 新增配置单
interface addConfiguration {
  params: ParamConfig[]
  shareCode?: string
  createUserID?: number
  createAdminID?: number
}

interface ParamConfig {
  pID: number
  num: number
}

// 下单
interface submitReq {
  /**
   * 购物车ids
   */
  cartIDs?: string[]
  /**
   * 购买商品详情
   */
  details?: submitReqDetail[]
  /**
   * 邀请码
   */
  inviteCode?: string
  /**
   * 支付方式（"wechat":"jsApi","native"/ "aliPay":"web","pc"）
   */
  payMethod?: string
  /**
   * 支付类型（"wechat", "aliPay"）
   */
  payType?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 用户地址id
   */
  userAddressID?: number
  /**
   * 用户卡券id
   */
  userTicketID?: number

}

interface submitReqDetail {
  /**
   * 商品id
   */
  id?: number
  /**
   * 数量
   */
  number?: number
  /**
   * 关联类型（1：商品 2：配置单）
   */
  relationType?: number

}

interface getAllParams {
  productTypeID: number
  page: number
  pageSize: number
}

interface AllParamsRes {
  content: string
  createdAt: string
  default: string
  deletedAt: null
  desc: string
  id: number
  isGroup: number
  isRequired: number
  isSearch: number
  productTypeID: number
  remark: string
  type: string
  updatedAt: string
}
