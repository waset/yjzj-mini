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
