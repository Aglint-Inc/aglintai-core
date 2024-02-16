import { InterviewScheduleTypeDB } from '@/src/types/data.types';

export type ApiResponse = InterviewScheduleTypeDB & {
  interview_panel: {
    name: string;
    recruiter: {
      name: string;
      logo: string;
      id: string;
    };
  };
  applications: {
    id: string;
    candidates: {
      first_name: string;
      email: string;
    };
  };
  users: {
    user_id: string;
    first_name: string;
    profile_image: string;
  }[];
  schedule_time: {
    startTime: string;
    endTime: string;
    user_ids: string[];
  };
};
