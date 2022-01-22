import { ref } from 'vue'

export function useConverter (leftToRight: (left: number) => number, rightToLeft: (right: number) => number) {
  const left = ref(0)
  const right = ref(leftToRight(left.value))

  const onLeftChange = (e: Event) => {
    left.value = Number((e.target as HTMLInputElement).value)
    right.value = leftToRight(left.value)
  }

  const onRightChange = (e: Event) => {
    right.value = Number((e.target as HTMLInputElement).value)
    left.value = rightToLeft(right.value)
  }

  return {
    left,
    right,
    onLeftChange,
    onRightChange
  }
}
