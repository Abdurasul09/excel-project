import { storage } from "../core/utils"

function toHTML(key){
	const modal = storage(key)
	const id = key.split(':')[1]
	return `
	  <li class="db__record">
	    <a href="#excel/${id}">${modal.title}</a>
	    <strong>
			  ${new Date(modal.openedDate).toLocaleDateString()}
			  ${new Date(modal.openedDate).toLocaleTimeString()}
			</strong>
    </li>
	`
}

function getAllKeys(){
	const keys = []
	for(let i = 0; i < localStorage.length; i++){
		const key = localStorage.key(i)
		if(!key.includes('excel')){
			continue
		}
		keys.push(key)
	}
	return keys
}

export function createRecordsTable(){
	const keys = getAllKeys()
	
  if(!keys.length){
		return `<p>You have not created any pages yet</p>`
	}

	return `
	  <div class="db__list-header">
			<span>Title</span>
			<span>Date open</span>
	  </div>
		<ul class="db__list">
			${keys.map(toHTML).join('')}
		</ul>
	`
}

