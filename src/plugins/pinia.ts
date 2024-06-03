import { createPinia, defineStore } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

interface address {
  username: string
  mobile: string
  address: string
  addressInfo: string
  isDefault: boolean
}

export default (app: any) => {
  /**
   * Pinia 的持久化存储
   *
   * @see https://prazdevs.github.io/pinia-plugin-persistedstate/zh/
   */
  const pinia = createPinia()
  pinia.use(createPersistedState({
    storage: {
      getItem: key => uni.getStorageSync(key),
      setItem: (key, value) => uni.setStorageSync(key, value),
    },
  }))

  return app.use(pinia)
}

export const useStore = defineStore('defaultStore', {
  state: () => ({
    userInfo: {
      username: '',
      mobile: '',
      address: '',
      addressInfo: '',
      isDefault: false,
    },
  }),
  actions: {
    setUserInfo(data: address) {
      this.userInfo = data
    },

  },
  getters: {
  },
  persist: true,
})
