import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL_MOVIES]: (cards) => cards,
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.isAddedToWatchlist),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.isWatched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.isFavorite)
};
