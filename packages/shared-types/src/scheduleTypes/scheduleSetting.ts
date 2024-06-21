import { DatabaseTable } from "..";

export type schedulingSettingType =
  DatabaseTable["recruiter"]["scheduling_settings"];

export type holidayType = {
  date: string;
  event_name: string;
  locations: string[];
};
export type DailyLimitType = {
  value: number;
  type: "Hours" | "Interviews";
};
export type WeeklyLimitType = {
  value: number;
  type: "Hours" | "Interviews";
};
export type InterviewLoadType = {
  daily: {
    type: "Hours" | "Interviews";
    max: number;
    value: number;
  };
  weekly: {
    type: "Hours" | "Interviews";
    max: number;
    value: number;
  };
};
export type WorkingDaysType = {
  day: string;
  isWorkDay: boolean;
  timeRange: {
    startTime: string;
    endTime: string;
  };
};
