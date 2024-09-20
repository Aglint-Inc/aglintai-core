import type { DatabaseTable } from '@aglint/shared-types';

import { STATUS_COLOR } from '@/jobs/constants/statusColor';

export const getBgColorJobsList = (
  status: DatabaseTable['public_jobs']['status'],
) => {
  if (status === 'draft') {
    return STATUS_COLOR.draft.bgColor;
  } else if (status === 'published') {
    return STATUS_COLOR.published.bgColor;
  } else if (status === 'closed') {
    return STATUS_COLOR.closed.bgColor;
  }
};
