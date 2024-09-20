import { type ApplicationDetails } from '../../../../hooks/useApplicationDetails';

export const getSafeReasoningType = (
  type: keyof ApplicationDetails['score_json']['scores'],
): keyof ApplicationDetails['score_json']['reasoning'] => {
  switch (type) {
    case 'skills':
      return 'skills';
    case 'experience':
      return 'positions';
    case 'education':
      return 'schools';
  }
};
