import { ProgressTenseType } from '../types';

export function getProgressColor(tense: ProgressTenseType) {
  if (tense === 'error') {
    return 'error';
  } else if (tense === 'future') {
    return 'neutral';
  } else if (tense === 'past') {
    return 'success';
  } else {
    return 'info';
  }
}
