const MAX_SIMBOL_COUNT = 140;

// разметка карточки фильма
export const createCardTemplate = (card) => {
  const {
    poster,
    title,
    releaseDate,
    runtime,
    genres,
    description,
    comments,
    rating
  } = card;

  // получает год выхода для краткой информации
  const releaseYear = releaseDate.getFullYear();

  // получает продолжительность в часах
  const getRuntimeInHours = () => {
    const hour = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const duration = minutes > 0 ?
      `${hour}h ${minutes}m` :
      `${hour}h`;
    return duration;
  };

  // получает количество комментариев

  const commentsCount = () => `${comments.length} comment` + (comments.length > 1 ? `s` : ``);

  // получает описание для краткого отоображения
  const getDescription = () => {
    return description.length < MAX_SIMBOL_COUNT ?
      description :
      `${description.slice(0, MAX_SIMBOL_COUNT)}... `;
  };

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
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
    </article>`;
};
