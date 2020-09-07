import SortingView from "../view/sorting.js";
import BoardView from "../view/board.js";
import FilmsListView from "../view/films-list.js";
import BestFilmsView from "../view/best-films-list.js";
import CommentedFilmsView from "../view/commented-films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import NoFilmsView from "../view/no-films.js";
import CardPresenter from "../presenter/card.js";
// import {updateItem} from "../utils/common.js";

import {SortType} from "../view/sorting.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortByDate, sortByRating, sortByComments} from "../utils/card.js";

const FilmsCount = {
  PER_STEP: 5,
  EXTRA: 2
};

export default class MovieList {
  constructor(movieListContainer, popupContainer, cardsModel, commentsModel) {
    this._movieListContainer = movieListContainer;
    this._popupContainer = popupContainer;
    this._cardsModel = cardsModel;
    this._commentsModel = commentsModel;
    this._renderedCardCount = FilmsCount.PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._cardPresenterCommonFilmsList = {};
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

  init() {
    this._renderSort();

    if (this._getCards().length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderBoard();
  }

  _getCards() {
    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return this._cardsModel.getCards().slice().sort(sortByDate);
      case SortType.BY_RATING:
        return this._cardsModel.getCards().slice().sort(sortByRating);
    }
    return this._cardsModel.getCards();
  }

  _handleModeChange() {
    [
      ...Object.values(this._cardPresenterCommonFilmsList),
      ...Object.values(this._cardPresenterBestFilmsList),
      ...Object.values(this._cardPresenterMostCommentedFilmsList)
    ].forEach((presenter) => presenter.resetView());
  }

  _handleCardChange(updatedCard, commentsList) {
    // Здесь будем вызывать обновление модели
    this._updatePresenter(this._cardPresenterCommonFilmsList, updatedCard, commentsList);
    this._updatePresenter(this._cardPresenterBestFilmsList, updatedCard, commentsList);
    this._updatePresenter(this._cardPresenterMostCommentedFilmsList, updatedCard, commentsList);
  }

  _updatePresenter(presenters, updatedCard, commentsList) {
    if (presenters[updatedCard.id] !== undefined) {
      presenters[updatedCard.id].init(updatedCard, commentsList);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmsListContainer();
    this._renderFilmsList(this._filmsListComponent.getElement().querySelector(`.films-list .films-list__container`));
  }

  _renderSort() {
    render(this._movieListContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderCard(container, movieCard, commentsList, presenterStore) {
    // фильтрует массив комментариев, отбирая те, которые проходят проверку на то,
    // что массив ID в карточке содержит ID комментария в массиве комментариев
    const comments = commentsList.filter(({id}) => movieCard.comments.includes(id));
    const cardPresenter = new CardPresenter(container, this._popupContainer, this._handleCardChange, this._handleModeChange);
    cardPresenter.init(movieCard, comments);
    presenterStore[movieCard.id] = cardPresenter;
  }

  _renderCards(container, cards, commentsList) {
    cards.forEach((card) => this._renderCard(container, card, commentsList, this._cardPresenterCommonFilmsList));
  }

  _renderNoFilms() {
    render(this._movieListContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {

    this._renderedCardCount += FilmsCount.PER_STEP;

    const cardCount = this._getCards().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderedCardCount + FilmsCount.PER_STEP);
    const cards = this._getCards().slice(this._renderedCardCount, newRenderedCardCount);

    this._renderCards(this._filmsListComponent.getElement().querySelector(`.films-list .films-list__container`), cards);
    this._renderedCardCount = newRenderedCardCount;

    if (this._renderedCardCount >= cardCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton(container) {
    render(container, this._showMoreButtonComponent, RenderPosition.AFTEREND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmsListContainer() {
    Object
      .values(this._cardPresenterCommonFilmsList)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenterCommonFilmsList = {};
    this._renderedCardCount = FilmsCount.PER_STEP;
  }

  _renderFilmsListContainer() {
    render(this._boardComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    const filmsListContainer = this._filmsListComponent.getElement().querySelector(`.films-list .films-list__container`);
    this._renderFilmsList(filmsListContainer);
  }

  _renderFilmsList(container) {
    // рисует основной список фильмов
    const cardCount = this._getCards().length;
    const cards = this._getCards().slice(0, Math.min(cardCount, FilmsCount.PER_STEP));
    const commentsList = this._commentsModel.getComments().slice();

    this._renderCards(container, cards, commentsList);

    if (cardCount > FilmsCount.PER_STEP) {
      this._renderShowMoreButton(container);
    }
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderBestFilmsList() {
    // рисует дополнительные списки фильмов
    render(this._boardComponent, this._bestFilmsComponent, RenderPosition.BEFOREEND);

    const bestFilmsListElement = this._boardComponent.getElement().querySelector(`.films-list--extra .films-list__container`);

    this._sortedByRatingsFilms = this._cardsModel.getCards().slice().sort(sortByRating);

    this._commentsList = this._commentsModel.getComments().slice();

    for (let i = 0; i < FilmsCount.EXTRA; i++) {
      this._renderCard(bestFilmsListElement, this._sortedByRatingsFilms[i], this._commentsList, this._cardPresenterBestFilmsList);
    }
  }

  _renderMostCommentedFilmsList() {
    render(this._boardComponent, this._commentedFilmsComponent, RenderPosition.BEFOREEND);

    const commentedFilmsListElement = this._boardComponent.getElement().querySelector(`.films-list--extra:last-of-type .films-list__container`);

    this._sortedByCommentsFilms = this._cardsModel.getCards().slice().sort(sortByComments);

    this._commentsList = this._commentsModel.getComments().slice();

    for (let i = 0; i < FilmsCount.EXTRA; i++) {
      this._renderCard(commentedFilmsListElement, this._sortedByCommentsFilms[i], this._commentsList, this._cardPresenterMostCommentedFilmsList);
    }
  }

  _renderBoard() {
    render(this._movieListContainer, this._boardComponent, RenderPosition.BEFOREEND);
    this._renderFilmsListContainer();
    this._renderBestFilmsList();
    this._renderMostCommentedFilmsList();
  }
}
