interface UserInfo {
  avatar: string
  balanceAmount: string
  canWithdraw: number
  IDCard: string
  inviteCode: string
  inviteUserInfo: InviteUserInfo
  isFollow: number
  isSub: number
  nickname: string
  phone: string
  promoter: Promoter
  promoterStatus: number
  realName: string
}

interface InviteUserInfo {
  avatar: string
  nickname: string
  phone: string
}

interface Promoter {
  cycleOrderAmount: string
  levelID: number
  levelLevel: number
  levelName: string
  rebateRatio: string
  rebateType: number
}
