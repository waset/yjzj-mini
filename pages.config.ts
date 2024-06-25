import { type TabBar, type TabBarItem, defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import useTabbarSize from './src/composables/const/useTabbarSize'
import useTabbarList from './src/composables/const/useTabbarList'

const { height, top, bottom } = useTabbarSize()
const pages = useTabbarList().map((item) => {
  return {
    pagePath: item.pagePath,
  } as TabBarItem
}) as TabBar['list']

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
    list: pages,
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
      '^z-(.*)': '@zebra-ui/swiper/components/z-$1/z-$1.vue',
    },
  },
})
