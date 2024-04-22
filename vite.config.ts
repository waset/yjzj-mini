import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import Modules from 'vite-plugin-use-modules'
import { uniPolyfill } from './bin/uni-polyfill'
import { Convert } from './bin/convert-icon'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 转换图标
    Convert('src/assets/icons', 'icons', 'temp/icons/'),
    Convert('src/assets/svg', 'svg', 'temp/icons/', false),
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
      dts: 'temp/types/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
        'src/utils',
      ],
      vueTemplate: true,
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS(),
    // https://github.com/vuejs/devtools-next
    VueDevTools(),
  ],
})
