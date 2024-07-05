/**
 * 对象转URL参数
 *
 * @param url 请求地址
 * @param param 请求参数
 * @returns string
 */
export function UrlAndParams(url: string, param: object) {
  if (!param)
    return url
  const str = Object.entries(param).filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
  if (!str)
    return url
  return `${url}?${str}`
}

/**
 * 将图片地址或者数组转换为分享图片地址
 *
 * @param path 图片地址
 * @returns 加工后的图片地址
 */
export function ShareIamgeUrl(path: string | string[] | undefined | null) {
  if (!path) {
    return undefined
  }
  if (typeof (path) == 'object') {
    path = path.sort(() => Math.random() - 0.5)[0]
  }
  return ImageUrl(path)
}

/**
 * 将图片地址转换为线上地址
 *
 * @param path 图片地址
 * @returns 加工后的图片地址
 */
export function ImageUrl(path: string) {
  if (path.startsWith('http') || !path)
    return path

  const imageUrl = import.meta.env.VITE_IMAGE_URL || ''
  const trailingSlash = imageUrl.endsWith('/') ? '' : '/'
  const leadingSlash = path.startsWith('/') ? path.slice(1) : path
  return `${imageUrl}${trailingSlash}${leadingSlash}`
}

/**
 * 将资源地址转换为线上地址
 */
export function StaticUrl(path: string) {
  const staticUrl = import.meta.env.VITE_STATIC_URL || ''
  const trailingSlash = staticUrl.endsWith('/') ? '' : '/'
  const leadingSlash = path.startsWith('/') ? path.slice(1) : path
  return `${staticUrl}${trailingSlash}${leadingSlash}`
}
