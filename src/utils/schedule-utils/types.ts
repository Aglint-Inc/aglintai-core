export type EventType = {
  start: Date;
  end: Date;
};

export type ScheduleAuthType = {
  expiry_date: number;
  access_token: string;
  refresh_token: string;
};

export type TimeSlotType = {
  start: Date;
  end: Date;
};
