import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuItem = ``;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return `<nav class="main-navigation"></nav>`;
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.className === `main-navigation__additional`) {
      this._menuItem = MenuItem.STATS;
    } else if (evt.target.className === `main-navigation__item `) {
      this._menuItem = MenuItem.MOVIES;
    }
    this._callback.menuClick(this._menuItem);
  }
}
