/**
 * 将图片地址转换为线上地址
 *
 * @param path 图片地址
 * @returns 加工后的图片地址
 */
export function ImageUrl(path: string) {
  const imageUrl = import.meta.env.VITE_IMAGE_URL || ''
  const trailingSlash = imageUrl.endsWith('/') ? '' : '/'
  const leadingSlash = path.startsWith('/') ? path.slice(1) : path
  return `${imageUrl}${trailingSlash}${leadingSlash}`
}
