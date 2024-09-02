import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { type TabsModuleMembers } from '../type';

export const tabsModuleMembers: TabsModuleMembers[] = [
  {
    name: 'Qualified',
    queryParams: 'qualified',
  },
  {
    name: 'Training',
    queryParams: 'training',
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
    name: 'Aglint AI Token',
    queryParams: 'aglintaitoken',
  },
  {
    name: 'Aglint AI Instruction',
    queryParams: 'aglintaiinstruction',
  },
 
];

export const getPauseMemberText = (
  pause_json: DatabaseTable['interview_module_relation']['pause_json'],
) => {
  return !pause_json?.isManual
    ? pause_json?.end_date
      ? `Until ${dayjsLocal(pause_json.end_date).format('DD MMMM YYYY')}`
      : '--'
    : 'Indefinitely';
};
