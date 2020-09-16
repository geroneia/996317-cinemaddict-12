import moment from "moment";

const MILLISECONDS_IN_MINUTE = 60000;

export const sortByDate = (a, b) =>
  b.releaseDate.getTime() - a.releaseDate.getTime();

export const sortByRating = (a, b) => b.rating - a.rating;

export const sortByComments = (a, b) => b.comments.length - a.comments.length;

export const formatCardReleaseYear = (releaseDate) => moment(releaseDate).format(`YYYY`);

export const formatCardReleaseDate = (releaseDate) => moment(releaseDate).format(`DD MMMM YYYY`);

export const formatCardRuntime = (runtime) => moment(runtime * MILLISECONDS_IN_MINUTE).format(`h[h] mm[m]`);

export const formatCardsDuration = (runtime) => moment(runtime * MILLISECONDS_IN_MINUTE).format(`h[h] mm[m]`);

export const formatCommentDate = (commentsDate) => moment(commentsDate).fromNow();

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return new Date(currentDate);
};

export const getEarliestDate = () => {
  const earliestDate = new Date(0);
  return new Date(earliestDate);
};

export const isDatesEqual = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return true;
  }

  return moment(dateA).isSame(dateB, `day`);
};

export const getOverallDuration = (movies) => {
  let duration = 0;
  for (let i = 0; i < movies.length; i++) {
    duration += movies[i].runtime;
  }
  return formatCardsDuration(duration);
};

