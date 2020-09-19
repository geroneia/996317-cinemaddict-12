import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  set(items) {
    this._items = items.slice();
  }

  get() {
    return this._items;
  }

  update(updateType, update) {
    const index = this._items.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting comment`);
    }

    this._items = [
      ...this._items.slice(0, index),
      update,
      ...this._items.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  add(updateType, card, currentItems, update) {
    this._items = [
      ...this._items,
      update
    ];
    currentItems = [
      ...currentItems,
      update
    ];

    this._notify(updateType, card, currentItems);
  }

  delete(updateType, card, currentItems, update) {
    const index = currentItems.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._items = [
      ...this._items.slice(0, index),
      ...this._items.slice(index + 1)
    ];

    currentItems = [
      ...currentItems.slice(0, index),
      ...currentItems.slice(index + 1)
    ];

    this._notify(updateType, card, currentItems);
  }
}
