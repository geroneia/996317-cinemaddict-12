import ProfileRatingView from "./view/profile-rating.js";
import SiteMenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import StatsTemplateView from "./view/stats.js";
import FilmsCounterView from "./view/films-counter.js";
import CardsModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";

import {generateCard} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateUserRank} from "./mock/user.js";
import MovieListPresenter from "./presenter/movie-list.js";
import {render, RenderPosition} from "./utils/render.js";

const FilmsCount = {
  PER_STEP: 5,
  TOTAL: 25,
  EXTRA: 2
};

// собирает в массив результаты вызова функции, генерирующей случайную карточку фильма
const cards = new Array(FilmsCount.TOTAL).fill(``).map(generateCard);

// собирает фильтры из массива карточек
const filters = generateFilter(cards);

const cardsModel = new CardsModel();
cardsModel.setCards(cards);

// const commentsModel = new CommentsModel();
// commentsModel.setComments(comments);

const siteHeaderElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);

// рисует звание пользователя на странице
render(siteHeaderElement, new ProfileRatingView(generateUserRank(cards)), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);

// рисует меню
const menuComponent = new SiteMenuView();
render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);

render(menuComponent, new FilterView(filters), RenderPosition.BEFOREEND);
render(menuComponent, new StatsTemplateView(), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(siteMainElement, footerElement, cardsModel);

movieListPresenter.init();

// рисует счетчик фильмов в футере
const footerStatElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatElement, new FilmsCounterView(cards), RenderPosition.BEFOREEND);

