import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, option = {}){
    super($root, option.listeners)
  }
	// Returns the template of the component
  toHTML() {
    return "";
  }

  init(){
    this.initDOMListener()
  }

  destroy(){
    console.log(this.$root);
    this.removeDOMListener()
  }
}
