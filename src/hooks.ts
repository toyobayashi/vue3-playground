import { ref } from 'vue'
import store from './store'

export function useTextInput (defaultValue?: string) {
  const inputValue = ref(defaultValue ?? '')
  const log = () => {
    console.log(inputValue.value)
    // store.commit('COUNT')
    store.add()
  }

  return {
    inputValue,
    log
  }
}