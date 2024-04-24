/**
 * 跳转地址
 * @param path 跳转地址
 */
function jump(path: string) {
  const prefix = 'pages'

  if (path.startsWith('/')) {
    if (!path.startsWith(prefix))
      path = `${prefix}${path}`
  }
  else {
    if (!path.startsWith(prefix))
      path = `${prefix}/${path}`
  }
  path = path.replace(`${prefix}/`, '')

  useRouter().navigate({
    url: path,
  })
}

export default jump
