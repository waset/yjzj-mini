import { defineConfig } from 'vite'
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
export default async () => {
  // convert-icon
  await Converts(ConvertsOptions)

  // https://unocss.dev
  return defineConfig({
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
      Uni(),
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
          'src/stores/**',
          'src/utils/**',
        ],
        vueTemplate: true,
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
    ],
  })
}
