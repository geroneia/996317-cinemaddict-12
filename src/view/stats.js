import {createElement} from "../utils.js";

export default class SatsTemplate {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<a href="#stats" class="main-navigation__additional">Stats</a>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
