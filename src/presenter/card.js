import CardView from "../view/card.js";
import FilmDetailsCardView from "../view/film-details-card.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Card {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._cardComponent = null;
    this._cardDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleShowMoreClick = this._handleShowMoreClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleCloseCardClick = this._handleCloseCardClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._footerComponent = document.querySelector(`.footer`);
  }

  init(card) {
    this._card = card;

    const prevCardComponent = this._cardComponent;
    const prevCardDetailsComponent = this._cardDetailsComponent;

    this._cardComponent = new CardView(card);
    this._cardDetailsComponent = new FilmDetailsCardView(card);

    // устанавливает обработчики
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._cardComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setClickHandler(this._handleShowMoreClick);

    if (prevCardComponent === null || prevCardDetailsComponent === null) {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._cardDetailsComponent, prevCardDetailsComponent);
    }

    remove(prevCardComponent);
    remove(prevCardDetailsComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._cardDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._cardDetailsComponent);
    }
  }

  _showFilmDetails() {
    // рисует попап с дополнительной информацией о фильме
    render(this._footerComponent, this._cardDetailsComponent, RenderPosition.AFTEREND);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._cardDetailsComponent.reset(this._card);
      remove(this._cardDetailsComponent);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              isFavorite: !this._card.isFavorite
            }
        )
    );
  }

  _handleAddToWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              isAddedToWatchlist: !this._card.isAddedToWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              isWatched: !this._card.isWatched
            }
        )
    );
  }

  _handleCloseCardClick() {
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    remove(this._cardDetailsComponent);
  }

  _handleShowMoreClick() {
    this._changeMode();
    this._mode = Mode.EDITING;
    this._showFilmDetails();

    this._cardDetailsComponent.setFavoriteLabelClickHandler(this._handleFavoriteClick);
    this._cardDetailsComponent.setAddToWatchlistLabelClickHandler(this._handleAddToWatchlistClick);
    this._cardDetailsComponent.setWatchedLabelClickHandler(this._handleWatchedClick);

    this._cardDetailsComponent.setClickHandler(this._handleCloseCardClick);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }
}
