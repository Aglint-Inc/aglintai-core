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

export const settingsItems = (show: boolean) =>
  [
    {
      label: 'Company Details',
      value: settingSubNavItem['COMPANYINFO'],
      icon: 'Building',
      show: true,
    },
    {
      label: 'Working Hours',
      value: settingSubNavItem['WORKINGHOURS'],
      icon: 'Clock',
      show: true,
    },
    {
      label: 'Holidays',
      value: settingSubNavItem['HOLIDAYS'],
      icon: 'Calendar',
      show: true,
    },
    {
      label: 'User',
      value: settingSubNavItem['USERS'],
      permission: 'view_users',
      icon: 'Users',
      show: true,
    },
    {
      label: 'Roles',
      value: settingSubNavItem['ROLES'],
      permission: 'view_roles',
      icon: 'Shield',
      show: show,
    },
    {
      label: 'Templates',
      value: settingSubNavItem['EMAILTEMPLATE'],
      icon: 'FileText',
      show: show,
    },
    {
      label: 'Scheduling',
      value: settingSubNavItem['SCHEDULING'],
      icon: 'CalendarDays',
      show: show,
    },
    {
      label: 'Reasons',
      value: settingSubNavItem['SCHEDULING_REASONS'],
      icon: 'List',
      show: show,
    },
    {
      label: 'Candidate Portal',
      value: settingSubNavItem['PORTAL_SETTINGS'],
      icon: 'Globe',
      show: show,
    },
  ] as {
    label: string;
    value: string;
    permission?: permissionsEnum | 'authorized';
    icon: string;
    show: boolean;
  }[];
