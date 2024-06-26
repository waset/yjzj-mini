import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

export default (app: App) => {
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
