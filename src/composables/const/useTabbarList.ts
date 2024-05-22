import type { TabBarItem } from '@uni-helper/vite-plugin-uni-pages'

export default () => <TabBarItem[]>([
  {
    icon: 'i-icons-home',
    activeIcon: 'i-icons-home-active',
    pagePath: 'pages/index/index',
  },
  {
    icon: 'i-icons-menu',
    activeIcon: 'i-icons-menu-active',
    pagePath: 'pages/menu/menu',
  },
  {
    icon: 'i-icons-rocket',
    activeIcon: 'i-icons-rocket-active',
    pagePath: 'pages/custom/custom',
  },
  {
    icon: 'i-icons-buy',
    activeIcon: 'i-icons-buy-active',
    pagePath: 'pages/buy/buy',
  },
  {
    icon: 'i-icons-me',
    activeIcon: 'i-icons-me-active',
    pagePath: 'pages/me/me',
  },
])
