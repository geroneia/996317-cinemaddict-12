import SmartView from "./smart.js";
import {MenuItem} from "../const.js";

export default class StatsTemplate extends SmartView {
  constructor(menuItem) {
    super();

    this._menuItem = menuItem;
  }

  getTemplate() {
    return `<a href="#stats" class="main-navigation__additional ${this._menuItem === MenuItem.STATS ? `main-navigation__item--active` : ``}">Stats</a>`;
  }
}
