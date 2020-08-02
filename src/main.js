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

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

// функция для рендеринга
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

// рисует звание пользователя на странице
render(siteHeaderElement, createProfileRating(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

// рисует меню
render(siteMainElement, createMenuTemplate(), `beforeend`);
const siteMenuElement = siteMainElement.querySelector(`.main-navigation`);
render(siteMenuElement, createFilterTemplate(), `beforeend`);
render(siteMenuElement, createStatsTemplate(), `beforeend`);

// рисует сортировку
render(siteMainElement, createSortingTemplate(), `beforeend`);

// рисует список блоков фильмов
render(siteMainElement, createBoardTemplate(), `beforeend`);
const boardElement = siteMainElement.querySelector(`.films`);

// рисует основной список фильмов
render(boardElement, createFilmsListTemplate(), `beforeend`);
const filmsListElement = boardElement.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListElement, createCardTemplate(), `beforeend`);
}

// рисует кнопку
render(filmsListElement, createShowMoreButton(), `afterend`);

// рисует дополнительные списки фильмов
render(boardElement, createBestFilmsListTemplate(), `beforeend`);

const bestfilmsListElement = boardElement.querySelector(`.films-list--extra .films-list__container`);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(bestfilmsListElement, createCardTemplate(), `beforeend`);
}

render(boardElement, createCommentedFilmsListTemplate(), `beforeend`);
const commentedfilmsListElement = boardElement.querySelector(`.films-list--extra:last-of-type .films-list__container`);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(commentedfilmsListElement, createCardTemplate(), `beforeend`);
}

// рисует счетчик фильмов в футере
const footerElement = document.querySelector(`.footer`);
const footerStatElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatElement, createFilmsCounterTemplate(), `beforeend`);

// рисует попап с дополнительной информацией о фильме
render(footerElement, createFilmDetailsCard(), `afterend`);
