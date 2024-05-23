declare type PageUrls = NavigateToOptions['url'] | SwitchTabOptions['url']
/**
 * 是不是 tabbar 页面
 * @param path 路由
 * @return bool
 */
const isTabbar = (path: string) => useTabbarList().some(item => `/${item.pagePath}` === path)
/**
 * 跳转地址
 * @param path 跳转地址
 * @param params 参数字典
 * @param close 是否关闭所有页面
 */
export const Jump = (path: PageUrls, params: { [key: string]: any } = {}, close: number = 0) => {
  let paramsStr = ''

  // 如果有参数，则添加参数字符串
  if (Object.keys(params).length > 0) {
    paramsStr = `?${Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')}`
  }
  // 如果是 tabbar
  if (isTabbar(path)) {
    return uni.switchTab({
      url: path,
    })
  }
  // 如果是close，则使用uni.redirectTo跳转，并且返回
  if (close > 1) {
    return uni.reLaunch({
      url: path + paramsStr,
    })
  }
  else if (close === 1) {
    return uni.redirectTo({
      url: path + paramsStr,
    })
  }
  // 如果是普通跳转，则使用uni.navigateTo跳转
  uni.navigateTo({
    url: path + paramsStr,
  })
}

/**
 *
 * @param number
 */
export const Back = (number: number = 1) => {
  // 获取当前有多少个页面
  const zindex = getCurrentPages().length
  if (zindex < 2) {
    return Jump('/pages/index/index')
  }
  // 返回
  uni.navigateBack({
    delta: zindex < 2 ? 1 : number,
  })
}
