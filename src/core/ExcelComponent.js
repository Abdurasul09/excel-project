import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, option = {}){
    super($root, option.listeners)
    this.name = option.name || ''
    this.emitter = option.emitter
    this.subscribe = option.subscribe || []
    this.store = option.store
    this.unsubsubscribes = []
    this.prepare()
  }

  prepare(){}
  
  toHTML() {
    return "";
  }

  $emit(event, ...args){
    this.emitter.emit(event, ...args)
  }

  $on(event, fn){
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubsubscribes.push(unsub)
  }

  $dispatch(action){
    this.store.dispatch(action)
  }

  storeChanged(){}

  isWatching(key){
    return this.subscribe.includes(key)
  }

  init(){
    this.initDOMListener()
  }

  destroy(){
    this.removeDOMListener()
    this.unsubsubscribes.forEach(unsub => unsub())
  }
}
