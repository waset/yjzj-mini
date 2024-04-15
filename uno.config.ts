import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// https://github.com/uni-helper/unocss-preset-uni
import { presetUni } from '@uni-helper/unocss-preset-uni'

// convert-icon
// https://github.com/iconify/tools
import { Convert, iconDir, outDir } from './bin/convert-icon'

export default defineConfig({
  presets: [
    presetUni(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      autoInstall: false,
      collections: {
        icon: async () => {
          await Convert('src/assets')
          return import(`./${outDir}/${iconDir}.json`).then(i => i.default)
        },
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
