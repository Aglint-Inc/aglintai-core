export const validateString = (str: string | number) => {
  return typeof str === 'number'
    ? false
    : !str || typeof str !== 'string' || str.length === 0;
};
