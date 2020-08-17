export const generateUserRank = (cards) => {
  const Ranks = {
    NOVICE: `novice`,
    FAN: `fan`,
    MOVIE_BUFF: `movie buff`
  };

  const getWatchedFilmsCount = () =>
    cards.filter((card) => card.isWatched).length;

  const watchedFilmsCount = getWatchedFilmsCount();

  let userRank = ``;
  if (watchedFilmsCount > 0 && watchedFilmsCount <= 10) {
    userRank = Ranks.NOVICE;
  } else if (watchedFilmsCount <= 20) {
    userRank = Ranks.FAN;
  } else if (watchedFilmsCount > 20) {
    userRank = Ranks.MOVIE_BUFF;
  }
  return userRank;
};
