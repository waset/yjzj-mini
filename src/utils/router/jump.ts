/**
 * 跳转地址
 * @param path 跳转地址
 */
function jump(path: string) {
  const prefix = 'pages'

  let url = path
  if (!url.startsWith('/'))
    url = `/${url}`

  if (!url.startsWith(`/${prefix}`))
    url = `/${prefix}${url}`

  useRouter().navigate({
    url,
  })
}

export default jump
