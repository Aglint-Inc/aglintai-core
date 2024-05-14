export type FindSlots = {
  session_ids: string[];
  recruiter_id: string;
  start_date: string;
  end_date: string;
  user_tz: string;
};

export type ConfirmApiBodyParams = {
  candidate_plan: {
    sessions: {
      session_id: string;
      start_time: string;
      end_time: string;
    }[];
  }[];
  recruiter_id: string;
  user_tz: string;
  candidate_email: string;
  schedule_id: string;
};

export type InterviewSlotsRespAPI = {
  sessions: { session_id: string; start_time: string; end_time: string }[];
}[][];
