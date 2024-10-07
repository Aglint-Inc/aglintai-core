import type { DatabaseEnums } from '@aglint/shared-types';

export type FeedbackWindowInterviewersType = {
  [key: string]: {
    feedback: {
      recommendation: number;
      objective: string;
    };
    user_id: string;
    session: {
      id: string;
      title: string;
      created_at: string;
      time: {
        start: string;
        end: string;
      };
      status:
        | 'waiting'
        | 'confirmed'
        | 'completed'
        | 'cancelled'
        | 'reschedule'
        | 'not_scheduled';
      session_type: DatabaseEnums['session_type'];
    };
    relation_id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
    position: string;
  }[];
};
