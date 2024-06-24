import type {
  EmailTempPath,
  EmailTemplateFields,
  EmailTemplateType,
} from "../..";
import type { CustomMembersMeta } from "../common.types";

export type CustomSchedulingSettings = {
  isAutomaticTimezone: boolean;
  timeZone: {
    label: string;
    name: string;
    tzCode: string;
    utc: string;
  };
  interviewLoad: {
    dailyLimit: {
      value: number;
      type: "Hours" | "Interviews";
    };
    weeklyLimit: {
      value: number;
      type: "Hours" | "Interviews";
    };
  };
  workingHours: {
    day: string;
    isWorkDay: boolean;
    timeRange: {
      startTime: string;
      endTime: string;
    };
  }[];
  totalDaysOff: {
    date: string;
    event_name: string;
    locations: string[];
  }[];
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
  debrief_defaults: CustomMembersMeta;
};
