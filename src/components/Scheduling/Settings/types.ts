export type schedulingSettingType = {
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
  totalDaysOff: any[];
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
  isDayOff: boolean;
  timeRange: {
    startTime: string;
    endTime: string;
  };
};
