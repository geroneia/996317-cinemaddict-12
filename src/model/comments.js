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

    delete adaptedItem.name;
    delete adaptedItem.message;
    delete adaptedItem.currentDate;
    delete adaptedItem.emoji;

    return adaptedItem;
  }
}
