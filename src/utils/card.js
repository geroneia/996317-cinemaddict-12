export const sortByDate = (cardA, cardB) => {
  return cardA.releaseDate.getTime() - cardB.releaseDate.getTime();
};

export const sortByRating = (cardA, cardB) => {
  return cardA.rating - cardB.rating;
};
