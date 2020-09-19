import ProfileRatingView from "./view/profile-rating.js";
import SiteMenuView from "./view/site-menu.js";
import StatsView from "./view/stats.js";
import FilmsCounterView from "./view/films-counter.js";
import MoviesModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";

import {generateUserRank} from "./utils/card.js";
import MovieListPresenter from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import UserStatisticPresenter from "./presenter/user-statistic.js";
import {render, RenderPosition} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";

import Api from "./api.js";

const AUTHORIZATION = `Basic er3hgr8nv56890iml6gd8xv69a`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const commentInput = document.querySelector(`.film-details__comment-input`);

const cardsModel = new MoviesModel();
const commentsModel = new CommentsModel();

const filterModel = new FilterModel();

const menuComponent = new SiteMenuView();

const api = new Api(END_POINT, AUTHORIZATION);
api.getMovies()
  .then((movies) => {
    cardsModel.setCards(UpdateType.INIT, movies);

    // console.log(movies);
    // рисует звание пользователя на странице
    render(siteHeaderElement, new ProfileRatingView(generateUserRank(cardsModel.getCards())), RenderPosition.BEFOREEND);

    filterPresenter.init();
    movieListPresenter.init();
  })
  .catch(() => {
    cardsModel.setCards(UpdateType.INIT, []);


  });

// console.log(cardsModel.getCards);

// как получить массив всех комментов?
api.getComments(1).then((comments) => {
  commentsModel.set(UpdateType.INIT, comments);
  // console.log(comments);
});


// рисует меню
render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);

const statsSectionSwitcher = new StatsView();
render(menuComponent, statsSectionSwitcher, RenderPosition.BEFOREEND);

const userStatisticPresenter = new UserStatisticPresenter(siteMainElement, cardsModel.getCards());

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.MOVIES:
      statsSectionSwitcher.removeActive();
      userStatisticPresenter.removeStatistics();

      movieListPresenter.init();
      movieListPresenter.renderExtraFilmsLists();
      break;
    case MenuItem.STATS:
      statsSectionSwitcher.addActive();
      movieListPresenter.destroy();
      filterModel.set(UpdateType.DISABLED, FilterType.DISABLED);
      userStatisticPresenter.init();
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);
const filterPresenter = new FilterPresenter(menuComponent, filterModel, cardsModel);
const movieListPresenter = new MovieListPresenter(siteMainElement, footerElement, cardsModel, commentsModel, filterModel, commentInput, api);


movieListPresenter.renderFilmsListContainer();
movieListPresenter.renderExtraFilmsLists();

// рисует счетчик фильмов в футере
const footerStatElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatElement, new FilmsCounterView(cardsModel.getCards()), RenderPosition.BEFOREEND);

