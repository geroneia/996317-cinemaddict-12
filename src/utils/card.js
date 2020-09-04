import moment from "moment";

const MILLISECONDS_IN_MINUTE = 60000;

export const sortByDate = (a, b) =>
  b.releaseDate.getTime() - a.releaseDate.getTime();

export const sortByRating = (a, b) => b.rating - a.rating;

export const sortByComments = (a, b) => b.comments.length - a.comments.length;

export const formatCardReleaseYear = (releaseDate) => moment(releaseDate).format(`YYYY`);

export const formatCardReleaseDate = (releaseDate) => moment(releaseDate).format(`DD MMMM YYYY`);

export const formatCardRuntime = (runtime) => moment(runtime * MILLISECONDS_IN_MINUTE).format(`h[h] mm[m]`);

export const formatCommentDate = (commentsDate) => moment(commentsDate).fromNow();
