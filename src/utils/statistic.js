import moment from "moment";
import {isDatesEqual} from "./card.js";

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

