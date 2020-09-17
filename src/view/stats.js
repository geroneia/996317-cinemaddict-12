import SmartView from "./smart.js";

export default class StatsTemplate extends SmartView {
  constructor(menuItem) {
    super();

    this._menuItem = menuItem;
  }

  getTemplate() {
    return `<a href="#stats" class="main-navigation__additional main-navigation__item--active">Stats</a>`;
  }

  removeActiveClass() {
    this.getElement().classList.remove(`main-navigation__item--active`);
  }

  addActiveClass() {
    this.getElement().classList.add(`main-navigation__item--active`);
  }
}
