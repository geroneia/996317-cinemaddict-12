import {getRandomInteger, getRandomDecimal, getSomeShuffledSubjects, getTrueOrFalse, getRandomItem} from "../utils/common.js";

import {generateId} from "../utils/card.js";

const DATE_OF_FIRST_FILM_PREMIERE = new Date(Date.UTC(1896, 1, 6, 3, 0, 0));

// const DATE_OF_FIRST_FILM_WATCHED = new Date(Date.UTC(2020, 9, 1, 3, 0, 0));

const TITLES = [
  `Made for Each Other`,
  `Popeye Meets Sinbad`,
  `Santa Claus Conquers the Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man with the Golden Arm`,
  `Sagebrush Trail`,
  `All About Eve`];

export const NAMES = [
  `Frank Sinatra`,
  `Amitabh Bachchan`,
  `Yash Chopra`,
  `Shah Rukh Khan`,
  `Rani Mukerji`,
  `Kiron Kher`,
  `Hema Malini`,
  `Deepika Padukone`,
  `Ranveer Singh`,
  `Naseeruddin Shah`,
  `Dimple Kapadia`,
  `Joseph L. Mankiewicz`,
  `Bette Davis`,
  `Marilyn Monroe`,
  `Billy Wilder`,
  `Gregory Peck`
];

const COUNTRIES = [
  `USA`,
  `Iran`,
  `India`,
  `China`,
  `Japan`,
  `Russia`
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const GENRES = [
  `Sci-Fi`,
  `Animation`,
  `Fantasy`,
  `Comedy`,
  `TV Series`
];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const AGE_RATINGS = [`0`, `6`, `14`, `16`, `18`];

const Rating = {
  MIN: 1,
  MAX: 9
};

const MINUTES_IN_HOUR = 60;

// получает случайную дату выхода фильма
const generateRandomDateOfPremiere = () => {
  const firstDate = DATE_OF_FIRST_FILM_PREMIERE;
  const lastDate = new Date();
  return new Date(getRandomInteger(firstDate, lastDate));
};

const generateRandomDateOfWatching = () => {
  // const firstDate = DATE_OF_FIRST_FILM_WATCHED;
  // const lastDate = new Date();
  return new Date();
};

export const generateCard = () => ({
  id: generateId(),
  title: getRandomItem(TITLES),
  poster: getRandomItem(POSTERS),
  rating: getRandomDecimal(Rating.MIN, Rating.MAX),
  director: getRandomItem(NAMES),
  writers: getSomeShuffledSubjects(NAMES),
  actors: getSomeShuffledSubjects(NAMES),
  releaseDate: generateRandomDateOfPremiere(),
  runtime: getRandomInteger(MINUTES_IN_HOUR, MINUTES_IN_HOUR * 3),
  country: getSomeShuffledSubjects(COUNTRIES),
  genres: getSomeShuffledSubjects(GENRES),
  description: getSomeShuffledSubjects(DESCRIPTIONS).join(` `),
  ageRating: getRandomItem(AGE_RATINGS),
  comments: [],
  isAddedToWatchlist: getTrueOrFalse(),
  isWatched: getTrueOrFalse(),
  isFavorite: getTrueOrFalse(),
  watchingDate: generateRandomDateOfWatching()
});
