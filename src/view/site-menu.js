import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuItem = ``;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return `<nav class="main-navigation"><a href="#stats" class="main-navigation__additional">Stats</a></nav>`;
  }

  removeActive() {
    this.getElement().classList.remove(`main-navigation__item--active`);
  }

  addActive() {
    this.getElement().classList.add(`main-navigation__item--active`);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  _menuClickHandler(evt) {
    const clickedItem = evt.target.tagName === `A` ? evt.target : evt.target.closest(`a`);

    if (clickedItem.classList.contains(`main-navigation__item--active`)
    || ((clickedItem.classList.contains(`main-navigation__item`)
    && this._menuItem === MenuItem.MOVIES))) {

      return;
    }

    if (clickedItem.classList.contains(`main-navigation__additional`)) {
      this._menuItem = MenuItem.STATS;

    } else if (clickedItem.classList.contains(`main-navigation__item`) && this._menuItem !== ``) {
      this._menuItem = MenuItem.MOVIES;
    }

    this._callback.menuClick(this._menuItem);
  }
}
