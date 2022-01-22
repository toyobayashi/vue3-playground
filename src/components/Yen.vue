<script setup lang="ts">
import { useConverter } from '@/composables/converter'

const {
  left: rmb,
  right: yen,
  onLeftChange: onRmbChange,
  onRightChange: onYenChange
} = useConverter(
  v => v * 0.06,
  v => v / 0.06
)
</script>

<template>
  <input type="number" :value="rmb" @change="onRmbChange"> 人民币 =
  <input type="number" :value="yen" @change="onYenChange"> 日元
</template>
