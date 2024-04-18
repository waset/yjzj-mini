/**
 * 提示信息
 *
 * @param title 提示内容
 * @param icon  图标
 * @param callback 回调函数
 * @param timeout 提示时间
 */
export const Toast = function (
  title: string,
  icon?: UniApp.ShowToastOptions['icon'] | Function,
  callback?: Function,
  timeout?: number,
) {
  const icons = typeof icon === 'function' ? 'none' : icon || 'none'
  timeout = timeout || 1000
  uni.showToast({
    title,
    duration: timeout,
    icon: icons,
  })
  if (typeof (icon) == 'function')
    setTimeout(icon, timeout)

  callback && setTimeout(callback, timeout)
}
