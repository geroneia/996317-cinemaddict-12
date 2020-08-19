import {createElement} from "../utils.js";

// разметка списка лучших фильмов
const createBestFilmsListTemplate = () =>
  `<section class="films-list--extra">
          <h2 class="films-list__title">Top rated</h2>
    
          <div class="films-list__container">
          </div>
      </section>`;

export default class BestFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBestFilmsListTemplate();
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
