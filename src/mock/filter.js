export const cardsToFilterMap = {
  watchlist: (cards) => cards
      .filter((card) => card.isAddedToWatchlist).length,
  history: (cards) => cards
      .filter((card) => card.isWatched).length,
  favorites: (cards) => cards
      .filter((card) => card.isFavorite).length,
};

export const generateFilter = (cards) =>
  Object.entries(cardsToFilterMap).map(([filterName, countCards]) => ({
    name: filterName,
    count: countCards(cards),
  }));
