import { createApp } from 'vue'
import { pinia } from './stores/index'
import router from '@/routers/index'

import App from './App'

const app = createApp(App)
app.use(pinia)
app.use(router).mount('#app')

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept()
}
