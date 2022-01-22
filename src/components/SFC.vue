<template>
  <input type="text" v-model="inputValue" />
  <p>{{inputValue}}</p>
  <button @click="add">SFC ADD</button>
</template>

<script setup lang="ts">
import { useTextInput } from '@/composables/input'
const { inputValue, add } = useTextInput('0')
</script>
