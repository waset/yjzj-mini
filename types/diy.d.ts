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

interface powerParams {
  cpuTag2IDS?: number[]
  displayCardTag2IDs?: number[]
  gameID?: number
  resolutionType?: number
  page: number
  pageSize: number
}

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
