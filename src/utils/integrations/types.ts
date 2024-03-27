export type TokenType = {
  access_token: string;
  token_type: 'bearer';
  refresh_token: string;
  expires_in: number;
  scope: string;
};

export interface ZoomCreateMeetingParams {
  topic: string;
  default_password: boolean;
  type: 1 | 2; // 1 for instant meeting, 2 for scheduled meeting
  start_time: string; // ISO 8601 format (optional for instant meetings)
  duration: number; // Duration in minutes (optional for instant meetings)
  timezone: string; // Timezone (optional for instant meetings)
  agenda: string; // Agenda (optional)
  password?: string; // Meeting password (optional)
  settings: {
    host_video: true;
    participant_video: true;
    approval_type: 1;
    waiting_room: true;
  };
}
