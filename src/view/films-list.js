import AbstractView from "./abstract.js";

// разметка основного списка фильмов
const createFilmsListTemplate = () =>
  `<section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

          <div class="films-list__container">
          </div>
      </section>`;

export default class FilmsList extends AbstractView {
  getTemplate() {
    return createFilmsListTemplate();
  }
  getContainer() {
    return this.getElement().querySelector(`.films-list .films-list__container`);
  }
}
