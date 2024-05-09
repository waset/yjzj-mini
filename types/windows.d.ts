interface WindowsRes {
  content: ContentObject
  createAdminID: number
  createdAt: string
  deletedAt: null
  id: number
  name: string
  no: string
  remark: string
  sort: number
  status: number
  type: number
  updatedAt: string
}
interface ContentObject {
  images: WindowsImage[] | null
  products: Product[]
}

interface WindowsImage {
  imageUrl: string
  src: string
  title: string
}
