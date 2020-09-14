import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

export default class SiteMenu extends AbstractView {
  constructor(menuItem) {
    super();

    this._menuItem = menuItem;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return `<nav class="main-navigation"></nav>`;
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
    // console.log(this._menuItem);
  }

  _menuClickHandler(evt, menuItem) {
    evt.preventDefault();
    if (evt.target.className === `main-navigation__additional`) {
      menuItem = MenuItem.STATS;
    }
    menuItem = MenuItem.MOVIES;

    this._callback.menuClick(menuItem);
  }
}
