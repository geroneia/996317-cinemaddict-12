import AbstractView from "./abstract.js";

export default class Board extends AbstractView {
  getTemplate() {
    return `<section class="films"><section>`;
  }

  getBestFilmsContainer() {
    return this.getElement().querySelector(`.films-list--extra .films-list__container`);
  }

  getMostCommentedFilmsContainer() {
    return this.getElement().querySelector(`.films-list--extra:last-of-type .films-list__container`);
  }
}
