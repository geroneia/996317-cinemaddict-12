import {createProfileRating} from "./view/profile-rating.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createStatsTemplate} from "./view/stats.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createBoardTemplate} from "./view/board.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createBestFilmsListTemplate} from "./view/best-films-list.js";
import {createCommentedFilmsListTemplate} from "./view/commented-films-list.js";
import {createCardTemplate} from "./view/card.js";
import {createShowMoreButton} from "./view/show-more-button.js";
import {createFilmsCounterTemplate} from "./view/films-counter.js";
import {createFilmDetailsCard} from "./view/film-details-card.js";
import {generateCard} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateUserRank} from "./mock/user.js";


const Display = {
  FILMS_COUNT_PER_STEP: 5,
  FILMS_COUNT: 25,
  EXTRA_FILMS_COUNT: 2
};

// собирает в массив результаты вызова функции, генерирующей случайную карточку фильма
const cards = new Array(Display.FILMS_COUNT).fill(``).map(generateCard);

// собирает фильтры из массива карточек
const filters = generateFilter(cards);

// функция для рендеринга
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

// рисует звание пользователя на странице
render(siteHeaderElement, createProfileRating(generateUserRank()), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

// рисует меню
render(siteMainElement, createMenuTemplate(), `beforeend`);
const siteMenuElement = siteMainElement.querySelector(`.main-navigation`);
render(siteMenuElement, createFilterTemplate(filters), `beforeend`);
render(siteMenuElement, createStatsTemplate(), `beforeend`);

// рисует сортировку
render(siteMainElement, createSortingTemplate(), `beforeend`);

// рисует список блоков фильмов
render(siteMainElement, createBoardTemplate(), `beforeend`);
const boardElement = siteMainElement.querySelector(`.films`);

// рисует основной список фильмов
render(boardElement, createFilmsListTemplate(), `beforeend`);
const filmsListElement = boardElement.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < Math.min(cards.length, Display.FILMS_COUNT_PER_STEP); i++) {
  render(filmsListElement, createCardTemplate(cards[i]), `beforeend`);
}

if (cards.length > Display.FILMS_COUNT_PER_STEP) {
  let renderedCardCount = Display.FILMS_COUNT_PER_STEP;

  render(filmsListElement, createShowMoreButton(), `afterend`);
  const showMoreButton = boardElement.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + Display.FILMS_COUNT_PER_STEP)
      .forEach((card) => render(filmsListElement, createCardTemplate(card), `beforeend`));

    renderedCardCount += Display.FILMS_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}

// рисует дополнительные списки фильмов
render(boardElement, createBestFilmsListTemplate(), `beforeend`);

const bestfilmsListElement = boardElement.querySelector(`.films-list--extra .films-list__container`);

const sortedByRatingsFilms = cards.sort(function (a, b) {
  return b.rating - a.rating;
});

for (let i = 0; i < Display.EXTRA_FILMS_COUNT; i++) {
  render(bestfilmsListElement, createCardTemplate(sortedByRatingsFilms[i]), `beforeend`);
}

render(boardElement, createCommentedFilmsListTemplate(), `beforeend`);
const commentedfilmsListElement = boardElement.querySelector(`.films-list--extra:last-of-type .films-list__container`);


const sortedByommentsFilms = cards.sort(function (a, b) {
  return b.comments.length - a.comments.length;
});

for (let i = 0; i < Display.EXTRA_FILMS_COUNT; i++) {
  render(commentedfilmsListElement, createCardTemplate(sortedByommentsFilms[i]), `beforeend`);
}

// рисует счетчик фильмов в футере
const footerElement = document.querySelector(`.footer`);
const footerStatElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatElement, createFilmsCounterTemplate(cards), `beforeend`);

// рисует попап с дополнительной информацией о фильме
render(footerElement, createFilmDetailsCard(cards[0]), `afterend`);
