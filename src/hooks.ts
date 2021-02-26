import { ref } from 'vue'
import store from './store'

export function useTextInput (defaultValue?: string) {
  const inputValue = ref(defaultValue ?? '')
  const log = () => {
    console.log(inputValue.value)
    store.commit('COUNT')
  }

  return {
    inputValue,
    log
  }
}