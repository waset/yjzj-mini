/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  // 接口地址
  readonly VITE_API_URL: string
  // 图片地址
  readonly VITE_IMAGE_URL: string
  // 资源地址
  readonly VITE_STATIC_URL: string
  // 域名地址
  readonly VITE_DOMAIN_URL: string
  // 企业微信客服地址
  readonly VITE_CUSTOMER_SERVICE_URL: string
  // 企业微信企业 ID
  readonly VITE_CORP_ID: string
}
