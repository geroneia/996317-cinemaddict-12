export const sortByDate = (a, b) =>
  b.releaseDate.getTime() - a.releaseDate.getTime();

export const sortByRating = (a, b) => b.rating - a.rating;

export const sortByComments = (a, b) => b.comments.length - a.comments.length;
