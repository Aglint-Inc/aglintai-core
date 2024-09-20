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

export type NewCalenderEvent = {
  summary: string;
  location?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees: { email: string }[];
  reminders: {
    useDefault: boolean;
    overrides: { method: string; minutes: number }[];
  };
  conferenceData: {
    createRequest?: { requestId: string };
    conferenceSolution?: {
      key: {
        type: string;
      };
      name: string;
    };
    entryPoints?: {
      uri: string;
      label: string;
      entryPointType: string;
      passcode: string;
    }[];
  };
  description: string;
};

export type CalendarEvent = {
  id: string;
  end: {
    dateTime: string;
    timeZone: string;
  };
  etag: string;
  kind: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  status: string;
  created: string;
  creator: {
    self: boolean;
    email: string;
  };
  iCalUID: string;
  summary: string;
  updated: string;
  htmlLink: string;
  sequence: number;
  attendees: {
    email: string;
    responseStatus?: "accepted" | "declined" | "tentative" | "needsAction";
    organizer: boolean;
  }[];
  eventType: string;
  organizer: {
    self: boolean;
    email: string;
  };
  reminders: {
    overrides: {
      method: string;
      minutes: number;
    }[];
    useDefault: boolean;
  };
  hangoutLink: string;
  conferenceData: {
    entryPoints: {
      uri: string;
      label: string;
      entryPointType: string;
    }[];
    conferenceId: string;
    createRequest?: {
      status: {
        statusCode: string;
      };
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
    };
    conferenceSolution?: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
  };
};
