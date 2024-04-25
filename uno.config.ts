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
import { IconDirLoader } from './bin/convert-icon'

// https://unocss.dev
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
      collections: {
        ...IconDirLoader(),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  rules: [
    ['green', { color: '#A7F522' }],
    ['bg-green', { color: '#A7F522' }],
  ],
  shortcuts: {
    'flex-start': 'flex items-center justify-start',
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-around': 'flex items-center justify-around',
  },
})
