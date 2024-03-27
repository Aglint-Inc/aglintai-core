import { Database } from './schema';

export type CustomDatabase = {
  public: {
    [keys in keyof Database['public']]: keys extends 'Tables'
      ? {
          [Table in keyof Database['public']['Tables']]: Table extends 'interview_meeting_user'
            ? {
                Row: Omit<
                  Database['public']['Tables'][Table]['Row'],
                  'feedback'
                > & {
                  feedback: interview_meeting_user_feedback | null;
                };
                Insert: Omit<
                  Database['public']['Tables'][Table]['Insert'],
                  'feedback'
                > & {
                  feedback?: interview_meeting_user_feedback;
                };
                Update: Omit<
                  Database['public']['Tables'][Table]['Update'],
                  'feedback'
                > & {
                  feedback: interview_meeting_user_feedback;
                };
              }
            : Database['public']['Tables'][Table];
        }
      : Database['public'][keys];
  };
};

type interview_meeting_user_feedback = {
  recommendation: number;
  objective: string;
};
