export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomDecimal = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = lower + Math.random() * (upper - lower + 1);
  return +result.toFixed(1);
};

export const getShuffleSubjects = (subjects) => {
  for (let i = subjects.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [subjects[i], subjects[j]] = [subjects[j], subjects[i]];
  }
  const shuffledSubjects = subjects;
  return shuffledSubjects;
};

export const getSomeShuffledSubjects = (subjects) => {
  return getShuffleSubjects(subjects).slice(0, getRandomInteger(1, subjects.length - 1));
};

export const humanizeAnyDate = (anyDate) => {
  return anyDate.toLocaleString(`en-GB`, {
    day: `numeric`,
    month: `long`,
    year: `numeric`
  });
};

// да или нет
export const getTrueOrFaulse = () => Boolean(getRandomInteger(0, 1));
