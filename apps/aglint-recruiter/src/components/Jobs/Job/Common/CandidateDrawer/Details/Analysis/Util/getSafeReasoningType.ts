import type { ApplicationDetails } from '@/src/context/ApplicationContext/type';

export const getSafeReasoningType = (
  type: keyof ApplicationDetails<'details'>['score_json']['scores'],
): keyof ApplicationDetails<'details'>['score_json']['reasoning'] => {
  switch (type) {
    case 'skills':
      return 'skills';
    case 'experience':
      return 'positions';
    case 'education':
      return 'schools';
  }
};
