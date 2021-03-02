// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//     count: 0
//   },
//   mutations: {
//     COUNT (state) {
//       state.count++
//     }
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

import * as Vue from 'vue'
import { VueModel, IVueModel, ISubscribeOptions, Subscriber } from '@tybys/vuemodel'

interface State {
  a: { count: number }
}

class Store implements IVueModel<State, any> {
  public get state () {
    return this.__model.state
  }

  public get getters () {
    return this.__model.getters
  }

  public subscribe(fn: Subscriber<State>, options?: ISubscribeOptions): () => void {
    return this.__model.subscribe(fn, options)
  }

  private __model = VueModel.create(Vue, {
    state: {
      a: { count: 1 }
    },
    getters: {
      computedCount (state): number {
        return state.a.count * 2
      }
    }
  })

  public get count (): number {
    return this.state.a.count
  }

  public get computedCount (): number {
    return this.getters.computedCount
  }

  public add () {
    return Promise.resolve().then(() => {
      this.state.a.count++
    })
  }

  public install (app: Vue.App) {
    console.log(app)
  }
}

const store = new Store()
store.subscribe((state) => {
  console.log(state)
})

export default store
