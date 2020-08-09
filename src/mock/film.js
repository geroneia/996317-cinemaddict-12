import {getRandomInteger, getSomeShuffledSubjects} from "../utils.js";
import {generateListOfComments} from "./comment.js";

const DATE_OF_FIRST_FILM_PREMIERE = new Date(Date.UTC(1896, 1, 6, 3, 0, 0));

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
  `Comedy`,
  `Drama`,
  `Family`,
  `Biography`,
  `Thriller`,
  `Documentary`,
  `Western`,
  `Musical`,
  `Cartoon`,
  `Film-Noir`,
  `Mystery`,
  `History`
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

// const RANKS = [`novice`, `fan`, `movie buff`];

// получает случайное название
const generateTitle = () => TITLES[getRandomInteger(0, TITLES.length - 1)];

// получает случайные имена
const generateCast = () =>
  getSomeShuffledSubjects(NAMES);

// получает случайный постер
const generatePoster = () =>
  POSTERS[getRandomInteger(0, POSTERS.length - 1)];

// получает случайную дату выхода фильма
const generateRandomDateOfPremiere = () => {
  const firstDate = DATE_OF_FIRST_FILM_PREMIERE;
  const lastDate = new Date();
  return new Date(getRandomInteger(firstDate, lastDate));
};

// получает случайную продолжительность
const generateRuntimeInMinutes = () =>
  getRandomInteger(60, 180);

// получает случайную страну
const generateCountry = () =>
  getSomeShuffledSubjects(COUNTRIES);

// получает случайный жанр
const generateGenre = () =>
  getSomeShuffledSubjects(GENRES);

// получает случайное описание
const generateDescription = () =>
  getSomeShuffledSubjects(DESCRIPTIONS).join(` `);

// получает возрастное ограничение
const generateAgeRating = () =>
  AGE_RATINGS[getRandomInteger(0, AGE_RATINGS.length - 1)];

export const generateCard = () => ({
  title: generateTitle(),
  poster: generatePoster(),
  director: generateCast(),
  writers: generateCast(),
  actors: generateCast(),
  releaseDate: generateRandomDateOfPremiere(),
  runtime: generateRuntimeInMinutes(),
  country: generateCountry(),
  genres: generateGenre(),
  description: generateDescription(),
  ageRating: generateAgeRating(),
  comments: generateListOfComments(),
});
