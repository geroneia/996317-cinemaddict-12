import {createProfileRating} from "./view/profile-rating.js";
import SiteMenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import {createStatsTemplate} from "./view/stats.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createBoardTemplate} from "./view/board.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createBestFilmsListTemplate} from "./view/best-films-list.js";
import {createCommentedFilmsListTemplate} from "./view/commented-films-list.js";
import {createCardTemplate} from "./view/card.js";
import {createShowMoreButton} from "./view/show-more-button.js";
import {createFilmsCounterTemplate} from "./view/films-counter.js";
// import {createFilmDetailsCard} from "./view/film-details-card.js";
import {generateCard} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateUserRank} from "./mock/user.js";
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const FilmsCount = {
  PER_STEP: 5,
  TOTAL: 25,
  EXTRA: 2
};

// собирает в массив результаты вызова функции, генерирующей случайную карточку фильма
const cards = new Array(FilmsCount.TOTAL).fill(``).map(generateCard);

// собирает фильтры из массива карточек
const filters = generateFilter(cards);

const siteHeaderElement = document.querySelector(`.header`);

// рисует звание пользователя на странице
renderTemplate(siteHeaderElement, createProfileRating(generateUserRank(cards)), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

// рисует меню
const menuComponent = new SiteMenuView();
renderElement(siteMainElement, menuComponent.getElement(), RenderPosition.BEFOREEND);
// const siteMenuElement = siteMainElement.querySelector(`.main-navigation`);
renderElement(menuComponent.getElement(), new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
renderTemplate(menuComponent.getElement(), createStatsTemplate(), `beforeend`);

// рисует сортировку
renderTemplate(siteMainElement, createSortingTemplate(), `beforeend`);

// рисует список блоков фильмов
renderTemplate(siteMainElement, createBoardTemplate(), `beforeend`);
const boardElement = siteMainElement.querySelector(`.films`);

// рисует основной список фильмов
renderTemplate(boardElement, createFilmsListTemplate(), `beforeend`);
const filmsListElement = boardElement.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < Math.min(cards.length, FilmsCount.PER_STEP); i++) {
  renderTemplate(filmsListElement, createCardTemplate(cards[i]), `beforeend`);
}

if (cards.length > FilmsCount.PER_STEP) {
  let renderedCardCount = FilmsCount.PER_STEP;

  renderTemplate(filmsListElement, createShowMoreButton(), `afterend`);
  const showMoreButton = boardElement.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + FilmsCount.PER_STEP)
      .forEach((card) => renderTemplate(filmsListElement, createCardTemplate(card), `beforeend`));

    renderedCardCount += FilmsCount.PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}

// рисует дополнительные списки фильмов
renderTemplate(boardElement, createBestFilmsListTemplate(), `beforeend`);

const bestfilmsListElement = boardElement.querySelector(`.films-list--extra .films-list__container`);

const sortedByRatingsFilms = cards.slice().sort((a, b) => b.rating - a.rating);

for (let i = 0; i < FilmsCount.EXTRA; i++) {
  renderTemplate(bestfilmsListElement, createCardTemplate(sortedByRatingsFilms[i]), `beforeend`);
}

renderTemplate(boardElement, createCommentedFilmsListTemplate(), `beforeend`);
const commentedfilmsListElement = boardElement.querySelector(`.films-list--extra:last-of-type .films-list__container`);

const sortedByommentsFilms = cards.slice().sort((a, b) => b.comments.length - a.comments.length);

for (let i = 0; i < FilmsCount.EXTRA; i++) {
  renderTemplate(commentedfilmsListElement, createCardTemplate(sortedByommentsFilms[i]), `beforeend`);
}

// рисует счетчик фильмов в футере
const footerElement = document.querySelector(`.footer`);
const footerStatElement = footerElement.querySelector(`.footer__statistics`);
renderTemplate(footerStatElement, createFilmsCounterTemplate(cards), `beforeend`);

// рисует попап с дополнительной информацией о фильме
// renderTemplate(footerElement, createFilmDetailsCard(cards[0]), `afterend`);
