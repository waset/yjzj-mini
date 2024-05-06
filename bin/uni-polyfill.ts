import type { Plugin } from 'vite'

/**
 * @see https://github.com/dcloudio/uni-app/issues/4604
 */
export function uniPolyfill(): Plugin {
  return {
    name: 'vite-plugin-uni-polyfill',
    transform(code, id) {
      if (!id.endsWith('@dcloudio/uni-mp-vue/dist/vue.runtime.esm.js'))
        return
      code += `
            // polyfill for @vueuse/core
            export const render = () => {}
            export const TransitionGroup = {}
        `
      return code
    },
  }
}
