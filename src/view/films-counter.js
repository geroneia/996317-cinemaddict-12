import AbstractView from "./abstract.js";

// разметка поличества фильмов
export default class FilmsCounter extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return `<p>${this._cards.length} movies inside</p>`;
  }
}
