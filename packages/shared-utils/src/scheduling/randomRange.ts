export const getRandomNumInRange = (min: number, max: number) => {
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
