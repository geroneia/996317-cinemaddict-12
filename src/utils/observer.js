export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  _notify(event, payloadA, payloadB) {
    this._observers.forEach((observer) => observer(event, payloadA, payloadB));
  }
}
