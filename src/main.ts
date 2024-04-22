import { createSSRApp } from 'vue'
import { useModules } from 'virtual:modules'

import App from './App.vue'

import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)

  useModules(app)

  return {
    app,
  }
}
