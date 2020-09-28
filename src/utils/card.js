import moment from "moment";

export const sortByDate = (a, b) => moment(b.releaseDate).diff(a.releaseDate, `day`);

export const sortByRating = (a, b) => b.rating - a.rating;

export const sortByComments = (a, b) => b.comments.length - a.comments.length;

export const formatCardReleaseYear = (releaseDate) => moment(releaseDate).format(`YYYY`);

export const formatCardReleaseDate = (releaseDate) => moment(releaseDate).format(`DD MMMM YYYY`);

export const formatCardRuntime = (runtime) => moment.utc(moment.duration(runtime, `minutes`).asMilliseconds()).format(`h[h] mm[m]`);

export const formatCommentDate = (commentsDate) => moment(commentsDate).fromNow();

const SHAKE_ANIMATION_TIMEOUT = 600;

const MINUTES_IN_HOUR = 60;

const MILLISECONDS_IN_SECOND = 1000;

const MAX_FILMS_COUNT_FOR_NOVICE = 10;

const MAX_FILMS_COUNT_FOR_FAN = 20;

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return new Date(currentDate);
};

export const getEarliestDate = () => new Date(0);

export const getOverallDuration = (movies) => {
  const duration = movies.length !== 0 ?
    movies.map((movie) => movie.runtime).reduce((a, b) => a + b) : 0;

  const lengthInHours = Math.floor(duration / MINUTES_IN_HOUR);
  const lengthInMinutes = duration % MINUTES_IN_HOUR;
  const hours = lengthInHours > 0 ? lengthInHours + `h` : `0`;
  const minutes = lengthInMinutes > 0 ? lengthInMinutes + `m` : ``;

  return `${hours} ${minutes}`;
};

const Ranks = {
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`
};

export const generateUserRank = (watchedFilmsCount) => {

  let userRank = ``;

  if (watchedFilmsCount > 0 && watchedFilmsCount <= MAX_FILMS_COUNT_FOR_NOVICE) {
    userRank = Ranks.NOVICE;
  } else if (watchedFilmsCount > MAX_FILMS_COUNT_FOR_NOVICE && watchedFilmsCount <= MAX_FILMS_COUNT_FOR_FAN) {
    userRank = Ranks.FAN;
  } else if (watchedFilmsCount > MAX_FILMS_COUNT_FOR_FAN) {
    userRank = Ranks.MOVIE_BUFF;
  }
  return userRank;
};

export const shake = (target) => {
  target.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / MILLISECONDS_IN_SECOND}s`;
  setTimeout(() => {
    target.style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};
