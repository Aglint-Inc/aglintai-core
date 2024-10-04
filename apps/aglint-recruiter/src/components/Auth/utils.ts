import { errorMessages } from 'src/app/_common/utils/errorMessages';

import { type FieldError } from './types';

export const handlePassword = (value: string): FieldError => {
  if (value.length < 8) {
    return {
      error: true,
      msg: 'It should be least 8 characters long',
    };
  } else if (!/[A-Z]/.test(value)) {
    return {
      error: true,
      msg: 'Must contain one uppercase letter',
    };
  } else if (!/[a-z]/.test(value)) {
    return {
      error: true,
      msg: 'Must contain one lowercase letter',
    };
  } else if (!/[0-9]/.test(value)) {
    return {
      error: true,
      msg: 'Must contain at least one number',
    };
  } else if (!/[!@#$%^&*.|]/.test(value)) {
    return {
      error: true,
      msg: 'Must contain one special character',
    };
  } else {
    return {
      error: false,
      msg: '',
    };
  }
};

export const handleEmail = (email: string): FieldError => {
  // eslint-disable-next-line security/detect-unsafe-regex
  const personalEmailPattern =
    /^(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
  // Extract the domain from the email input
  const enteredDomain = email.split('@')[1];

  if (email === '') {
    return { error: true, msg: errorMessages.emailRequired };
  } else if (!personalEmailPattern.test(enteredDomain)) {
    return { error: false, msg: '' };
  } else {
    return { error: true, msg: 'Please enter a valid company email address' };
  }
};
