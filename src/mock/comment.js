import {getRandomInteger, getSomeShuffledSubjects, getRandomItem} from "../utils/common.js";
import {NAMES} from "./film.js";
import {generateId} from "../utils/card.js";

const MAX_DAYS_GAP = 7;
const MAX_COMMENTS_COUNT = 80;

const MESSAGES = [
  `Interesting setting and a good cast.`,
  `Booooooooooring.`,
  `Very very old. Meh.`,
  `Almost two hours? Seriously?`
];

const EMOJI = [`smile`, `sleeping`, `puke`, `angry`];

// получает дату комментария
const generateCommentDate = () => {
  const daysGap = getRandomInteger(0, MAX_DAYS_GAP);
  const currentDate = new Date();

  currentDate.setHours(23, 49, 59, 999);

  currentDate.setDate(currentDate.getDate() - daysGap);

  return new Date(currentDate);
};

// получает сообщение
const generateMessage = () => getSomeShuffledSubjects(MESSAGES).join(` `);

const generateComment = () => ({
  id: generateId(),
  message: generateMessage(),
  emoji: getRandomItem(EMOJI),
  name: getRandomItem(NAMES),
  currentDate: generateCommentDate(),
});

export const generateListOfComments = () => {
  const listOfComments = [];
  for (let i = 0; i < MAX_COMMENTS_COUNT; i++) {
    listOfComments.push(generateComment());
  }
  return listOfComments;
};
