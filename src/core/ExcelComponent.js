import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, option = {}){
    super($root, option.listeners)
    this.name = option.name || ''
    this.emitter = option.emitter
    this.unsubsubscribes = []
    this.prepare()
  }

  prepare(){}

	// Returns the template of the component
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

  init(){
    this.initDOMListener()
  }

  destroy(){
    this.removeDOMListener()
    this.unsubsubscribes.forEach(unsub => unsub())
  }
}
