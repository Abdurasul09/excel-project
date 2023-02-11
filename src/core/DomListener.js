import { capitalize } from "./utils"

export class DomListener {
	constructor($root, listeners = []){
		if(!$root){
			throw new Error("No $root provided for DomListener!")
		}
    this.$root = $root
		this.listeners = listeners
	}

	initDOMListener(){
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			if(!this[method]){
        throw new Error(`Method ${method} is not implemented in ${this.name} Component`)
			}
			this[method] = this[method].bind(this);
			// addEventListener
			this.$root.on(listener, this[method])
		})
	}
	removeDOMListener(){
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			this.$root.of(listener, this[method])
		})
	}
}

// Pure function
function getMethodName(eventName){
	return "on" + capitalize(eventName)
}