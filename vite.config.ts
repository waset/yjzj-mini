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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uniPolyfill(),
    // https://github.com/uni-helper/vite-plugin-uni-manifest
    UniHelperManifest(),
    // https://github.com/uni-helper/vite-plugin-uni-pages
    UniHelperPages({
      dts: 'runtime/uni-pages.d.ts',
    }),
    // https://github.com/uni-helper/vite-plugin-uni-layouts
    UniHelperLayouts(),
    // https://github.com/uni-helper/vite-plugin-uni-components
    UniHelperComponents({
      dts: 'runtime/components.d.ts',
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
      dts: 'runtime/auto-imports.d.ts',
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
