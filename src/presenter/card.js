import CardView from "../view/card.js";
import FilmDetailsCardView from "../view/film-details-card.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Card {
  constructor(container, popupContainer, changeData, changeMode) {
    this._container = container;
    this._popupContainer = popupContainer;
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

  init(card, comments) {
    this._card = card;
    this._comments = comments;

    const prevCardComponent = this._cardComponent;
    const prevCardDetailsComponent = this._cardDetailsComponent;

    this._cardComponent = new CardView(card, comments);
    this._cardDetailsComponent = new FilmDetailsCardView(card, comments);

    // устанавливает обработчики
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._cardComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setClickHandler(this._handleShowMoreClick);

    this._cardDetailsComponent.setFavoriteLabelClickHandler(this._handleFavoriteClick);
    this._cardDetailsComponent.setAddToWatchlistLabelClickHandler(this._handleAddToWatchlistClick);
    this._cardDetailsComponent.setWatchedLabelClickHandler(this._handleWatchedClick);
    this._cardDetailsComponent.setClickHandler(this._handleCloseCardClick);
    this._cardDetailsComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevCardComponent === null) {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    } else {
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
    // восстанавливает обработчики при повторном открытии того же попапа (без init)
    this._cardDetailsComponent.restoreHandlers();
    // рисует попап с дополнительной информацией о фильме
    render(this._popupContainer, this._cardDetailsComponent, RenderPosition.AFTEREND);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._mode = Mode.DEFAULT;
      evt.preventDefault();
      this._cardDetailsComponent.reset(this._card);
      remove(this._cardDetailsComponent);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_CARD,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._card,
            {
              isFavorite: !this._card.isFavorite
            }
        ),
        this._comments
    );
  }

  _handleAddToWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_CARD,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._card,
            {
              isAddedToWatchlist: !this._card.isAddedToWatchlist
            }
        ),
        this._comments
    );
  }

  _handleWatchedClick() {
    this._changeData(
        UserAction.UPDATE_CARD,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._card,
            {
              isWatched: !this._card.isWatched
            }
        ),
        this._comments
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

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleDeleteClick(card, deletedComment) {
    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.PATCH,
        this._card,
        this._comments,
        deletedComment
    );
  }
}
