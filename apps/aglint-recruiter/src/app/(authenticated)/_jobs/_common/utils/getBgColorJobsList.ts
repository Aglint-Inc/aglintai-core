import type { DatabaseTable } from '@aglint/shared-types';

import { statusColor } from './statusColor';

export const getBgColorJobsList = (
  status: DatabaseTable['public_jobs']['status'],
) => {
  if (status === 'draft') {
    return statusColor.draft.bgColor;
  } else if (status === 'published') {
    return statusColor.published.bgColor;
  } else if (status === 'closed') {
    return statusColor.closed.bgColor;
  }
};
