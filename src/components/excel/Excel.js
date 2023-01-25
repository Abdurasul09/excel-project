import { $ } from "../../core/dom";

export class Excel {
  constructor(selector, option) {
    this.$el = $(selector);
    this.components = option.components || [];
  }

  // Create html element and get components
  getRoot() {
    // const $root = document.createElement("div")
    // $root.classList.add("excel")
    const $root = $.create("div", "excel");

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component
    });

    return $root;
  }

  // Render
  render() {
    this.$el.append(this.getRoot());
    this.components.forEach(component => component.init())
  }
}
