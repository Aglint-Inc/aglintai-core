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

export type StateAvailibility = {
  isloading: boolean;
  interviewPanels: [];
  isPanelLoading: boolean;
  panelName: string;
  interviewers: {
    interviewerName: string;
    isMailConnected: boolean;
    interviewerId: string;
    profileImg: string;
    slots: InterviewerAvailabliity[];
  }[];
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
