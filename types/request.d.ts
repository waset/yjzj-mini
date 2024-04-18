/**
 * 请求结果（业务规范）
 */
interface NormalResult<T = any, E = any> {
  code: number
  message: string
  data: T
  extra?: E
  page?: Page
  error: string
};

interface Page {
  currentPage: number
  lastPage: number
  pageSize: number
  total: number
}
