import uni from '@uni-helper/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default uni(
  unocss.configs.flat,
  {
    rules: {
      'no-console': 'warn',
      'unocss/order': 'off',
      'curly': 'off',
      'antfu/top-level-function': 'off',
      'unocss/order-attributify': 'off',
    },
  },
)
