import Observer from "../utils/observer.js";

export default class Movies extends Observer {
  constructor() {
    super();
    this._cards = {};
  }

  setCards(cards) {
    this._cards = cards.slice();
  }

  getCards() {
    return this._cards;
  }

  updateCard(updateType, update, comments) {
    const indexOfCard = this._cards.findIndex((card) => card.id === update.id);

    if (indexOfCard === -1) {
      throw new Error(`Can't update unexisting card`);
    }

    this._cards = [
      ...this._cards.slice(0, indexOfCard),
      update,
      ...this._cards.slice(indexOfCard + 1)
    ];

    this._notify(updateType, update, comments);
  }
}
