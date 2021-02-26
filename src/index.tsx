import { createApp, KeepAlive } from 'vue'
import type { DefineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import type { RouteLocation } from 'vue-router'

import store from './store'
import router from './router'

interface RouterViewDefaultSlotScope {
  route: RouteLocation
  Component: DefineComponent<{}, {}, any> | undefined
}

const app = createApp(() => {
  return (
    <>
      <div>Count: {store.state.count}</div>
      <div id="nav">
        <RouterLink to="/">JSX</RouterLink> | <RouterLink to="/sfc">SFC</RouterLink>
      </div>
      <RouterView
        v-slots={{
          default: (slotProps: RouterViewDefaultSlotScope) => {
            const { Component } = slotProps
            return <KeepAlive>{Component ? <Component /> : null}</KeepAlive>
          }
        }} />
    </>
  )
})

app.use(store).use(router).mount('#app')

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept()
}
