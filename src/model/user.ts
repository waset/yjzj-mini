export const useUserStore = defineStore('user', {
  state: (): {
    token: string
    /**
     * 当前登录用户信息
     */
    user: UserInfo
  } => ({
    token: '',
    user: {} as UserInfo,
  }),
  getters: {
    userDesc: ({ user }) => {
      return <Desc<UserInfo>>{
        ...user,
        isSubDesc: user.isSub === 1 ? '已订阅' : '未订阅',
        phoneDesc: user.phone ? SensitivePhone(user.phone) : '未绑定手机号',
      }
    },
  },
  actions: {
    async getUserInfo() {
      const { data, code } = await http.post<UserInfo>('/web/user/info')
      if (code === 200)
        this.user = data
    },
    login() {
      // TODO test
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZG1pbiI6bnVsbCwiVXNlciI6eyJpZCI6MjQsImF2YXRhciI6Imh0dHBzOi8vdGhpcmR3eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvRjhpYk1hSmtDYk55dkxmaWFnaWF6a2M2RTkxNUtHSHlXSW9lTEFLRHVteXVVS2NIRTIzbmQ2d2lhaWJIc3h2ZGd1SXZZREJuVG1oOVdUdmdCMWpvTGhSYzBNUS8xMzIiLCJuaWNrbmFtZSI6Ildhc2V0IiwicGhvbmUiOiIxODUwMzg1NzU3NiIsImlzU3ViIjoyLCJpbnZpdGVVc2VySUQiOjE3LCJpbnZpdGVDb2RlIjoiRUYzTUdDIn0sImV4cCI6MTcxNTkzMzMxMSwiaXNzIjoieWp6aiJ9.0m6YpYLXWHqyi7uVYeq-Y9ogL92ckFxfs_lSS-Sz-sg'
      // test end
      this.token = token
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
