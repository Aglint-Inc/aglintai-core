import { type permissionsEnum } from '@aglint/shared-types/src/db/tables/permissions/type';

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
  PORTAL_SETTINGS: 'portalSetttings',
};

export const settingsItems: {
  label: string;
  value: string;
  permission?: permissionsEnum | 'authorized';
  icon: string;
}[] = [
  { label: 'Company Details', value: settingSubNavItem['COMPANYINFO'], icon: 'Building' },
  { label: 'Working Hours', value: settingSubNavItem['WORKINGHOURS'], icon: 'Clock' },
  { label: 'Holidays', value: settingSubNavItem['HOLIDAYS'], icon: 'Calendar' },
  {
    label: 'User',
    value: settingSubNavItem['USERS'],
    permission: 'view_users',
    icon: 'Users',
  },
  {
    label: 'Roles',
    value: settingSubNavItem['ROLES'],
    permission: 'view_roles',
    icon: 'Shield',
  },
  { label: 'Templates', value: settingSubNavItem['EMAILTEMPLATE'], icon: 'FileText' },
  { label: 'Scheduling', value: settingSubNavItem['SCHEDULING'], icon: 'CalendarDays' },
  {
    label: 'Reasons',
    value: settingSubNavItem['SCHEDULING_REASONS'],
    icon: 'List',
  },
  {
    label: 'Candidate Portal',
    value: settingSubNavItem['PORTAL_SETTINGS'],
    icon: 'Globe',
  },
];
