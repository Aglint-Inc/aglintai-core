import { permissionsEnum } from '@aglint/shared-types/src/db/tables/permissions/type';

export const hoursList = Array.from({ length: 40 }, (_, index) => index + 1);

export const settingSubNavItem = {
  WORKINGHOURS: 'workingHours',
  COMPANYINFO: 'company-info',
  HOLIDAYS: 'holidays',
  CALENDERTEMPLATE: 'calenderTemplate',
  REASONS: 'reasons',
  SCHEDULING: 'scheduling',
  SCHEDULING_REASONS: 'schedulingReasons',
  ROLES: 'roles',
  USERS: 'team',
  EMAILTEMPLATE: 'emailTemplate',
  SLACKTEMPLATE: 'slackTemplate',
  AGENTTEMPLATE: 'agentTemplate',
};

export const settingsItems: {
  label: string;
  value: string;
  permission?: permissionsEnum | 'authorized';
}[] = [
  { label: 'Company Details', value: settingSubNavItem['COMPANYINFO'] },
  { label: 'Working Hours', value: settingSubNavItem['WORKINGHOURS'] },
  { label: 'Holidays', value: settingSubNavItem['HOLIDAYS'] },
  {
    label: 'User',
    value: settingSubNavItem['USERS'],
    permission: 'view_users',
  },
  {
    label: 'Roles',
    value: settingSubNavItem['ROLES'],
    permission: 'view_roles',
  },
  { label: 'Templates', value: settingSubNavItem['EMAILTEMPLATE'] },
  { label: 'Scheduling', value: settingSubNavItem['SCHEDULING'] },
  {
    label: 'Reasons',
    value: settingSubNavItem['SCHEDULING_REASONS'],
  },
];
