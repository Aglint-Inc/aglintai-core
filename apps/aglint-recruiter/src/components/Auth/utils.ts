import { errorMessages } from '@/src/utils/errorMessages';

import { type FieldError } from './types';

export const handlePassword = (value): FieldError => {
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

export const handleEmail = (email): FieldError => {
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

export const stepObj = {
  type: 'type',
  signin: 'login',
  detailsOne: 'details-one',
  detailsTwo: 'details-two',
  atsSystem: 'select-ats-system',
  useGoal: 'use-goal',
  allSet: 'all-set',
};

export const candidateDatabaseSampleJob = () => {
  return {
    job_title: 'Candidate Database',
    is_campus: true,
  };
};
