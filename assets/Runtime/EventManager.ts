import Singleton from 'db://assets/Base/Singleton'

interface IHandler {
  handler: Function
  ctx?: unknown
}

export default class EventManager extends Singleton {
  static get Instance() {
    return super.getInstance<EventManager>()
  }

  private eventDictionary: Map<string, Array<IHandler>> = new Map()

  on(eventName: string, handler: Function, ctx?: unknown) {
    if (this.eventDictionary.has(eventName)) {
      this.eventDictionary.get(eventName).push({ handler, ctx })
    } else {
      this.eventDictionary.set(eventName, [{ handler, ctx }])
    }
  }

  off(eventName: string, handler: Function) {
    if (this.eventDictionary.has(eventName)) {
      const index = this.eventDictionary.get(eventName).findIndex(m => m.handler === handler)
      index > -1 && this.eventDictionary.get(eventName).splice(index, 1)
    }
  }

  emit(eventName: string, ...params: unknown[]) {
    if (this.eventDictionary.has(eventName)) {
      this.eventDictionary.get(eventName).forEach(({ handler: func, ctx }) => {
        ctx ? func.apply(ctx, params) : func(...params)
      })
    }
  }

  clear() {
    this.eventDictionary.clear()
  }
}
