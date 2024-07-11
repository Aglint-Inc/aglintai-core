import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { TabsModuleMembers } from '../type';

export const tabsModuleMembers: TabsModuleMembers[] = [
  {
    name: 'Members',
    queryParams: 'members',
  },
  {
    name: 'Schedules',
    queryParams: 'schedules',
  },
  {
    name: 'Instructions',
    queryParams: 'instructions',
  },
  {
    name: 'Training',
    queryParams: 'training',
  },
];

export const getPauseMemberText = (
  pause_json: DatabaseTable['interview_module_relation']['pause_json'],
) => {
  return !pause_json?.isManual
    ? pause_json?.end_date
      ? `Until ${dayjsLocal(pause_json.end_date).format('DD MMMM YYYY')}`
      : '--'
    : 'Indefinately';
};
