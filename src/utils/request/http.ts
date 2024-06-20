/**
 * 请求类
 */
class Http {
  /**
   * 基础路径
   */
  baseUrl = import.meta.env.VITE_API_URL || ''

  /**
   * 构造方法
   */
  constructor() {
    if (import.meta.env.MODE === 'development') {
      // #ifdef H5
      this.baseUrl = '/api'
      // #endif
    }
  }

  /**
   * 请求配置
   */
  options: Options = {}

  /**
   * 请求方法
   *
   * @param api 接口地址
   * @param data 接口数据
   * @param options 请求配置
   */
  async Request<T>(api: string, data?: any, options?: Options): Promise<T> {
    /**
     * 保存请求配置
     */
    this.options = options || {}

    /**
     * 权限控制
     */
    if (this.options?.auth ?? true) {
      await this.auth()
    }

    /**
     * 公共配置
     */
    this.options.baseUrl = api.includes('://') ? '' : this.baseUrl

    return new Promise((resolve) => {
      /**
       * 加载提示
       */
      this.options?.showLoading && uni.showLoading({ mask: true })

      if (this.options.auth && !this.hasToken()) {
        resolve(this.fail({ error: '未登录', code: 401, data: {}, message: '请登录' }) as T)
        return
      }

      switch (this.options.methods) {
        case 'UPLOAD':{
          uni.uploadFile<UniNamespace.UploadFileOption>({
            url: this.options.baseUrl + api,
            filePath: this.options.filePath,
            formData: data,
            name: 'file',
            header: { ...options?.headers },
            success: (res: any) => {
              if (typeof res.data == 'string') {
                res.data = JSON.parse(res.data)
              }
              return resolve(this.success(res) as T)
            },
            fail: (err: any) => {
              return resolve(this.fail(err) as T)
            },
          })
          break
        }

        default:{
          /**
           * 发起请求
           */
          uni.request<UniNamespace.RequestOptions>({
            url: this.options.baseUrl + api,
            method: this.options.methods,
            data,
            success: (res: any) => {
              return resolve(this.success(res) as T)
            },
            fail: (err: any) => {
              return resolve(this.fail(err) as T)
            },
            ...options,
            header: { ...options?.headers },
            complete: () => {
              uni.hideLoading()
            },
          })
          break
        }
      }
    })
  }

  /**
   * 是否有 token
   */
  private hasToken(): boolean {
    const { token } = storeToRefs(useAuthStore())
    if (token.value) {
      this.options.headers = {
        ...this.options?.headers,
        Authorization: `Bearer ${token.value}`,
      }
    }
    return !!token.value
  }

  /**
   * 判断 token 是否过期
   */
  private isTokenExpired(): boolean {
    if (!this.hasToken()) {
      this.loginFunc('请登录')
    }
    const { expire_time } = storeToRefs(useAuthStore())

    return expire_time.value <= Date.now()
  }

  /**
   * 刷新 token
   */
  private async refreshToken(): Promise<void> {
    const { refreshToken: refresh } = useAuthStore()
    try {
      await refresh()
    }
    catch (err) {
      this.loginFunc('登录已失效，请重新登录')
    }
  }

  /**
   * 权限控制
   */
  async auth() {
    if (!this.isTokenExpired()) {
      await this.refreshToken()
    }
  }

  /**
   * 成功回调
   *
   * @param res 请求结果
   */
  private success<T>(res: RequestSuccessCallbackResult): T {
    if (this.login(res.data.code)) {
      return (res.data ?? res) as T
    }

    return (res.data ?? res) as T
  }

  /**
   * 失败回调
   *
   * @param err 失败信息
   */
  private fail<T>(err: NormalResult): T {
    if (this.login(err.code)) {
      return { error: '登录失败，请重试', code: err.code } as T
    }

    return { error: err, code: err.code } as T
  }

  /**
   * 是否需要登录
   * @param code 状态码
   */
  login(code: number) {
    if (code === 401) {
      this.loginFunc('请登录')
      return true
    }
    if (code === 20001) {
      this.loginFunc('请重新登录')
      return true
    }
    return false
  }

  /**
   * 登录地址
   */
  loginUrl = '/pages/me/login'

  /**
   * 登录方法
   * @param msg 提示信息
   */
  loginFunc(msg: string, url: string = this.loginUrl) {
    Toast(msg, 'none', () => {
      uni.reLaunch({
        url,
      })
    }, 2000)
  }

  get<T = any>(api: string, data?: any, config?: Options): Promise<Result<T>> {
    return this.Request(api, data, { ...config, methods: 'GET' })
  }

  post<T = any>(api: string, data?: any, config?: Options): Promise<Result<T>> {
    return this.Request(api, data, { ...config, methods: 'POST' })
  }

  upload<T = any>(api: string, data?: any, config?: Options): Promise<Result<T>> {
    return this.Request(api, data, { ...config, methods: 'UPLOAD' })
  }
}

export const http = new Http()
