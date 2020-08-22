import AbstractView from "./abstract.js";

export default class SiteMenu extends AbstractView {
  getTemplate() {
    return `<nav class="main-navigation"></nav>`;
  }
}
