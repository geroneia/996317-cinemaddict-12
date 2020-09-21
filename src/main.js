import ProfileRatingView from "./view/profile-rating.js";
import SiteMenuView from "./view/site-menu.js";
import StatsView from "./view/stats.js";
import FilmsCounterView from "./view/films-counter.js";
import MoviesModel from "./model/movies.js";
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
const footerStatElement = footerElement.querySelector(`.footer__statistics`);

const cardsModel = new MoviesModel();

const filterModel = new FilterModel();

const menuComponent = new SiteMenuView();

const statsSectionSwitcher = new StatsView();

const api = new Api(END_POINT, AUTHORIZATION);

api.getMovies()
  .then((movies) => {
    cardsModel.setCards(UpdateType.INIT, movies);

    // console.log(movies);
    // рисует звание пользователя на странице
    render(siteHeaderElement, new ProfileRatingView(generateUserRank(cardsModel.getCards())), RenderPosition.BEFOREEND);

    filterPresenter.init();
    movieListPresenter.init();
    movieListPresenter.renderFilmsListContainer();
    movieListPresenter.renderExtraFilmsLists();

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
    // рисует счетчик фильмов в футере
    render(footerStatElement, new FilmsCounterView(cardsModel.getCards()), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    cardsModel.setCards(UpdateType.INIT, []);


  });

// рисует меню
render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);

render(menuComponent, statsSectionSwitcher, RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(menuComponent, filterModel, cardsModel);
const movieListPresenter = new MovieListPresenter(siteMainElement, footerElement, cardsModel, filterModel, api, commentInput);
