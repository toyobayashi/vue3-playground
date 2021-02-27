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

import { reactive, UnwrapRef, computed, ComputedRef, App, InjectionKey, watch } from 'vue'

type Subscriber<S extends object> = (state: S) => void

interface SubscribeOptions {
  prepend?: boolean
}

class BaseStore<S extends object> {
  protected _state: UnwrapRef<S>

  private __subscribers: Array<Subscriber<S>>

  protected constructor (state: S) {
    this._state = reactive(state) as UnwrapRef<S>
    this.__subscribers = []

    watch(this._state, (value) => {
      this.__subscribers.slice().forEach(sub => { sub(value as S) })
    }, {
      deep: true
    })
  }

  public get state (): UnwrapRef<S> {
    return this._state
  }

  public subscribe (fn: Subscriber<S>, options?: SubscribeOptions): () => void {
    if (this.__subscribers.indexOf(fn) < 0) {
      if (options && options.prepend) {
        this.__subscribers.unshift(fn)
      } else {
        this.__subscribers.push(fn)
      }
    }
    return () => {
      const i = this.__subscribers.indexOf(fn)
      if (i > -1) {
        this.__subscribers.splice(i, 1)
      }
    }
  }

  /** @virtual */
  public install (_app: App, _injectKey?: InjectionKey<any>): void {
    // app.provide(injectKey || BaseStore.__storeKey, this)
    // app.config.globalProperties.$store = this
  }
}

class Store extends BaseStore<{ a: { count: number } }> {
  private _computedCount: ComputedRef<number>
  public constructor () {
    super({
      a: { count: 1 }
    })

    this._computedCount = computed(() => this.state.a.count * 2)
  }

  public get count (): number {
    return this.state.a.count
  }

  public get computedCount (): number {
    return this._computedCount.value
  }

  public add () {
    return Promise.resolve().then(() => {
      this.state.a.count++
    })
  }
}

const store = new Store()
store.subscribe((state) => {
  console.log(state)
})

export default store
