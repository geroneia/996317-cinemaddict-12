import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  updateComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      update,
      ...this._comments.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, card, currentComments, update) {
    this._comments = [
      ...this._comments,
      update
    ];
    currentComments = [
      ...currentComments,
      update
    ];

    this._notify(updateType, card, currentComments);
  }

  deleteComment(updateType, card, currentComments, update) {
    const index = currentComments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    currentComments = [
      ...currentComments.slice(0, index),
      ...currentComments.slice(index + 1)
    ];

    this._notify(updateType, card, currentComments);
  }
}
