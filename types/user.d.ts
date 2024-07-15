interface loginKey {
  loginKey: string
}
interface LoginReq {
  code: string
  /**
   * 邀请人code
   */
  inviteCode?: number
  loginKey: string
  /**
   * 登录类型
   *
   * officialWeb 公众号网页登录
   * webScanCode 网页扫码登录
   * miniPrograms 小程序登录
   */
  type: 'officialWeb' | 'webScanCode' | 'miniPrograms'
  /**
   * 手机号授权信息
   */
  detail: GetPhoneNumberRes['detail']
}

interface LoginRes {
  token: string
  expire_time: number
}

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
  birthday: string
}

interface InviteUserInfo {
  avatar: string
  nickname: string
  phone: string
  inviteCode: string
}

interface Promoter {
  cycleOrderAmount: string
  levelID: number
  levelLevel: number
  levelName: string
  rebateRatio: string
  rebateType: number
}
interface GetPhoneNumberRes {
  detail: {
    code: string
    encryptedData: string
    iv: string
    rawData: string
    signature: string
  }
}

interface AuthenticationReq {
  realName: string
  IDCard: string
}
