import MovieView from "../view/movie.js";
import CommentsModel from "../model/comments.js";
import FilmDetailsCardView from "../view/film-details-card.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {shake} from "../utils/card.js";
import {UserAction, UpdateType} from "../const.js";

import he from "he";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Movie {
  constructor(container, popupContainer, changeData, changeMode, api) {
    this._container = container;
    this._popupContainer = popupContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;


    this._cardComponent = null;
    this._cardDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this.commentsModel = new CommentsModel();

    this._handleShowMoreClick = this._handleShowMoreClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleCloseCardClick = this._handleCloseCardClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(card) {
    this._card = card;

    const prevCardComponent = this._cardComponent;
    const prevCardDetailsComponent = this._cardDetailsComponent;

    this._cardComponent = new MovieView(card);

    this._api.getComments(card.id)
    .then((comments) => {
      this.commentsModel.set(comments);
      this._cardDetailsComponent = new FilmDetailsCardView(card, comments);
      this._cardComponent.setClickHandler(this._handleShowMoreClick);

      this._cardDetailsComponent.setFavoriteLabelClickHandler(this._handleFavoriteClick);
      this._cardDetailsComponent.setAddToWatchlistLabelClickHandler(this._handleAddToWatchlistClick);
      this._cardDetailsComponent.setWatchedLabelClickHandler(this._handleWatchedClick);
      this._cardDetailsComponent.setClickHandler(this._handleCloseCardClick);
      this._cardDetailsComponent.setDeleteClickHandler(this._handleDeleteClick);
      document.addEventListener(`keydown`, this._handleFormSubmit);

      if (this._mode === Mode.EDITING) {
        replace(this._cardDetailsComponent, prevCardDetailsComponent);
        remove(prevCardDetailsComponent);
      }
    });

    // устанавливает обработчики
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._cardComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);

    if (prevCardComponent === null) {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    } else {
      replace(this._cardComponent, prevCardComponent);
    }

    remove(prevCardComponent);
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
        this._mode === Mode.DEFAULT ? UpdateType.MINOR
          : UpdateType.PATCH,
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
        UserAction.UPDATE_CARD,
        this._mode === Mode.DEFAULT ? UpdateType.MINOR
          : UpdateType.PATCH,
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
        UserAction.UPDATE_CARD,
        this._mode === Mode.DEFAULT ? UpdateType.MINOR
          : UpdateType.PATCH,
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
    this._changeData(
        UserAction.UPDATE_CARD,
        UpdateType.MINOR,
        this._card
    );
    remove(this._cardDetailsComponent);
  }

  _handleShowMoreClick() {
    this._changeMode();
    this._showFilmDetails();
    this._mode = Mode.EDITING;

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleDeleteClick(deletedCommentId, onErrorCallback) {
    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.PATCH,
        this._card,
        deletedCommentId,
        onErrorCallback
    );
  }

  _handleFormSubmit(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === `Enter`) {
      evt.preventDefault();
      const emoji = this._cardDetailsComponent.getEmoji();
      const message = this._cardDetailsComponent.getMessage();
      if (emoji !== `` && message !== ``) {
        const addedComment = {
          message: he.encode(message),
          emoji,
          currentDate: new Date()
        };
        this._cardDetailsComponent.blockTextInput();

        const onErrorCallback = () => {
          this._cardDetailsComponent.unBlockTextInput();
          shake(this._cardDetailsComponent.getElement());
        };

        this._changeData(
            UserAction.ADD_COMMENT,
            UpdateType.PATCH,
            this._card,
            addedComment,
            onErrorCallback
        );
      }
      this._cardDetailsComponent.clearCommentForm();

    }
  }
}
