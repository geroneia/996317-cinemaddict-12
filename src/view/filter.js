import {createElement} from "../utils.js";

// разметка одного из фильтров
const createFilterItemTemplate = ({name, count}) => {
  const getUpperCaseForFirstLetter = () =>
    name[0].toUpperCase() + name.slice(1);
  return `<a href="#${name}" class="main-navigation__item">${getUpperCaseForFirstLetter()} <span class="main-navigation__item-count">${count}</span></a>`;
};

// разметка фильтров
export const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
  .map((filter, index) => createFilterItemTemplate(filter, index === 0))
  .join(``);
  return `<div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          ${filterItemsTemplate}
        </div>`;
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  remoneElement() {
    this._element = null;
  }
}
