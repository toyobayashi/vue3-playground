import { defineComponent } from 'vue'
import { useTextInput } from '@/composables/input'

export default defineComponent(function () {
  const { inputValue, add } = useTextInput('0')
  return () => {
    console.log('App render')
    return (
      <>
        <input type="text" v-model={inputValue.value} />
        <p>{inputValue.value}</p>
        <button onClick={add}>JSX ADD</button>
      </>
    )
  }
})
