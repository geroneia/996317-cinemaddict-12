import moment from "moment";
import UserStatisticView from "../view/user-statistic.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {getCurrentDate, getEarliestDate, getOverallDuration} from "../utils/card.js";
import {DateInterval} from "../const.js";
import {generateUserRank, getWatchedFilmsCount} from "../utils/card.js";

const DAYS_TO_FULL_WEEK = 6;

export default class UserStatistic {
  constructor(userStatisticContainer, cards) {
    this._container = userStatisticContainer;
    this._cards = cards;
    this._currentDateInterval = DateInterval.ALL_TIME;

    this._statisticsComponent = null;

    this._dateIntervalChangeHandler = this._dateIntervalChangeHandler.bind(this);
  }

  init() {
    this._statisticsComponent = new UserStatisticView(this._getStatisticsData());

    this._statisticsComponent.setDateIntervalChangeHandler(this._dateIntervalChangeHandler);

    render(this._container, this._statisticsComponent, RenderPosition.BEFOREEND);
  }

  removeStatistics() {
    remove(this._statisticsComponent);
    this._statisticsComponent = null;
  }

  _getStatisticsData() {
    const filteredFilms = this._getWatchedFilms();
    const genresCounter = this._getGenresCounter(filteredFilms);
    const favoriteGenre = filteredFilms.length > 0 ? this._getFavoriteGenre(genresCounter) : ``;

    return {
      userRank: this._getUserRank(),
      dateInterval: this._currentDateInterval,
      genresCounter,
      watchedFilmsCount: filteredFilms.length,
      totalDuration: this._getTotalDuration(filteredFilms),
      favoriteGenre
    };
  }

  _dateIntervalChangeHandler(evt) {
    evt.preventDefault();
    if (this._currentDateInterval === evt.target.value) {
      return;
    }
    this._currentDateInterval = evt.target.value;

    this.removeStatistics();
    this.init();
  }

  _getListOfWatchedFilmsInDateRange(cards, dateFrom, dateTo) {
    return cards.filter((card) =>
      (moment(card.watchingDate).isSame(dateFrom) ||
    moment(card.watchingDate).isBetween(dateFrom, dateTo) ||
    moment(card.watchingDate).isSame(dateTo))
    );
  }

  _getWatchedFilms() {
    const watchedMovies = this._cards.filter((card) => card.isWatched);
    return this._getListOfWatchedFilmsInDateRange(watchedMovies, this._getDateFrom(), new Date());
  }

  _getGenresCount(genres) {
    const genresStorage = {};
    genres.forEach((genre) => {
      if (genresStorage[genre]) {
        genresStorage[genre] += 1;
      } else {
        genresStorage[genre] = 1;
      }
    });
    return genresStorage;
  }

  _getGenresCounter(cards) {
    return cards.length > 0 ? this._getGenresCount(cards.map(({genres}) => genres).reduce((a, b) => a.concat(b))) : null;
  }

  _getFavoriteGenre(genresCounter) {
    const counter = Math.max(...Object.values(genresCounter));
    let favoriteGenre = ``;
    for (let genre in genresCounter) {
      if (genresCounter[genre] === counter) {
        favoriteGenre = genre;
      }
    }

    return favoriteGenre;
  }

  _getUserRank() {
    return generateUserRank(getWatchedFilmsCount(this._cards));
  }

  _getTotalDuration(cards) {
    return getOverallDuration(cards);
  }

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
}
