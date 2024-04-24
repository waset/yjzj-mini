/**
 * 将图片地址转换为线上地址
 *
 * @param path 图片地址
 * @returns 加工后的图片地址
 */
export function ImageUrl(path: string) {
  const imageUrl = import.meta.env.VITE_IMAGE_URL || ''

  if (path.startsWith('/'))
    return `${imageUrl}${path}`

  if (imageUrl.endsWith('/'))
    return `${imageUrl}${path}`

  return `${imageUrl}/${path}`
}
