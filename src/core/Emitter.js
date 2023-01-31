
export class Emitter{
  constructor(){
		this.listeners = {}
	}

	emit(event, ...arg){
    if(!Array.isArray(this.listeners[event])){
			return false
		}
		this.listeners[event].forEach(listener => {
			listener(...arg)
		});
		return true
	}

	subscribe(event, fn){
    this.listeners[event] = this.listeners[event] || []
		this.listeners[event].push(fn)
		return () => {
			this.listeners[event] = 
			  this.listeners[event].filter(listener => listener !== fn)
		}
	}
}