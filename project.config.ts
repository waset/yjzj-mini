import type { ConvertOption } from './bin/convert-icon'

/**
 * 图标配置
 */
export const icons: ConvertOption[] = [
  {
    path: 'src/assets/icons',
    prefix: 'icons',
    out: 'temp/icons/',
    noColor: true,
  },
  {

    path: 'src/assets/svg',
    prefix: 'svg',
    out: 'temp/icons/',
    noColor: false,
  },
]
