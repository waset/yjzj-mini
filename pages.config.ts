import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  globalStyle: {
    backgroundColor: '@bgColor',
    backgroundColorBottom: '@bgColorBottom',
    backgroundColorTop: '@bgColorTop',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#000000',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '一剑装机',
    navigationStyle: 'custom',
  },
  tabBar: {
    custom: true,
    list: [
      { pagePath: 'pages/index' },
      { pagePath: 'pages/menu' },
      { pagePath: 'pages/custom' },
      { pagePath: 'pages/buy' },
      { pagePath: 'pages/me' },
    ],
    color: '#999999',
    selectedColor: '#333333',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^u--(.*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^up-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^u-([^-].*)': 'uview-plus/components/u-$1/u-$1.vue',
    },
  },
})
