const uni = require('@uni-helper/eslint-config')
const unocss = require('@unocss/eslint-plugin')

module.exports = uni(
  {
    rules: {
      'no-console': 'warn',
    },
  },
  unocss.configs.flat,
)
