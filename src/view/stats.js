import AbstractView from "./abstract.js";

export default class StatsTemplate extends AbstractView {
  getTemplate() {
    return `<a href="#stats" class="main-navigation__additional">Stats</a>`;
  }
}
