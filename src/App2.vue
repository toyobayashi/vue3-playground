<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMainStore } from '@/stores/index'
const store = useMainStore()
</script>

<template>
  <div>Count: {{store.count}} * 2 = {{store.computedCount}}</div>
  <div>
    <RouterLink to="/temperature">Temperature</RouterLink> | <RouterLink to="/yen">Yen</RouterLink>
  </div>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>
