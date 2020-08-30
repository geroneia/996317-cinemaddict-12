import SortingView from "../view/sorting.js";
import BoardView from "../view/board.js";
import FilmsListView from "../view/films-list.js";
import BestFilmsView from "../view/best-films-list.js";
import CommentedFilmsView from "../view/commented-films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import NoFilmsView from "../view/no-films.js";
import CardPresenter from "../presenter/card.js";
import {updateItem} from "../utils/common.js";

import {SortType} from "../view/sorting.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortByDate, sortByRating, sortByComments} from "../utils/card.js";

const FilmsCount = {
  PER_STEP: 5,
  EXTRA: 2
};

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedCardCount = FilmsCount.PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._cardPresenter = {};
    this._cardPresenterBestFilmsList = {};
    this._cardPresenterMostCommentedFilmsList = {};

    this._sortedByRatingsFilms = {};
    this._sortedByCommentsFilms = {};

    this._sortComponent = new SortingView();
    this._boardComponent = new BoardView();
    this._filmsListComponent = new FilmsListView();
    this._bestFilmsComponent = new BestFilmsView();
    this._commentedFilmsComponent = new CommentedFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noFilmsComponent = new NoFilmsView();

    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(movieCards) {
    this._renderSort();
    this._movieCards = movieCards.slice();
    this._sourcedMovieCards = movieCards.slice();

    if (movieCards.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderBoard();
  }

  _handleModeChange() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.resetView());

    Object
      .values(this._cardPresenterBestFilmsList)
      .forEach((presenter) => presenter.resetView());

    Object
      .values(this._cardPresenterMostCommentedFilmsList)
      .forEach((presenter) => presenter.resetView());
  }

  _handleCardChange(updatedCard) {
    // обновляет карточку в двух массивах (сортировка), после чего вызывает инициализацию презентера с новыми данными
    this._movieCards = updateItem(this._movieCards, updatedCard);
    this._sourcedMovieCards = updateItem(this._sourcedMovieCards, updatedCard);
    if (this._cardPresenter[updatedCard.id] !== undefined) {
      this._cardPresenter[updatedCard.id].init(updatedCard);
    }

    if (this._cardPresenterBestFilmsList[updatedCard.id] !== undefined) {
      this._cardPresenterBestFilmsList[updatedCard.id].init(updatedCard);
    }
    if (this._cardPresenterMostCommentedFilms[updatedCard.id] !== undefined) {
      this._cardPresenterMostCommentedFilms[updatedCard.id].init(updatedCard);
    }
  }

  _sortCards(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._movieCards.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this._movieCards.sort(sortByRating);
        break;
      default:
        this._movieCards = this._sourcedMovieCards.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortCards(sortType);
    this._clearFilmsListContainer();
    this._renderFilmsList(this._filmsListComponent.getElement().querySelector(`.films-list .films-list__container`));
  }

  _renderSort() {
    render(this._movieListContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderCard(container, movieCard) {
    const cardPresenter = new CardPresenter(container, this._handleCardChange, this._handleModeChange);
    cardPresenter.init(movieCard);
    this._cardPresenter[movieCard.id] = cardPresenter;
  }

  // Выводит в дополнительные списки карточки фильмов с помощью отдельного метода, чтобы
  // при удалении презентеров при сортировке их не приходилось рисовать заново
  _renderCardForBestFilmsList(container, movieCard) {
    const cardPresenterBestFilmsList = new CardPresenter(container, this._handleCardChange, this._handleModeChange);
    cardPresenterBestFilmsList.init(movieCard);
    this._cardPresenterBestFilmsList[movieCard.id] = cardPresenterBestFilmsList;
  }

  _renderCardForMostCommentedFilmsList(container, movieCard) {
    const cardPresenterMostCommentedFilmsList = new CardPresenter(container, this._handleCardChange, this._handleModeChange);
    cardPresenterMostCommentedFilmsList.init(movieCard);
    this._cardPresenterMostCommentedFilmsList[movieCard.id] = cardPresenterMostCommentedFilmsList;
  }

  _renderCards(container, from, to) {
    this._movieCards
    .slice(from, to)
    .forEach((movieCard) => this._renderCard(container, movieCard, this._handleModeChange));
  }

  _renderNoFilms() {
    render(this._movieListContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._filmsListComponent.getElement().querySelector(`.films-list .films-list__container`),
        this._renderedCardCount, this._renderedCardCount + FilmsCount.PER_STEP);
    this._renderedCardCount += FilmsCount.PER_STEP;
    if (this._renderedCardCount >= this._movieCards.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton(container) {
    render(container, this._showMoreButtonComponent, RenderPosition.AFTEREND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmsListContainer() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};
    this._renderedCardCount = FilmsCount.PER_STEP;
  }

  _renderFilmsListContainer() {
    render(this._boardComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    const filmsListContainer = this._filmsListComponent.getElement().querySelector(`.films-list .films-list__container`);
    this._renderFilmsList(filmsListContainer);
  }

  _renderFilmsList(container) {
    // рисует основной список фильмов
    this._renderCards(container, 0, Math.min(this._movieCards.length, this._renderedCardCount));

    if (this._movieCards.length > FilmsCount.PER_STEP) {
      this._renderShowMoreButton(container);
    }
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderBestFilmsList() {
    // рисует дополнительные списки фильмов
    render(this._boardComponent, this._bestFilmsComponent, RenderPosition.BEFOREEND);

    const bestfilmsListElement = this._boardComponent.getElement().querySelector(`.films-list--extra .films-list__container`);

    this._sortedByRatingsFilms = this._sourcedMovieCards.slice().sort(sortByRating);

    for (let i = 0; i < FilmsCount.EXTRA; i++) {
      this._renderCardForBestFilmsList(bestfilmsListElement, this._sortedByRatingsFilms[i]);
    }
  }

  _renderMostCommentedFilmsList() {
    render(this._boardComponent, this._commentedFilmsComponent, RenderPosition.BEFOREEND);

    const commentedFilmsListElement = this._boardComponent.getElement().querySelector(`.films-list--extra:last-of-type .films-list__container`);

    this._sortedByCommentsFilms = this._sourcedMovieCards.slice().sort(sortByComments);

    for (let i = 0; i < FilmsCount.EXTRA; i++) {
      this._renderCardForMostCommentedFilmsList(commentedFilmsListElement, this._sortedByCommentsFilms[i]);
    }
  }

  _renderBoard() {
    render(this._movieListContainer, this._boardComponent, RenderPosition.BEFOREEND);
    this._renderFilmsListContainer();
    this._renderBestFilmsList();
    this._renderMostCommentedFilmsList();
  }
}
