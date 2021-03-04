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
import { createLogger, IAction, Store } from '@tybys/vuemodel'

interface State {
  a: { count: number }
}

const getters = {
  computedCount (state: State): number {
    return state.a.count * 2
  }
}

class MyStore extends Store<State, typeof getters> {
  private __addAction: IAction<number, void>
  public constructor () {
    super(Vue, {
      state: {
        a: { count: 1 }
      },
      getters,
      devtools: false,
      plugins: [
        createLogger({ collapsed: false })
      ]
    })
    this.__addAction = this.registerAction('a_add', (n: number) => {
      this.state.a.count += n
    })
  }

  public get count (): number {
    return this.state.a.count
  }

  public get computedCount (): number {
    return this.getters.computedCount
  }

  public add () {
    return this.dispatch(this.__addAction, 1)
  }

  public install (app: Vue.App) {
    console.log(app)
  }
}

const store = new MyStore()

export default store
