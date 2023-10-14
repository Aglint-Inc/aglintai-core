export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};
export const capitalizeAll = (str: string) => {
  return str
    .split(' ')
    .map((item) => capitalize(item))
    .join(' ');
};
