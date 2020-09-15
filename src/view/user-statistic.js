import SmartView from "./smart.js";
import {generateUserRank} from "../mock/user";
import {getCurrentDate, getEarliestDate} from "../utils/card.js";
import {getOverallDuration} from "../utils/card.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {countWatchedFilmsInDateRange, makeItemsUniq, listOfWatchedFilmsInDateRange, getGenresCount} from "../utils/statistic.js";
import {DateInterval} from "../const.js";

const DAYS_TO_FULL_WEEK = 6;
// import {Genre} from "../const.js";

const renderGenresChart = (genresCtx, cards, dateFrom, dateTo) => {
  console.log(listOfWatchedFilmsInDateRange(cards, dateFrom, dateTo));
  const sortedCards = listOfWatchedFilmsInDateRange(cards, dateFrom, dateTo);
  const cardGenres = sortedCards.map(({genres}) => genres).reduce((a, b) => a.concat(b)
  );
  const uniqGenres = makeItemsUniq(cardGenres);
  const genresCounter = getGenresCount(cardGenres);

  const BAR_HEIGHT = 50;

  genresCtx.style.height = `${BAR_HEIGHT * uniqGenres.length}`;

  return new Chart(genresCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(genresCounter),
      datasets: [{
        data: Object.values(genresCounter),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsTemplate = (allCards, {cards, dateFrom, dateTo}) => {
  const watchedFilmsCount = countWatchedFilmsInDateRange(cards, dateFrom, dateTo);
  console.log(watchedFilmsCount);
  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${generateUserRank(allCards)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmsCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getOverallDuration(cards)}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Sci-Fi</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class UserStatistic extends SmartView {
  constructor(cards) {
    super();
    this._cards = cards;
    this._dateInterval = DateInterval.ALL_TIME;

    this._countedCards = {
      cards,
      dateFrom: this._getDateFrom(),
      dateTo: getCurrentDate()
    };

    this._genresChart = null;

    this._dateIntervalChangeHandler = this._dateIntervalChangeHandler.bind(this);

    this._setCharts();
    this.setDateIntervalChangeHandler();
  }

  removeElement() {
    super.removeElement();

    if (this._genresChart !== null) {
      this._genresChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._cards, this._countedCards);
  }

  _dateIntervalChangeHandler(evt) {
    evt.preventDefault();
    if (this._dateInterval === evt.target.value) {
      return;
    }
    this._dateInterval = evt.target.value;
    this._countedCards.dateFrom = this._getDateFrom();
    this._setCharts();
  }

  setDateIntervalChangeHandler() {
    this.getElement().addEventListener(`change`, this._dateIntervalChangeHandler);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _getDateFrom() {
    let date = getCurrentDate();
    switch (this._dateInterval) {
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

    const genresCtx = this.getElement().querySelector(`.statistic__chart`);

    this._genresChart = renderGenresChart(genresCtx, cards, dateFrom, dateTo);
  }
}
