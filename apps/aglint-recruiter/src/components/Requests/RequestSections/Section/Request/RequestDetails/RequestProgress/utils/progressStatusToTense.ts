import { DatabaseTable } from '@aglint/shared-types';

import { ProgressTenseType } from '../types';

export const progressStatusToTense = (
  status: DatabaseTable['request_progress']['status'],
) => {
  let tense: ProgressTenseType = 'past';
  if (status === 'completed') {
    tense = 'past';
  } else if (status === 'in_progress') {
    tense = 'present';
  } else if (status === 'failed') {
    tense = 'error';
  } else {
    tense = 'future';
  }
  return tense as ProgressTenseType;
};
