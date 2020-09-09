import FilmDetailsCard from "../view/film-details-card.js";
import {generateId} from "../mock/film.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class CommentNew {
  constructor(popupContainer, card, comments, changeData) {
    this._popupContainer = popupContainer;
    this._card = card;
    this._comments = comments;
    this._changeData = changeData;

    this._cardDetailsComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._cardDetailsComponent !== null) {
      return;
    }

    this._cardDetailsComponent = new FilmDetailsCard();
    this._cardDetailsComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._cardDetailsComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._popupContainer, this._cardDetailsComponent, RenderPosition.AFTEREND);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._cardDetailsComponent === null) {
      return;
    }

    remove(this._cardDetailsComponent);
    this._cardDetailsComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(card, comments, changeData) {
    this._changeData(
        UserAction.ADD_TASK,
        UpdateType.MINOR,
        card,
        comments,

        Object.assign({id: generateId()}, changeData)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
