import FilterView from "../view/filter.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, cardsModel) {
    this._container = filterContainer;
    this._model = filterModel;
    this._cardsModel = cardsModel;
    this._currentType = null;

    this._component = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);

    this._cardsModel.addObserver(this._handleModelEvent);
    this._model.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentType = this._model.get();

    const filters = this._get();
    const prevFilterComponent = this._component;

    this._component = new FilterView(filters, this._currentType);
    this._component.setTypeChangeHandler(this._handleTypeChange);

    if (prevFilterComponent === null) {
      render(this._container, this._component, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._component, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleTypeChange(filterType) {
    if (this._currentType === filterType) {
      return;
    }

    this._model.set(UpdateType.MAJOR, filterType);
  }

  _get() {
    const cards = this._cardsModel.getCards();

    return [
      {
        type: FilterType.ALL_MOVIES,
        name: `all movies`,
        count: filter[FilterType.ALL_MOVIES](cards).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `watchlist`,
        count: filter[FilterType.WATCHLIST](cards).length
      },
      {
        type: FilterType.HISTORY,
        name: `history`,
        count: filter[FilterType.HISTORY](cards).length
      },
      {
        type: FilterType.FAVORITES,
        name: `favorites`,
        count: filter[FilterType.FAVORITES](cards).length
      }
    ];
  }
}
