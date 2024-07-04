interface Search_req {
  name: string | number
  page: number
  pageSize: number
  order: string
  sort: string
}

interface Search_res {
  page: Search_page
  msg: string
  data: Product[]
  code: number
}

interface Search_page {
  currentPage: number
  lastPage: number
  pageSize: number
  total: number
}
