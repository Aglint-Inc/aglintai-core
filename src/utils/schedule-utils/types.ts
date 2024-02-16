export type EventType = {
  start: Date;
  end: Date;
};

export type ScheduleAuthType = {
  expiry_date: number;
  access_token: string;
  refresh_token: string;
  email: string;
};

export type TimeSlotType = {
  start: Date;
  end: Date;
};

export type CalenderEvent = {
  summary: string;
  location?: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  attendees: { email: string }[];
  reminders: {
    useDefault: boolean;
    overrides: { method: string; minutes: number }[];
  };
  conferenceData: {
    createRequest: { requestId: string };
  };
};
