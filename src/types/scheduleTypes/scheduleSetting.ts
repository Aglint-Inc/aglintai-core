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
    outOfOffice: string[];
    recruitingBlocks: string[];
  };
  break_hour: {
    start_time: string;
    end_time: string;
  };
};
export type holidayType = {
  date: string;
  event_name: string;
};
export type DailyLimitType = {
  value: number;
  type: 'Hours' | 'Interviews';
};
export type WeeklyLimitType = {
  value: number;
  type: 'Hours' | 'Interviews';
};
export type WorkingDaysType = {
  day: string;
  isWorkDay: boolean;
  timeRange: {
    startTime: string;
    endTime: string;
  };
};
