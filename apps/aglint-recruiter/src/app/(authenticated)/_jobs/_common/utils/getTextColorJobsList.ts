import type { DatabaseTable } from '@aglint/shared-types';

import { statusColor } from './statusColor';

export const getTextColorJobsList = (
  status: DatabaseTable['public_jobs']['status'],
) => {
  if (status === 'draft') {
    return statusColor.draft.textColor;
  } else if (status === 'published') {
    return statusColor.published.textColor;
  } else if (status === 'closed') {
    return statusColor.closed.textColor;
  }
};
