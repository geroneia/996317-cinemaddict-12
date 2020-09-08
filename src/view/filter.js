import AbstractView from "./abstract.js";

// разметка одного из фильтров
const createFilterItemTemplate = ({type, name, count}, currentFilterType) => {
  const getUpperCaseForFirstLetter = () =>
    name[0].toUpperCase() + name.slice(1);
  return name !== `all movies` ? `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-id="${type}">
  ${getUpperCaseForFirstLetter()} <span class="main-navigation__item-count">${count}</span></a>`
    : `<a href="#all" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-id="${type}">All movies</a>`;
};

// разметка фильтров
export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
  .map((filter) => createFilterItemTemplate(filter, currentFilterType))
  .join(``);
  return `<div class="main-navigation__items">
          ${filterItemsTemplate}
        </div>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.id);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
