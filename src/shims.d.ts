import type { GlobalComponents } from '@vue/runtime-core'

export { }

declare module 'vue' {
    type Hooks = App.AppInstance & Page.PageInstance
    interface ComponentCustomOptions extends Hooks { }
}

declare global {
  type ComponentInstance = {
    [Property in keyof GlobalComponents]: InstanceType<GlobalComponents[Property]>
  }
}
