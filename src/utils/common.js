export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getShuffleSubjects = (subjects) => {
  for (let i = subjects.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [subjects[i], subjects[j]] = [subjects[j], subjects[i]];
  }
  const shuffledSubjects = subjects;
  return shuffledSubjects;
};
