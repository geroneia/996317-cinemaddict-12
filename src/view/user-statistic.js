import SmartView from "./smart.js";
import {generateUserRank} from "../mock/user";
import {getCurrentDate} from "../utils/card.js";
import {getOverallDuration} from "../utils/card.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {countWatchedFilmsInDateRange, makeItemsUniq, countCardsByGenre} from "../utils/statistic.js";
// import {Genre} from "../const.js";

const renderGenresChart = (genresCtx, cards) => {
  let cardGenres = cards.map((card) => card.genres);
  cardGenres = cardGenres.reduce((a, b) => a.concat(b)
  );

  const uniqGenres = makeItemsUniq(cardGenres);
  const cardByGenresCounts = uniqGenres.map((genre) => countCardsByGenre(cards, genre));
  const BAR_HEIGHT = 50;

  genresCtx.style.height = `${BAR_HEIGHT * uniqGenres}`;

  return new Chart(genresCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqGenres,
      datasets: [{
        data: cardByGenresCounts,
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
    this._countedCards = {
      cards,
      dateFrom: (() => {
        const daysToFullWeek = 6;
        const date = getCurrentDate();
        date.setDate(date.getDate() - daysToFullWeek);
        return date;
      })(),
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
    // console.log(evt.target.value);
    this.getElement().querySelector(`[value=${evt.target.value}]`).checked = true;
  }

  setDateIntervalChangeHandler() {
    this.getElement().addEventListener(`change`, this._dateIntervalChangeHandler);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _dateChangeHandler([dateFrom, dateTo]) {
    if (!dateFrom || !dateTo) {
      return;
    }

    this.updateCountedCards({
      dateFrom,
      dateTo
    });
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
