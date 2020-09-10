import SmartView from "./smart.js";
import {generateId} from "../mock/film.js";
import {getRandomItem} from "../utils/common.js";
import {NAMES} from "../mock/film.js";

import {formatCardReleaseDate, formatCardRuntime, formatCardReleaseYear, formatCommentDate} from "../utils/card.js";

// разметка дополнительной информации о фильме
const createFilmDetailsCard = (data, comments) => {
  const {
    title,
    poster,
    rating,
    ageRating,
    director,
    writers,
    actors,
    releaseDate,
    runtime,
    country,
    genres,
    description,
    isAddedToWatchlist,
    isWatched,
    isFavorite
  } = data;

  // получает разметку списка жанров
  const createGenresTemplate = (genresList) => {
    return genresList.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(` `);
  };

  // отмечает чекбоксы
  const getMark = (category) => category ? `checked` : ``;

  // получает разметку комментария
  const createCommentTemplate = (commentsList) => {
    return commentsList.map(({message, emoji, name, currentDate, id}) => `<ul class="film-details__comments-list">
    <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${name}</span>
        <span class="film-details__comment-day">${formatCommentDate(currentDate)}</span>
        <button class="film-details__comment-delete" data-id="${id}">Delete</button>
      </p>
    </div>
  </li>`).join(` `);
  };

  return `<section class="film-details">
          <form class="film-details__inner" action="" method="get">
            <div class="form-details__top-container">
              <div class="film-details__close">
                <button class="film-details__close-btn" type="button">close</button>
              </div>
              <div class="film-details__info-wrap">
                <div class="film-details__poster">
                  <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}(${formatCardReleaseYear(releaseDate)})">

                  <p class="film-details__age">${ageRating}+</p>
                </div>

                <div class="film-details__info">
                  <div class="film-details__info-head">
                    <div class="film-details__title-wrap">
                      <h3 class="film-details__title">${title}</h3>
                      <p class="film-details__title-original">Original: ${title}</p>
                    </div>

                    <div class="film-details__rating">
                      <p class="film-details__total-rating">${rating}</p>
                    </div>
                  </div>

                  <table class="film-details__table">
                    <tr class="film-details__row">
                      <td class="film-details__term">Director</td>
                      <td class="film-details__cell">${director}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Writers</td>
                      <td class="film-details__cell">${writers.join(`, `)}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Actors</td>
                      <td class="film-details__cell">${actors.join(`, `)}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Release Date</td>
                      <td class="film-details__cell">${formatCardReleaseDate(releaseDate)}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Runtime</td>
                      <td class="film-details__cell">${formatCardRuntime(runtime)}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Country</td>
                      <td class="film-details__cell">${country.join(`, `)}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Genres</td>
                      <td class="film-details__cell">${createGenresTemplate(genres)}</td>
                    </tr>
                  </table>

                  <p class="film-details__film-description">
                    ${description}
                  </p>
                </div>
              </div>

              <section class="film-details__controls">
                <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${getMark(isAddedToWatchlist)}>
                <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${getMark(isWatched)}>
                <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${getMark(isFavorite)}>
                <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
              </section>
            </div>

            <div class="form-details__bottom-container">
              <section class="film-details__comments-wrap">
                <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

                <ul class="film-details__comments-list">
                  ${createCommentTemplate(comments)}
                </ul>

                <div class="film-details__new-comment">
                  <div for="add-emoji" class="film-details__add-emoji-label"></div>

                  <label class="film-details__comment-label">
                    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" value=""></textarea>
                  </label>

                  <div class="film-details__emoji-list">
                    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                    <label class="film-details__emoji-label" for="emoji-smile">
                      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                    </label>

                    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                    <label class="film-details__emoji-label" for="emoji-sleeping">
                      <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                    </label>

                    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                    <label class="film-details__emoji-label" for="emoji-puke">
                      <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                    </label>

                    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                    <label class="film-details__emoji-label" for="emoji-angry">
                      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </form>
        </section>`;
};

export default class FilmDetailsCard extends SmartView {
  constructor(card, commentsList) {
    super();
    this._data = FilmDetailsCard.parseCardToData(card);
    this._commentsList = commentsList;
    this._clickHandler = this._clickHandler.bind(this);
    this._message = ``;
    this._emoji = ``;
    this._addedComment = {};

    this._emojiInputHandler = this._emojiInputHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);
    this._addToWatchlistToggleHandler = this._addToWatchlistToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
    this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this.setDescriptionInputHandler();
    this._setEmojiInputHandler();
  }

  // Выход без сохранения
  reset(card) {
    this.updateData(
        FilmDetailsCard.parseCardToData(card)
    );
  }

  getTemplate() {
    return createFilmDetailsCard(this._data, this._commentsList);
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(FilmDetailsCard.parseDataToCard(this._data));
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  _addToWatchlistToggleHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick(FilmDetailsCard.parseDataToCard(this._data));
    this.updateData({
      isAddedToWatchlist: !this._data.isAddedToWatchlist
    });
  }

  _watchedToggleHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick(FilmDetailsCard.parseDataToCard(this._data));
    this.updateData({
      isWatched: !this._data.isWatched
    });
  }

  restoreHandlers() {
    this.setFavoriteLabelClickHandler(this._callback.favoriteClick);
    this.setAddToWatchlistLabelClickHandler(this._callback.addToWatchlistClick);
    this.setWatchedLabelClickHandler(this._callback.watchedClick);
    this.setClickHandler(this._callback.click);
    this._setEmojiInputHandler();
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setFormSubmitHandler(this._callback.formSubmit);


  }

  setFavoriteLabelClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
    .querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, this._favoriteToggleHandler);
  }

  setAddToWatchlistLabelClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement()
    .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._addToWatchlistToggleHandler);
  }

  setWatchedLabelClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._watchedToggleHandler);
  }

  _setEmojiInputHandler() {
    this.getElement().querySelectorAll(`.film-details__emoji-item`)
    .forEach((input) => input.addEventListener(`click`, this._emojiInputHandler));
  }

  _emojiInputHandler(evt) {
    let id = evt.target.id;
    this._emoji = id.slice(6);
    this.getElement().querySelector(`.film-details__add-emoji-label`)
      .innerHTML = `<img src="./images/emoji/${this._emoji}.png" width="55" height="55" alt="${id}" data-value="${this._emoji}">`;
    this.updateData({
      description: evt.target.value
    }, true);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(FilmDetailsCard.parseDataToCard(this._data));
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, this._clickHandler);
  }

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();
    const value = evt.target.dataset.id;
    const index = this._commentsList.findIndex((comment) => comment.id === +value);
    const deletedComment = this._commentsList[index];
    this._callback.deleteClick(deletedComment);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    const buttons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    if (buttons) {
      buttons.forEach((button) => button.addEventListener(`click`, this._commentDeleteClickHandler));
    }
  }

  _descriptionInputHandler(evt) {
    evt.preventDefault();
    this._message = evt.target.value;
  }

  setDescriptionInputHandler() {
    this.getElement()
  .querySelector(`.film-details__comment-input`)
  .addEventListener(`input`, this._descriptionInputHandler);
  }


  _formSubmitHandler(evt) {
    if ((evt.ctrlKey || evt.metaKey) && (evt.key === `Enter`)) {
      evt.preventDefault();
      this._addedComment = {
        id: generateId(),
        message: this._message,
        emoji: this._emoji,
        name: getRandomItem(NAMES),
        currentDate: new Date()
      };
      this._callback.formSubmit(this._addedComment);
    }
    this._addedComment = {};
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    document.addEventListener(`keydown`, this._formSubmitHandler);
  }

  static parseCardToData(card) {
    return Object.assign(
        {},
        card,
        {
          isAddedToWatchlist: card.isAddedToWatchlist,
          isWatched: card.isWatched,
          isFavorite: card.isFavorite
        }
    );
  }

  static parseDataToCard(data) {
    data = Object.assign({}, data);

    delete data.isAddedToWatchlist;
    delete data.isWatched;
    delete data.isFavorite;

    return data;
  }
}
