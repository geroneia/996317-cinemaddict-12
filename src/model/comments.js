import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  set(items) {
    this._items = items.slice();

    // this._notify(updateType);
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

  add(updateType, card, currentItems) {

    this._notify(updateType, card, currentItems);
  }

  delete(updateType, card, currentItems, update) {
    const index = currentItems.findIndex((item) => item.id === update);

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

  static adaptToClient(item) {
    const adaptedItem = Object.assign(
        {},
        item,
        {
          message: item.comment,
          emoji: item.emotion,
          name: item.author,
          currentDate: item.date
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedItem.comment;
    delete adaptedItem.emotion;
    delete adaptedItem.author;
    delete adaptedItem.date;

    return adaptedItem;
  }

  static adaptToServer(item) {
    const adaptedItem = Object.assign(
        {},
        item,
        {
          "author": item.name,
          "comment": item.message,
          "date": item.currentDate,
          "emotion": item.emoji
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedItem.name;
    delete adaptedItem.message;
    delete adaptedItem.currentDate;
    delete adaptedItem.emoji;

    return adaptedItem;
  }
}
