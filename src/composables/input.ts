import { ref } from 'vue'
import { useMainStore } from '@/stores/index'

export function useTextInput (defaultValue?: string) {
  const store = useMainStore()
  const inputValue = ref(defaultValue ?? '')
  const add = () => {
    store.add(Number(inputValue.value) || 0)
  }

  return {
    inputValue,
    add
  }
}
