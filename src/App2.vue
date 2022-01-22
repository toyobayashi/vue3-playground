<template>
  <div>Count: {{store.count}} * 2 = {{store.computedCount}}</div>
  <div id="nav">
    <RouterLink to="/temperature">Temperature</RouterLink> | <RouterLink to="/yen">Yen</RouterLink>
  </div>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMainStore } from '@/stores/index'
const store = useMainStore()
</script>
