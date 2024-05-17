import { defineConfig, loadEnv } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import Modules from 'vite-plugin-use-modules'
import { uniPolyfill } from './bin/uni-polyfill'

// convert-icon
import { Converts } from './bin/convert-icon'
import { icons as ConvertsOptions } from './project.config'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // convert-icon
  await Converts(ConvertsOptions)
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd())

  // https://unocss.dev
  return {
    plugins: [
      // https://github.com/dcloudio/uni-app/issues/4604
      uniPolyfill(),
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniHelperManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniHelperPages({
        dts: 'temp/types/uni-pages.d.ts',
      }),
      // https://github.com/uni-helper/vite-plugin-uni-layouts
      UniHelperLayouts(),
      // https://github.com/uni-helper/vite-plugin-uni-components
      UniHelperComponents({
        dts: 'temp/types/components.d.ts',
        directoryAsNamespace: true,
        deep: true,
      }),
      // https://github.com/dishait/vite-plugin-use-modules
      Modules({
        target: 'src/plugins',
      }),
      /**
       * https://github.com/dcloudio/uni-app/issues/4815
       */
      // @ts-expect-error eslint-disable-next-line ts/ban-ts-comment
      Uni.default(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'uni-app',
          'pinia',
          uniuseAutoImports(),
        ],
        packagePresets: [
          {
            package: '@vueuse/core',
            ignore: [
              // vueuse core 默认禁用
              'toRef',
              'toRefs',
              'toValue',
              'utils',
              // 解决 uni-use 冲突
              'tryOnScopeDispose',
              'useNetwork',
              'useOnline',
              'usePreferredDark',
              'useStorage',
              'useStorageAsync',
            ],
            cache: false,
          },
        ],
        dts: 'temp/types/auto-imports.d.ts',
        dirs: [
          'src/composables/**',
          'src/model/**',
          'src/utils/**',
        ],
        vueTemplate: true,
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS({
        preflights: [
          {
            getCSS: () => `
              page {
                color: #fff;
                height: 100%;
                background-color: #111;
                background-image: url('${env.VITE_STATIC_URL}/images/allbg.png');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                background-attachment: fixed;
              }
            `,
          },
        ],
      }),
    ],
    // 配置服务器相关的选项
    server: {
      // 反向代理的配置
      proxy: {
        // 匹配所有以'/web'开头的请求
        '/api': {
          // 代理目标的基础路径
          target: 'https://dev-api.yjzj.com',
          // 如果是HTTPS服务，需要设置为true
          secure: false,
          // 路径重写
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
