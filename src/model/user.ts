export const useUserStore = defineStore('user', {
  state: (): {
    /**
     * 当前登录用户信息
     */
    user: UserInfo
    /**
     * 是否已经注册
     */
    isRegister: boolean
    /**
     * 分享者邀请码
     */
    shareCode: string
  } => ({
    user: {} as UserInfo,
    isRegister: false,
    shareCode: '',
  }),
  getters: {
    isLogin: state => !!state.user.phone,
    userDesc: (state) => {
      let rebateType = ''
      if (state.user?.promoter?.rebateType) {
        switch (state.user.promoter.rebateType) {
          case 1:
            rebateType = ' 等级'
            break
          case 2:
            rebateType = '固定'
            break

          default:
            rebateType = '无'
            break
        }
      }
      else {
        rebateType = '无'
      }

      return <Desc<UserInfo & {
        promoter: Desc<Promoter>
      }>>{
        ...state.user,
        promoter: {
          ...state.user.promoter,
          rebateTypeDesc: rebateType,
        },
        isSubDesc: state.user?.isSub === 1 ? '已订阅' : '未订阅',
        phoneDesc: state.user?.phone ? SensitivePhone(state.user.phone) : '未绑定手机号',
      }
    },
  },
  actions: {
    hasGoLogin() {
      if (!this.isLogin) {
        uni.showToast({ title: '请登录', duration: 1000, icon: 'none' })
        setTimeout(() => {
          Jump('/pages/me/login')
        }, 1000)
        return true
      }
      return false
    },
    async getUserInfo() {
      const { data, code } = await http.post<UserInfo>('/web/user/info')
      if (code === 200) {
        this.user = data
        this.isRegister = !!data.phone
      }
      else {
        this.isRegister = false
      }
    },
    async uploadAvatar(avatarUrl: string) {
      const { data } = await http.upload<UploadRes>('/web/file/upload', {}, { filePath: avatarUrl })

      return data?.fileKey || ''
    },
    async getPhoneNumber(req: GetPhoneNumberRes['detail']) {
      const { data } = await http.post<{
        phoneNumber: string
      }>('/web/user/bind/mpphone', req)

      return data?.phoneNumber || ''
    },
    async authentication(req: AuthenticationReq) {
      const { code, message } = await http.post<UserInfo>('/web/user/realName/authentication', req)
      if (code === 200) {
        this.user.IDCard = req.IDCard
        this.user.realName = req.realName
      }
      else {
        uni.showToast({
          title: message,
          icon: 'none',
        })
      }
      return code === 200
    },
    async register(user: UserInfo) {
      const { data, code } = await http.post<UserInfo>('/web/user/updata', user)
      if (code === 200) {
        this.user = data
      }
      return code === 200
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
