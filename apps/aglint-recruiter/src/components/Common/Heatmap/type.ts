export type Meeting = {
  status: string;
  startTime: string;
  endTime: string;
  meeting_id: string;
};

export type Meetings = {
  [date: string]: Meeting[];
};
