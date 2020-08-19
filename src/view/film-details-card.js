import {humanizeAnyDate, createElement} from "../utils.js";

// разметка дополнительной информации о фильме
const createFilmDetailsCard = (card) => {
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
    comments,
    isAddedToWatchlist,
    isWatched,
    isFavorite
  } = card;

  // получает год выхода для краткой информации
  const releaseYear = releaseDate.getFullYear();

  // получает дату выхода для полной информации
  const releaseFullDate = humanizeAnyDate(releaseDate);

  // получает продолжительность в часах
  const getRuntimeInHours = () => {
    const hour = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return minutes > 0 ? `${hour}h ${minutes}m` : `${hour}h`;
  };

  // получает разметку списка жанров
  const createGenresTemplate = (genresList) => {
    return genresList.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(` `);
  };

  // отмечает чекбоксы
  const getMark = (category) => category ? `checked` : ``;

  // получает разметку комментария
  const createCommentTemplate = (commentsList) => {
    return commentsList.map(({message, emoji, name, currentDate}) => `<ul class="film-details__comments-list">
    <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${name}</span>
        <span class="film-details__comment-day">${currentDate.toLocaleDateString()}</span>
        <button class="film-details__comment-delete">Delete</button>
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
                  <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}(${releaseYear})">
  
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
                      <td class="film-details__cell">${releaseFullDate}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Runtime</td>
                      <td class="film-details__cell">${getRuntimeInHours()}</td>
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
                    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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

export default class FilmDetailsCard {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsCard(this._card);
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
