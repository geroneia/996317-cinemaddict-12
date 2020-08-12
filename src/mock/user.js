export const generateUserRank = (cards) => {
  const RANKS = [`novice`, `fan`, `movie buff`];
  const getWatchedFilmsCount = () =>
    cards.filter((card) => card.isWatched).length;

  const watchedFilmsCount = getWatchedFilmsCount();

  let userRank = ``;
  if (watchedFilmsCount > 0 && watchedFilmsCount <= 10) {
    userRank = RANKS[0];
  } else if (watchedFilmsCount <= 15) {
    userRank = RANKS[1];
  } else if (watchedFilmsCount > 16) {
    userRank = RANKS[2];
  }
  return userRank;
};
