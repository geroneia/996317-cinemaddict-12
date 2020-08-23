import BoardView from "../view/board.js";
import FilmsListView from "../view/films-list.js";
import BestFilmsView from "../view/best-films-list.js";
import CommentedFilmsView from "../view/commented-films-list.js";
import CardView from "../view/card.js";
import FilmDetailsCardView from "../view/film-details-card.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import NoFilmsView from "../view/no-films.js";

import {render, RenderPosition, remove} from "../utils/render.js";

const FilmsCount = {
  PER_STEP: 5,
  EXTRA: 2
};

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._boardComponent = new BoardView();
    this._filmsListComponent = new FilmsListView();
    this._bestFilmsComponent = new BestFilmsView();
    this._commentedFilmsComponent = new CommentedFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noFilmsComponent = new NoFilmsView();
  }

  init(movieCards) {
    this._movieCards = movieCards.slice();
    if (movieCards.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderBoard();
  }

  _renderCard(container, movieCard) {
    const cardComponent = new CardView(movieCard);
    const cardDetailsComponent = new FilmDetailsCardView(movieCard);


    const showFilmDetails = () => {
      // рисует попап с дополнительной информацией о фильме
      const footerElement = document.querySelector(`.footer`);
      render(footerElement, cardDetailsComponent, RenderPosition.AFTEREND);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        remove(cardDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onCrossButtonClick = () => {
      remove(cardDetailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onCardClick = () => {
      showFilmDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
      cardDetailsComponent.setClickHandler(onCrossButtonClick);
    };

    cardComponent.setClickHandler(onCardClick);

    render(container, cardComponent, RenderPosition.BEFOREEND);
  }


  _renderCards(container, from, to) {
    this._movieCards
    .slice(from, to)
    .forEach((movieCard) => this._renderCard(container, movieCard));
  }

  _renderNoFilms() {
    render(this._movieListContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton(container) {
    let renderedCardCount = FilmsCount.PER_STEP;
    const showMoreButtonComponent = new ShowMoreButtonView();
    render(container, showMoreButtonComponent, RenderPosition.AFTEREND);
    showMoreButtonComponent.setClickHandler(() => {
      this._movieCards
      .slice(renderedCardCount, renderedCardCount + FilmsCount.PER_STEP)
      .forEach((movieCard) => this._renderCard(container, movieCard));

      renderedCardCount += FilmsCount.PER_STEP;

      if (renderedCardCount >= this._movieCards.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  _renderFilmsList() {
    // рисует основной список фильмов
    render(this._boardComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    const filmsListContainer = this._boardComponent.getElement().querySelector(`.films-list .films-list__container`);
    this._renderCards(filmsListContainer, 0, Math.min(this._movieCards.length, FilmsCount.PER_STEP));

    if (this._movieCards.length > FilmsCount.PER_STEP) {
      this._renderShowMoreButton(filmsListContainer);
    }
  }

  _renderBestFilmsList() {
    // рисует дополнительные списки фильмов
    render(this._boardComponent, this._bestFilmsComponent, RenderPosition.BEFOREEND);

    const bestfilmsListElement = this._boardComponent.getElement().querySelector(`.films-list--extra .films-list__container`);

    const sortedByRatingsFilms = this._movieCards.slice().sort((a, b) => b.rating - a.rating);

    for (let i = 0; i < FilmsCount.EXTRA; i++) {
      this._renderCard(bestfilmsListElement, sortedByRatingsFilms[i]);
    }
  }

  _renderMostCommentedFilmsList() {
    render(this._boardComponent, new CommentedFilmsView(), RenderPosition.BEFOREEND);
    const commentedFilmsListElement = this._boardComponent.getElement().querySelector(`.films-list--extra:last-of-type .films-list__container`);

    const sortedByCommentsFilms = this._movieCards.slice().sort((a, b) => b.comments.length - a.comments.length);

    for (let i = 0; i < FilmsCount.EXTRA; i++) {
      this._renderCard(commentedFilmsListElement, sortedByCommentsFilms[i]);
    }
  }

  _renderBoard() {
    render(this._movieListContainer, this._boardComponent, RenderPosition.BEFOREEND);
    this._renderFilmsList();
    this._renderBestFilmsList();
    this._renderMostCommentedFilmsList();
  }
}
