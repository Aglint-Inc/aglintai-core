import { validateString } from '@/utils/validateString';

export const validateDescription = (str: string) => {
  return validateString(str) || str.length < 100;
};
