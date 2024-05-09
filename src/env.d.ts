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
}
