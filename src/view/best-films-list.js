import AbstractView from "./abstract.js";

// разметка списка лучших фильмов
const createBestFilmsListTemplate = () =>
  `<section class="films-list--extra">
          <h2 class="films-list__title">Top rated</h2>
    
          <div class="films-list__container">
          </div>
      </section>`;

export default class BestFilms extends AbstractView {
  getTemplate() {
    return createBestFilmsListTemplate();
  }
}
