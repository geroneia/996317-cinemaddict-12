import AbstractView from "./abstract.js";

// разметка одного из фильтров
const createFilterItemTemplate = ({type, name, count}, currentType) => {
  const getUpperCaseForFirstLetter = () =>
    name[0].toUpperCase() + name.slice(1);
  return name !== `all movies` ? `<a href="#${name}" class="main-navigation__item ${type === currentType ? `main-navigation__item--active` : ``}" data-id="${type}">
  ${getUpperCaseForFirstLetter()} <span class="main-navigation__item-count">${count}</span></a>`
    : `<a href="#all" class="main-navigation__item ${type === currentType ? `main-navigation__item--active` : ``}" data-id="${type}">All movies</a>`;
};

// разметка фильтров
export const createFilterTemplate = (filterItems, currentType) => {
  const filterItemsTemplate = filterItems
  .map((filter) => createFilterItemTemplate(filter, currentType))
  .join(``);
  return `<div class="main-navigation__items">
          ${filterItemsTemplate}
        </div>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentType) {
    super();
    this._filters = filters;
    this._currentType = currentType;

    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentType);
  }

  setTypeChangeHandler(callback) {
    this._callback.typeChange = callback;
    this.getElement().addEventListener(`click`, this._typeChangeHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.typeChange(evt.target.dataset.id);
  }
}
