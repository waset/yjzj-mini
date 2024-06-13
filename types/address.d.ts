// 地址列表
interface addresslist {
  address: string
  cityCode: string
  countryCode: string
  createdAt: string
  deletedAt: null
  id: number
  isDefault: number
  phone: string
  provinceCode: string
  status: number
  updatedAt: string
  userID: number
  username: string
}

//  添加显示中文地址
interface addressStrs {
  id: number
  str: string
}

// 新增地址请求
interface addressReq {
  address?: string
  cityCode?: string
  countryCode?: string
  /**
   * 默认（1：是 2：否）
   */
  isDefault?: number
  phone?: string
  provinceCode?: string
  username?: string
}

// 数去地址请求
interface delReq {
  id: number
}

// 修改地址请求
interface editReq {
  address?: string
  cityCode?: string
  countryCode?: string
  id?: number
  isDefault?: number
  phone?: string
  provinceCode?: string
  username?: string
}

interface areaData {
  label: string
  value: string
}
