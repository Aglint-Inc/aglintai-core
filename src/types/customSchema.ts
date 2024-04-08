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
            : Table extends 'tasks'
              ? {
                  Row: Omit<
                    Database['public']['Tables'][Table]['Row'],
                    'created_by'
                  > & {
                    created_by: task_created_by;
                  };
                  Insert: Omit<
                    Database['public']['Tables'][Table]['Insert'],
                    'created_by'
                  > & {
                    created_by?: task_created_by;
                  };
                  Update: Omit<
                    Database['public']['Tables'][Table]['Update'],
                    'created_by'
                  > & {
                    created_by?: task_created_by;
                  };
                }
              : Table extends 'sub_task_progress'
                ? {
                    Row: Omit<
                      Database['public']['Tables'][Table]['Row'],
                      'created_by' | 'jsonb_data'
                    > & {
                      created_by: task_created_by;
                      jsonb_data: sub_task_log_jsonb_data;
                    };
                    Insert: Omit<
                      Database['public']['Tables'][Table]['Insert'],
                      'created_by' | 'jsonb_data'
                    > & {
                      created_by?: task_created_by;
                      jsonb_data?: sub_task_log_jsonb_data;
                    };
                    Update: Omit<
                      Database['public']['Tables'][Table]['Update'],
                      'created_by' | 'jsonb_data'
                    > & {
                      created_by?: task_created_by;
                      jsonb_data?: sub_task_log_jsonb_data;
                    };
                  }
                : Database['public']['Tables'][Table];
        }
      : Database['public'][keys];
  };
};

export type DatabaseTable = {
  [Table in keyof CustomDatabase['public']['Tables']]: CustomDatabase['public']['Tables'][Table]['Row'];
};
export type DatabaseTableInsert = {
  [Table in keyof CustomDatabase['public']['Tables']]: CustomDatabase['public']['Tables'][Table]['Insert'];
};
export type DatabaseTableUpdate = {
  [Table in keyof CustomDatabase['public']['Tables']]: CustomDatabase['public']['Tables'][Table]['Update'];
};

type interview_meeting_user_feedback = {
  recommendation: number;
  objective: string;
};

type task_created_by = {
  id?: string;
  name: 'system' | string;
};
type sub_task_log_jsonb_data = {
  [key: string]: any;
};
