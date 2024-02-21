export type TimeSlotType = {
  start: Date;
  end: Date;
};

export type AvalabilitySlotType = {
  startTime: Date;
  endTime: Date;
  status: 'available' | 'declined' | 'confirmed' | 'requested';
};

export type InterviewerAvailabliity = {
  timeDuration: number;
  availability: Record<string, AvalabilitySlotType[]>;
  cntConfirmed: number;
  cntRequested: number;
};

export type InterviewerType = {
  interviewerName: string;
  interviewerId: string;
  profileImg: string;
  isMailConnected: boolean;
  email: string;
  slots: InterviewerAvailabliity[];
};

export type StateAvailibility = {
  isInitialising: boolean;
  isCalenderLoading: boolean;
  panelName: string;
  interviewers: InterviewerType[];
  timeSlot: number;
  dateRangeView: {
    startDate: Date;
    endDate: Date;
  };
  dateRangeTableView: {
    startDate: Date;
    endDate: Date;
  };
  timeRange: {
    start: Date;
    end: Date;
  };

  excludedDates: string[];
  timeZone: {
    label: string;
    value: string;
  };
};

export interface InterviewData {
  [interviewerId: string]: {
    interviewerName: string;
    interviewerId: string;
    profileImg: string;
    isMailConnected: boolean;
    email: string;
    [timeDuration: number]: {
      [dateKey: string]: {
        status: string;
        endTime: string;
        startTime: string;
      }[];
    };
  };
}

export interface MergedEvents {
  [date: string]: {
    [timeRange: string]: {
      startTime: Date;
      endTime: Date;
      interviewerId: string;
      interviewerName: string;
      profileImg: string;
      email: string;
      status: AvalabilitySlotType['status'];
    }[];
  };
}
