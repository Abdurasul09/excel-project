import { $ } from "../../core/dom";
import { Emitter } from "../../core/Emitter";
import { StoreSubscriber } from "../../core/StoreSubscriber";

export class Excel {
  constructor(selector, option) {
    this.$el = $(selector);
    this.components = option.components || [];
    this.store = option.store;
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  // Create html element and get components
  getRoot() {
    // const $root = document.createElement("div")
    // $root.classList.add("excel")
    const $root = $.create("div", "excel");
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    }

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component
    });

    return $root;
  }

  // Render
  render() {
    this.$el.append(this.getRoot());
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy(){
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
