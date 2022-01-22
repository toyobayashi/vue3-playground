<script setup lang="ts">
import { useConverter } from '@/composables/converter'
import { useMainStore } from '@/stores'

const {
  left: c,
  right: f,
  onLeftChange: setC,
  onRightChange: setF
} = useConverter(
  v => v * (9 / 5) + 32,
  v => (v - 32) * (5 / 9)
)

function add () {
  const store = useMainStore()
  store.add(1)
}
</script>

<template>
  <input type="number" :value="c" @change="setC"> 摄氏度 =
  <input type="number" :value="f" @change="setF"> 华氏度
  <div @click="add"><button>ADD</button></div>
</template>
