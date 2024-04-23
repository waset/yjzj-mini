function jump(path: string) {
  path = path.replace('pages/', '')
  useRouter().switchTab({
    url: path,
  })
}

export default jump
