import SmartView from "./smart.js";

export default class Stats extends SmartView {
  getTemplate() {
    return `<a href="#stats" class="main-navigation__additional">Stats</a>`;
  }

  removeActive() {
    this.getElement().classList.remove(`main-navigation__item--active`);
  }

  addActive() {
    this.getElement().classList.add(`main-navigation__item--active`);
  }
}
