import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {DateInterval} from "../const.js";

const BAR_HEIGHT = 50;

const createStatisticsTemplate = (userRank, dateInterval, watchedFilmsCount, totalDuration, favoriteGenre) => {

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRank}</span>
    </p>
    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${DateInterval.ALL_TIME}"
      ${DateInterval.ALL_TIME === dateInterval ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${DateInterval.TODAY}"
      ${DateInterval.TODAY === dateInterval ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${DateInterval.WEEK}"
      ${DateInterval.WEEK === dateInterval ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${DateInterval.MONTH}"
      ${DateInterval.MONTH === dateInterval ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${DateInterval.YEAR}"
      ${DateInterval.YEAR === dateInterval ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmsCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDuration}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${favoriteGenre}</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
};

export default class UserStatistic extends SmartView {
  constructor({userRank, dateInterval, genresCounter, watchedFilmsCount, totalDuration, favoriteGenre}) {
    super();
    this._userRank = userRank;
    this._dateInterval = dateInterval;
    this._watchedFilmsCount = watchedFilmsCount;
    this._totalDuration = totalDuration;
    this._favoriteGenre = favoriteGenre;

    if (genresCounter !== null) {
      this._renderGenresChart(genresCounter);
    }
  }

  removeElement() {
    super.removeElement();

    if (this._genresChart !== null) {
      this._genresChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._userRank, this._dateInterval, this._watchedFilmsCount, this._totalDuration, this._favoriteGenre);
  }

  setDateIntervalChangeHandler(callback) {
    this._callback.changeIntervalClick = callback;
    this.getElement().addEventListener(`change`, callback);
  }

  _renderGenresChart(genresCounter) {
    const genresCtx = this.getElement().querySelector(`.statistic__chart`);
    const uniqGenres = Object.keys(genresCounter);

    genresCtx.style.height = `${BAR_HEIGHT * uniqGenres.length}`;

    return new Chart(genresCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: uniqGenres,
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
  }
}
