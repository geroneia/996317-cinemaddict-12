import{getRandomInteger, getShuffleSubject, humanizeAnyDate} from "../utils.js";
  
const DATE_OF_FIRST_FILM_PREMIERE = new Date (1896, 01, 06);

const TITLES = [
    `Made for Each Other`, 
    `Popeye Meets Sinbad`,
    `Santa Claus Conquers the Martians`,
    `The Dance of Life`,
    `The Great Flamarion`,
    `The Man with the Golden Arm`,
    `Sagebrush Trail`,
    `All About Eve`];
  
const NAMES = [
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
  ]  
  
const COUNTRIES = [
    `USA`,
    `Iran`,
    `India`,
    `China`,
    `Japan`,
    `Russia`
  ]
  
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
  
const AGE_RATINGS = [`0`, `6`, '14', `16`, `18`];
  
const MESSAGES = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`
  ];
  
const EMOJI = [`smile`, `sleeping`, `puke`, `angry`]
  
const RANKS = [`novice`, `fan`, `movie buff`];

// получает случайное название
const generateTitle = () => TITLES[getRandomInteger(0, TITLES.length - 1)];

// получает случайные имена
const generateCast = () => {
  return getShuffleSubjects(NAMES).slice(0, getRandomInteger(1, NAMES.length - 1));
};

// получает случайную дату выхода фильма
const generateRandomDateOfPremiere = () => {
    firstDate = DATE_OF_FIRST_FILM_PREMIERE;
    lastDate = new Date();
    return humanizeAnyDate(new Date(getRandomInteger(firstDate, lastDate)));
};