export const useTabbarStore = defineStore('tabbar', {
  state: () => ({
    lists: [
      {
        icon: 'i-icons-home',
        activeIcon: 'i-icons-home-active',
        path: 'pages/index',
      },
      {
        icon: 'i-icons-menu',
        activeIcon: 'i-icons-menu-active',
        path: 'pages/menu',
      },
      {
        icon: 'i-icons-rocket',
        activeIcon: 'i-icons-rocket-active',
        path: 'pages/custom',
      },
      {
        icon: 'i-icons-buy',
        activeIcon: 'i-icons-buy-active',
        path: 'pages/buy',
      },
      {
        icon: 'i-icons-me',
        activeIcon: 'i-icons-me-active',
        path: 'pages/me',
      },
    ] as tabbar[],
  }),
  actions: {

  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTabbarStore, import.meta.hot))
