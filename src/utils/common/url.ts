/**
 * 对象转URL参数
 *
 * @param url 请求地址
 * @param param 请求参数
 * @returns string
 */
export function UrlAndParams(url: string, param: object) {
  if (!param || typeof param !== 'object')
    return url
  const str = Object.entries(param).filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
  if (!str)
    return url
  return `${url}?${str}`
}

/**
 * 获取URL参数
 *
 * @param url 请求地址
 * @returns object
 */
export function getQueryParams<T extends { [key in string]?: any }>(url: string | undefined): T {
  if (!url)
    return {} as T
  // 解码URL的查询部分
  const queryString = decodeURIComponent(url).split('?')[1] || ''
  if (!queryString)
    return {} as T
  // 将查询字符串分割成参数数组
  const params = queryString.split('&')

  // 将所有参数转换为对象
  const queryParams = {} as any
  params.forEach((param) => {
    const [key, value] = param.split('=')
    queryParams[key] = decodeURIComponent(value)
  })
  return queryParams
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
export function ImageUrl(path: string | undefined) {
  if (!path || path.startsWith('http'))
    return path || ''

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

/**
 * 将地址转换为官网地址
 */
export function DomainUrl(path: string) {
  const staticUrl = import.meta.env.VITE_DOMAIN_URL || ''
  const trailingSlash = staticUrl.endsWith('/') ? '' : '/'
  const leadingSlash = path.startsWith('/') ? path.slice(1) : path
  return `${staticUrl}${trailingSlash}${leadingSlash}`
}

/**
 * 将地址转换为移动端地址
 */
export function MobileUrl(path: string) {
  const staticUrl = import.meta.env.VITE_MOBILE_URL || ''
  const trailingSlash = staticUrl.endsWith('/') ? '' : '/'
  const leadingSlash = path.startsWith('/') ? path.slice(1) : path
  return `${staticUrl}${trailingSlash}${leadingSlash}`
}
