import { type DatabaseTable } from '@aglint/shared-types';

import { type ProgressTenseType } from '../types';
export const progressStatusToTense = (
  status: DatabaseTable['request_progress']['status'],
): ProgressTenseType => {
  if (status === 'completed') {
    return 'past';
  } else if (status === 'failed') {
    return 'error';
  } else {
    return 'present';
  }
};

export function getProgressCompStatus(
  status: DatabaseTable['request_progress']['status'],
) {
  if (status === 'completed') {
    return 'completed';
  } else if (status === 'failed') {
    return 'error';
  } else if (status === 'in_progress') {
    return 'in_progress';
  }
  return '';
}
