import type { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

export const getPauseMemberText = (
  pause_json: DatabaseTable['interview_module_relation']['pause_json'] | null,
) => {
  if (!pause_json) return '--';
  return !pause_json?.isManual
    ? pause_json?.end_date
      ? `Until ${dayjsLocal(pause_json.end_date).format('DD MMMM YYYY')}`
      : '--'
    : 'Indefinitely';
};
