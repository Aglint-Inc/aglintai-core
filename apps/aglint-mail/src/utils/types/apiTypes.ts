export interface MeetingDetails {
  date?: string;
  time?: string;
  sessionType: string;
  platform: any;
  duration: string;
  sessionTypeIcon: any;
  meetingIcon: string;
}

export interface FilledPayload {
  id: string;
  created_at: string;
  recruiter_id: string;
  type: string;
  subject: string;
  body: string;
  companyLogo: string;
  meetingDetails: MeetingDetails[];
  bookingLink: string;
  meetingLink: string;
  meetingDetail: MeetingDetails;
}
