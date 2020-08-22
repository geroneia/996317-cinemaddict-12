
const Ranks = {
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`
};

const getWatchedFilmsCount = (films) =>
  films.filter((film) => film.isWatched).length;

export const generateUserRank = (cards) => {

  const watchedFilmsCount = getWatchedFilmsCount(cards);
  let userRank = ``;

  if (watchedFilmsCount > 0 && watchedFilmsCount <= 10) {
    userRank = Ranks.NOVICE;
  } else if (watchedFilmsCount > 10 && watchedFilmsCount <= 20) {
    userRank = Ranks.FAN;
  } else if (watchedFilmsCount > 20) {
    userRank = Ranks.MOVIE_BUFF;
  }
  return userRank;
};
