import AbstractView from "./abstract.js";

const MAX_SIMBOL_COUNT = 140;
const MINUTES_IN_HOUR = 60;

// разметка карточки фильма
const createCardTemplate = (card) => {
  const {
    poster,
    title,
    releaseDate,
    runtime,
    genres,
    description,
    comments,
    rating,
    isAddedToWatchlist,
    isWatched,
    isFavorite
  } = card;

  // получает год выхода для краткой информации
  const releaseYear = releaseDate.getFullYear();

  // получает продолжительность в часах
  const getRuntimeInHours = () => {
    const hour = Math.floor(runtime / MINUTES_IN_HOUR);
    const minutes = runtime % MINUTES_IN_HOUR;
    return minutes > 0 ?
      `${hour}h ${minutes}m` :
      `${hour}h`;
  };

  // получает количество комментариев
  const commentsCount = () => `${comments.length} comment` + (comments.length > 1 ? `s` : ``);

  // получает описание для краткого отоображения
  const getDescription = () => {
    return description.length < MAX_SIMBOL_COUNT ?
      description :
      `${description.slice(0, MAX_SIMBOL_COUNT)}... `;
  };

  // получает классы для отмеченных чекбоксов
  const getActiveClass = (category) => category ? `film-card__controls-item--active` : ``;

  return `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
            <span class="film-card__year">${releaseYear}</span>
            <span class="film-card__duration">${getRuntimeInHours()}</span>
            <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="${title}(${releaseYear})" class="film-card__poster">
        <p class="film-card__description">${getDescription()}</p>
        <a class="film-card__comments">${commentsCount()}</a>
        <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getActiveClass(isAddedToWatchlist)}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getActiveClass(isWatched)}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${getActiveClass(isFavorite)}">Mark as favorite</button>
        </form>
    </article>`;
};

export default class Card extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _clickHandler() {
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    Array.from(this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`))
    .forEach((control) => {
      control.addEventListener(`click`, this._clickHandler);
    });
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, this._favoriteClickHandler);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
    .addEventListener(`click`, this._addToWatchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, this._watchedClickHandler);
  }
}
