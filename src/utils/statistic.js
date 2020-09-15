import moment from "moment";
import {isDatesEqual} from "./card.js";
// import {Genre} from "../const.js";

// Удаляет дубли в массиве
export const makeItemsUniq = (items) => [...new Set(items)];

export const parseChartDate = (date) => moment(date).format(`D MMM`);

export const countCardsByGenre = (cards, genre) => {
  return cards.filter((card) => card.genres === genre).length;
};

export const countCardsInDateRange = (dates, cards) => {
  return dates.map(
      (date) => cards.filter(
          (card) => isDatesEqual(card.watchingDate, date)
      ).length
  );
};

export const countWatchedFilmsInDateRange = (cards, dateFrom, dateTo) => {
  return cards.reduce((counter, card) => {
    if (card.watchingDate === null) {
      return counter;
    }


    if (
      moment(card.watchingDate).isSame(dateFrom) ||
      moment(card.watchingDate).isBetween(dateFrom, dateTo) ||
      moment(card.watchingDate).isSame(dateTo)
    ) {
      return counter + 1;
    } else {
      counter = 0;
    }

    return counter;
  }, 0);
};

export const listOfWatchedFilmsInDateRange = (cards, dateFrom, dateTo) =>
  cards.filter((card) =>
    (moment(card.watchingDate).isSame(dateFrom) ||
    moment(card.watchingDate).isBetween(dateFrom, dateTo) ||
    moment(card.watchingDate).isSame(dateTo))
  );

export const getDatesInRange = (dateFrom, dateTo) => {
  const dates = [];
  let stepDate = new Date(dateFrom);
  while (moment(stepDate).isSameOrBefore(dateTo)) {
    dates.push(new Date(stepDate));
    stepDate.setDate(stepDate.getDate() + 1);
  }

  return dates;
};

export const getGenresCount = (genres) => {
  const genresStorage = {};
  genres.forEach((genre) => {
    if (genresStorage[genre]) {
      genresStorage[genre] += 1;
    } else {
      genresStorage[genre] = 1;
    }
  });
  return genresStorage;
};

export const getFavoriteGenre = (films) => {
  const cardGenres = films.map(({genres}) => genres).reduce((a, b) => a.concat(b));
  const genresCounter = getGenresCount(cardGenres);
  console.log(cardGenres);
  const counter = Math.max(...Object.values(genresCounter));
  console.log(counter);
  let favoriteGenre = ``;
  for (let genre in genresCounter) {
    if (genresCounter[genre] === counter) {
      favoriteGenre = genre;
    }

  }
  return favoriteGenre;
};
