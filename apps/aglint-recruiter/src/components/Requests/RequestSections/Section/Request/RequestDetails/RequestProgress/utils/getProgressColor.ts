type TenseType = 'past' | 'present' | 'future' | 'error';

export function getProgressColor(tense: TenseType) {
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
