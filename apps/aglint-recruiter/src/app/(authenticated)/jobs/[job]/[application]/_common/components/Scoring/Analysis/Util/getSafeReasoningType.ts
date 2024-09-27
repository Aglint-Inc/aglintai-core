import { type ApplicationDetails } from '../../../../hooks/useApplicationDetails';

export const getSafeReasoningType = (
  type: keyof NonNullable<
    NonNullable<ApplicationDetails>['score_json']
  >['scores'],
): keyof NonNullable<
  NonNullable<ApplicationDetails>['score_json']
>['reasoning'] => {
  switch (type) {
    case 'skills':
      return 'skills';
    case 'experience':
      return 'positions';
    case 'education':
      return 'schools';
  }
};
