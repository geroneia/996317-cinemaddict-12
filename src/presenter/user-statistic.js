import UserStatisticView from "../view/user-statistic.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {listOfWatchedFilmsInDateRange} from "../utils/statistic.js";
import {getCurrentDate, getEarliestDate} from "../utils/card.js";
import {DateInterval} from "../const.js";


const DAYS_TO_FULL_WEEK = 6;

export default class UserStatistic {
  constructor(userStatisticContainer, cards) {
    this._container = userStatisticContainer;
    this._cards = cards;
    this._currentDateInterval = DateInterval.ALL_TIME;
    this._countedCards = {
      cards,
      dateFrom: this._getDateFrom(),
      dateTo: getCurrentDate()
    };
    this._component = null;

    this._genresChart = null;

    this._dateIntervalChangeHandler = this._dateIntervalChangeHandler.bind(this);
    // this.setDateIntervalChangeHandler = this.setDateIntervalChangeHandler.bind(this);
  }

  init() {
    // this._dateInterval = this._currentDateInterval;

    const previousComponent = this._component;

    this._component = new UserStatisticView(this._cards, this._countedCards, this._currentDateInterval);


    if (previousComponent === null) {
      render(this._container, this._component, RenderPosition.BEFOREEND);

      this._setCharts();
      this.setDateIntervalChangeHandler();

      return;
    }
    replace(this._component, previousComponent);
    remove(previousComponent);
  }

  _dateIntervalChangeHandler(evt) {
    evt.preventDefault();
    if (this._currentDateInterval === evt.target.value) {
      return;
    }
    this._currentDateInterval = evt.target.value;

    remove(this._component);
    render(this._container, this._component, RenderPosition.BEFOREEND);
    this.restoreHandlers();

    // console.log(evt.target);
    this._countedCards.dateFrom = this._getDateFrom();
    this._countedCards.cards = listOfWatchedFilmsInDateRange(this._cards, this._countedCards.dateFrom, this._countedCards.dateTo);

    // this._callback.changeIntervalClick(this._cards, this._countedCards);
    if (this._countedCards.cards.length !== 0) {
      this._setCharts();


    }
  }

  setDateIntervalChangeHandler() {
    // this._callback.changeIntervalClick = callback;
    this._component.getElement().addEventListener(`change`, this._dateIntervalChangeHandler);
  }

  restoreHandlers() {
    this.setDateIntervalChangeHandler();
    this._setCharts();
  }

  // handleDateIntervalClick() {
  //   remove(this._component);
  //   render(this._container, this._component, RenderPosition.BEFOREEND);
  //   this._component.restoreHandlers();
  // }

  _getDateFrom() {
    let date = getCurrentDate();
    switch (this._currentDateInterval) {
      case DateInterval.ALL_TIME :
        date = getEarliestDate();
        break;
      case DateInterval.WEEK :
        date.setDate(date.getDate() - DAYS_TO_FULL_WEEK);
        break;
      case DateInterval.MONTH :
        date.setMonth(date.getMonth() - 1);
        break;
      case DateInterval.YEAR :
        date.setFullYear(date.getFullYear() - 1);
        break;
    }
    return date;
  }

  _setCharts() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }

    const {cards, dateFrom, dateTo} = this._countedCards;

    const genresCtx = this._component.getElement().querySelector(`.statistic__chart`);

    this._genresChart = this._component.renderGenresChart(genresCtx, cards, dateFrom, dateTo);
  }

}
