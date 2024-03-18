export type schedulingSettingType = {
  isAutomaticTimezone: boolean;
  timeZone: {
    label: string;
    name: string;
    tzCode: string;
    utc: string;
  };
  interviewLoad: {
    dailyLimit: DailyLimitType;
    weeklyLimit: WeeklyLimitType;
  };
  workingHours: WorkingDaysType[];
  totalDaysOff: holidayType[];
  schedulingKeyWords: {
    free: any[];
    SoftConflicts: any[];
  };
};
export type holidayType = {
  date: string;
  event_name: string;
};
export type DailyLimitType = {
  value: number | null;
  type: string | null;
};
export type WeeklyLimitType = {
  value: number | null;
  type: string | null;
};
export type WorkingDaysType = {
  day: string;
  isWorkDay: boolean;
  timeRange: {
    startTime: string;
    endTime: string;
  };
};
