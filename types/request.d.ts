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

/**
 * 公共请求配置类型
 */
interface Options extends Partial<UniNamespace.RequestOptions & UniNamespace.UploadFileOption> {
  /**
   * 基础路径
   */
  baseUrl?: string
  /**
   * 请求头
   */
  headers?: { [Key: string]: string }
  /**
   * 请求方式
   */
  methods?: UniNamespace.RequestOptions['method'] | 'UPLOAD'
  /**
   * 是否显示加载提示
   */
  showLoading?: boolean
  /**
   * 是否需要登录
   */
  auth?: boolean

  token?: string
}

/**
 * 请求结果（原始）
 */
interface RequestSuccessCallbackResult {
  /**
   * 开发者服务器返回的数据
   */
  data: NormalResult
  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  statusCode: number
  /**
   * 开发者服务器返回的 HTTP Response Header
   */
  header: any
  /**
   * 开发者服务器返回的 cookies，格式为字符串数组
   */
  cookies: string[]
}

/**
 * 请求结果（业务通用）
 */
type Result<T> = NormalResult<T> & { [K in keyof T]: T[K] }
