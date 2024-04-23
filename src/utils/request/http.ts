/**
 * 公共请求配置类型
 */
interface Options extends Partial<UniNamespace.RequestOptions> {
  /**
   * 是否显示加载提示
   */
  showLoading?: boolean

  /**
   * 是否需要登录
   */
  auth?: boolean
}

/**
 * 全局配置类型
 */
interface Config {
  /**
   * 基础路径
   */
  baseUrl?: string
  /**
   * 请求头
   */
  headers?: { [Key: string]: string }
}

/**
 * 请求方法
 *
 * @param method 请求方式
 * @param api 接口地址
 * @param data 接口数据
 * @param options 请求配置
 */
function request<T>(method: Options['method'], api: string, data?: any, options?: Options): Promise<T> {
  return new Promise((resolve) => {
    /**
     * 加载提示
     */
    options?.showLoading && uni.showLoading({ mask: true })

    /**
     * 权限控制
     */
    if (options?.auth ?? true) {
      options = auth(options)
      if (!options) {
        resolve(fail({ error: '未登录', code: 401, data: {}, message: '请登录' }) as T)
        return
      }
    }

    /**
     * 公共配置
     */
    const config = <Config>{
      baseUrl: api.includes('://') ? '' : import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }

    if (import.meta.env.MODE === 'development') {
      // #ifdef H5
      config.baseUrl = '/api'
      // #endif
    }

    /**
     * 发起请求
     */
    uni.request({
      url: config.baseUrl + api,
      method,
      data,
      success(res: any) {
        return resolve(success(res) as T)
      },
      fail(err: any) {
        return resolve(fail(err) as T)
      },
      ...options,
      header: { ...config?.headers, ...options?.header },
    })
  })
}

function uploads<T>(api: string, files: UniApp.UploadFileOptionFiles[], data: any, options?: Options): Promise<T> {
  return new Promise((resolve) => {
    /**
     * 加载提示
     */
    options?.showLoading && uni.showLoading({ mask: true })

    /**
     * 权限控制
     */
    if (options?.auth ?? true) {
      options = auth(options)
      if (!options) {
        resolve(fail({ error: '未登录', code: 401, data: {}, message: '请登录' }) as T)
        return
      }
    }

    /**
     * 公共配置
     */
    const config = <Config>{
      baseUrl: api.includes('://') ? '' : import.meta.env.VITE_BASE_URL,
      headers: {

      },
    }

    if (import.meta.env.MODE === 'development') {
      // #ifdef H5
      config.baseUrl = '/api'
      // #endif
    }

    const upload = uni.uploadFile({
      url: config.baseUrl + api,
      files,
      formData: data,
      header: { ...config?.headers, ...options?.header },
      success: (res: any) => {
        if (typeof res.data == 'string')
          res.data = JSON.parse(res.data)

        return resolve(success(res) as T)
      },
      fail: (err: any) => {
        return resolve(fail(err) as T)
      },
    })

    upload.onProgressUpdate((res) => {
      //   console.log(`上传进度${res.progress}`)
      //   console.log(`已经上传的数据长度${res.totalBytesSent}`)
      //   console.log(`预期需要上传的数据总长度${res.totalBytesExpectedToSend}`)
      return res
    })
  })
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

/**
 * 权限控制
 *
 * @param options 请求配置
 * @returns 是否登录
 */
function auth(options: Options | undefined): Options | undefined {
  const token = ''
  if (!token)
    return undefined

  if (typeof options === 'undefined' || typeof options.header === 'undefined') {
    options = {
      header: {},
    }
  }

  options.header = {
    ...options.header,
    Authorization: `Bearer ${token}`,
  }

  return options
}

/**
 * 成功回调
 *
 * @param res 请求结果
 */
function success<T>(res: RequestSuccessCallbackResult): T {
  /**
   * 关闭加载提示
   */
  uni.hideLoading()
  if (res.data.code === 401) {
    Toast('请登录', 'none', () => {
      uni.reLaunch({
        url: '/pages/login/login',
      })
    }, 1500)
  }

  return (res.data ?? res) as T
}

/**
 * 失败回调
 *
 * @param err 失败信息
 */
function fail<T>(err: NormalResult): T {
  if (err.code === 401) {
    Toast('请登录', 'none', () => {
      uni.reLaunch({
        url: '/pages/login/login',
      })
    }, 1500)
  }
  /**
   * 关闭加载提示
   */
  uni.hideLoading()
  return { error: err, code: err.code } as T
}

export const http = {
  get<T = any>(api: string, data?: any, config?: Options): Promise<Result<T>> {
    return request('GET', api, data, config)
  },
  post<T = any>(api: string, data?: any, config?: Options): Promise<Result<T>> {
    return request('POST', api, data, config)
  },
  put<T = any>(api: string, data?: any, config?: Options): Promise<Result<T>> {
    return request('PUT', api, data, config)
  },
  delete<T = any>(api: string, config?: Options): Promise<Result<T>> {
    return request('DELETE', api, {}, config)
  },
  uploads<T = any>(api: string, files: UniApp.UploadFileOptionFiles[], data?: any, config?: Options): Promise<Result<T>> {
    return uploads(api, files, data, config)
  },
}
