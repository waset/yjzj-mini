interface Levelall {
  /**
   * 积分业绩
   */
  performanceMax: number
  performanceMin: number
  /**
   * 返佣比例
   */
  rebateRatio: number | string
  /**
   * 等级
   */
  level: number
  /**
   * 等级勋章图片
   */
  icon?: string
}

// 榜单
interface Inviterank {
  avatar: string
  levellevel: number
  nickname: string
  levelName: string
  orderNumber: number
  orderAmount: string
  /**
   * 排名
   */
  lv: number
  levelLevel: number
  memberNumber: number
}

interface Inviteuser_res {
  code?: number
  data?: Data
  msg?: string
  page?: Inviteuser_page
}

interface Inviteuser {
  avatar?: string
  id?: number
  nickname?: string
}

interface Inviteuser_page {
  currentPage?: number
  LastPage?: number
  pageSize?: number
  total?: number
}
