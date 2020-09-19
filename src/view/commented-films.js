import AbstractView from "./abstract.js";

// разметка часто обсуждаемых фильмов
const createCommentedFilmsListTemplate = () =>
  `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
  
      <div class="films-list__container">
      </div>
      </section>`;

export default class CommentedFilms extends AbstractView {
  getTemplate() {
    return createCommentedFilmsListTemplate();
  }
}
