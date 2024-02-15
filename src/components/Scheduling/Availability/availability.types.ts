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
  checkedInterSlots: {
    interviewerName: string;
    interviewerId: string;
    profileImg: string;
    countCheckedSlots: number;
    slots: InterviewerAvailabliity[];
  }[];
};
