import {createElement} from "../utils.js";

// разметка поличества фильмов
export default class FilmsCounter {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return `<p>${this._cards.length} movies inside</p>`;
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
