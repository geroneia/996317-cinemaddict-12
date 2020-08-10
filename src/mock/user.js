import {getRandomInteger} from "../utils.js";

const RANKS = [`novice`, `fan`, `movie buff`];

export const generateUserRank = () => RANKS[getRandomInteger(0, RANKS.length - 1)];
