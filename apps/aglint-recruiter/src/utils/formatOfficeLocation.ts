import { DatabaseView } from '@aglint/shared-types';

export const formatOfficeLocation = (
  location: DatabaseView['job_view']['location'],
) => {
  if (!location) return '---';
  return [location?.city, location?.country]
    .filter(Boolean)
    .map((location) => location.trim())
    .join(', ');
};
