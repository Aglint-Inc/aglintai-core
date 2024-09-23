export const hoursList = Array.from({ length: 40 }, (_, index) => index + 1);

export const companySettingTabs = [
  'workingHours',
  'company-info',
  'holidays',
  'calenderTemplate',
  'reasons',
  'scheduling',
  'schedulingReasons',
  'roles',
  'team',
  'emailTemplate',
  'slackTemplate',
  'agentTemplate',
  'portalSettings',
] as const;
export type companySettingTabsType = (typeof companySettingTabs)[number];
