import { defineComponent, KeepAlive } from 'vue'
import type { DefineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import type { RouteLocation } from 'vue-router'
import { useMainStore } from '@/stores/index'

interface RouterViewDefaultSlotScope {
  route: RouteLocation
  Component: DefineComponent<{}, {}, any> | undefined
}

export default defineComponent(function () {
  const store = useMainStore()

  return () => {
    return (
      <>
        <div>Count: {store.count} * 2 = {store.computedCount}</div>
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
  }
})
