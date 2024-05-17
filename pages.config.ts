import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import useTabbarSize from './src/composables/const/useTabbarSize'

const { height, top, bottom } = useTabbarSize()

export default defineUniPages({
  pages: [],
  globalStyle: {
    backgroundColor: '#111111',
    backgroundColorBottom: '#111111',
    backgroundColorTop: '#111111',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#111111',
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
    backgroundColor: '#111111',
    height: `${(height + top + bottom) || 132}rpx`,
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
