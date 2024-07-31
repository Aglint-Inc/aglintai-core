import { permissionsEnum } from '@aglint/shared-types/src/db/tables/permissions/type';

export const settingSubNavItem = {
  WORKINGHOURS: 'workingHours',
  COMPANYINFO: 'company-info',
  HOLIDAYS: 'holidays',
  CALENDERTEMPLATE: 'calenderTemplate',
  REASONS: 'reasons',
  SCHEDULING: 'scheduling',
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
  { label: 'Company Info', value: settingSubNavItem['COMPANYINFO'] },
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
  { label: 'Email Templates', value: settingSubNavItem['EMAILTEMPLATE'] },
  { label: 'Scheduling', value: settingSubNavItem['SCHEDULING'] },
];

// { label: 'Slack Template', value: settingSubNavItem['SLACKTEMPLATE'] },
// { label: 'Calender Template', value: settingSubNavItem['CALENDERTEMPLATE'] },
// { label: 'Agent Template', value: settingSubNavItem['AGENTTEMPLATE'] },
