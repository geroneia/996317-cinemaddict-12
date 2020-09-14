export const UserAction = {
  UPDATE_CARD: `UPDATE_CARD`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  ALL_MOVIES: `all movies`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export const MenuItem = {
  MOVIES: `MOVIES`,
  STATS: `STATS`
};

export const Genre = {
  SCI_FI: `Sci-Fi`,
  ANIMATION: `Animation`,
  FANTASY: `Fantasy`,
  COMEDY: `Comedy`,
  TV_SERIES: `TV Series`
};

export const GENRES = Object.values(Genre);


export const StatisticFilter = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};
