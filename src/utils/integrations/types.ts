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
    host_video: false;
    participant_video: false;
    join_before_host: true;
  };
}

export type ZoomMeetingResp = {
  uuid: string;
  id: number;
  host_id: string;
  host_email: string;
  topic: string;
  type: number;
  status: string;
  start_time: string;
  duration: number;
  timezone: string;
  agenda: string;
  created_at: string;
  start_url: string;
  join_url: string;
  password: string;
  h323_password: string;
  pstn_password: string;
  encrypted_password: string;
  settings: {
    host_video: boolean;
    participant_video: boolean;
    cn_meeting: boolean;
    in_meeting: boolean;
    join_before_host: boolean;
    jbh_time: number;
    mute_upon_entry: boolean;
    watermark: boolean;
    use_pmi: boolean;
    approval_type: number;
    audio: string;
    auto_recording: string;
    enforce_login: boolean;
    enforce_login_domains: string;
    alternative_hosts: string;
    alternative_host_update_polls: boolean;
    close_registration: boolean;
    show_share_button: boolean;
    allow_multiple_devices: boolean;
    registrants_confirmation_email: boolean;
    waiting_room: boolean;
    request_permission_to_unmute_participants: boolean;
    registrants_email_notification: boolean;
    meeting_authentication: boolean;
    encryption_type: string;
    approved_or_denied_countries_or_regions: {
      enable: boolean;
    };
    breakout_room: {
      enable: boolean;
    };
    internal_meeting: boolean;
    continuous_meeting_chat: {
      enable: boolean;
      auto_add_invited_external_users: boolean;
    };
    participant_focused_meeting: boolean;
    push_change_to_calendar: boolean;
    resources: any[]; // You might want to define a type for resources if possible
    auto_start_meeting_summary: boolean;
    alternative_hosts_email_notification: boolean;
    show_join_info: boolean;
    device_testing: boolean;
    focus_mode: boolean;
    enable_dedicated_group_chat: boolean;
    private_meeting: boolean;
    email_notification: boolean;
    host_save_video_order: boolean;
    sign_language_interpretation: {
      enable: boolean;
    };
    email_in_attendee_report: boolean;
  };
  pre_schedule: boolean;
};
