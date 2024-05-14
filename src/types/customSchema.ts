import { Database } from './schema';

export type CustomDatabase = {
  public: {
    [keys in keyof Database['public']]: keys extends 'Tables'
      ? {
          [Table in keyof Database['public']['Tables']]: Table extends 'interview_session_relation' // interview_session_relation table
            ? {
                Row: Omit<
                  Database['public']['Tables'][Table]['Row'],
                  'feedback'
                > & {
                  feedback: interview_session_relation_user_feedback | null;
                };
                Insert: Omit<
                  Database['public']['Tables'][Table]['Insert'],
                  'feedback'
                > & {
                  feedback?: interview_session_relation_user_feedback;
                };
                Update: Omit<
                  Database['public']['Tables'][Table]['Update'],
                  'feedback'
                > & {
                  feedback?: interview_session_relation_user_feedback;
                };
                Relationships: Database['public']['Tables'][Table]['Relationships'];
              }
            : Table extends 'new_tasks' // new Task
              ? {
                  Row: Omit<
                    Database['public']['Tables'][Table]['Row'],
                    'schedule_date_range'
                  > & {
                    schedule_date_range: new_task_schedule_date_range;
                  };
                  Insert: Omit<
                    Database['public']['Tables'][Table]['Insert'],
                    'schedule_date_range'
                  > & {
                    schedule_date_range?: new_task_schedule_date_range;
                  };
                  Update: Omit<
                    Database['public']['Tables'][Table]['Update'],
                    'schedule_date_range'
                  > & {
                    schedule_date_range?: new_task_schedule_date_range;
                  };
                  Relationships: Database['public']['Tables'][Table]['Relationships'];
                }
              : Table extends 'new_tasks_progress'
                ? {
                    Row: Omit<
                      Database['public']['Tables'][Table]['Row'],
                      'jsonb_data' | 'title_meta'
                    > & {
                      jsonb_data: sub_task_log_jsonb_data;
                      title_meta: {
                        '{time_format}': string;
                        '{candidate}': string;
                        '{date_format}': string;
                        '{location}': string;
                        '{err_msg}': string;
                      };
                    };
                    Insert: Omit<
                      Database['public']['Tables'][Table]['Insert'],
                      'jsonb_data'
                    > & {
                      jsonb_data?: sub_task_log_jsonb_data;
                    };
                    Update: Omit<
                      Database['public']['Tables'][Table]['Update'],
                      'jsonb_data'
                    > & {
                      jsonb_data?: sub_task_log_jsonb_data;
                    };
                    Relationships: Database['public']['Tables'][Table]['Relationships'];
                  }
                : Table extends 'recruiter'
                  ? {
                      Row: Omit<
                        Database['public']['Tables'][Table]['Row'],
                        'scheduling_settings' | 'scheduling_reason'
                      > & {
                        scheduling_settings: recruiter_scheduling_settings;
                        scheduling_reason?: recruiter_scheduling_reason | null;
                      };
                      Insert: Omit<
                        Database['public']['Tables'][Table]['Insert'],
                        'scheduling_settings' | 'scheduling_reason'
                      > & {
                        scheduling_settings?: recruiter_scheduling_settings;
                        scheduling_reason?: recruiter_scheduling_reason;
                      };
                      Update: Omit<
                        Database['public']['Tables'][Table]['Update'],
                        'scheduling_settings' | 'scheduling_reason'
                      > & {
                        scheduling_settings?: recruiter_scheduling_settings;
                        scheduling_reason?: recruiter_scheduling_reason;
                      };
                      Relationships: Database['public']['Tables'][Table]['Relationships'];
                    }
                  : Table extends 'recruiter_user'
                    ? {
                        Row: Omit<
                          Database['public']['Tables'][Table]['Row'],
                          'scheduling_settings'
                        > & {
                          scheduling_settings: recruiter_scheduling_settings;
                        };
                        Insert: Omit<
                          Database['public']['Tables'][Table]['Insert'],
                          'scheduling_settings'
                        > & {
                          scheduling_settings?: recruiter_scheduling_settings;
                        };
                        Update: Omit<
                          Database['public']['Tables'][Table]['Update'],
                          'scheduling_settings'
                        > & {
                          scheduling_settings?: recruiter_scheduling_settings;
                        };
                        Relationships: Database['public']['Tables'][Table]['Relationships'];
                      }
                    : // interview_session_cancel table
                      Table extends 'interview_session_cancel'
                      ? {
                          Row: Omit<
                            Database['public']['Tables'][Table]['Row'],
                            'other_details'
                          > & {
                            other_details: interview_session_cancel_other_details;
                          };
                          Insert: Omit<
                            Database['public']['Tables'][Table]['Insert'],
                            'other_details'
                          > & {
                            other_details?: interview_session_cancel_other_details;
                          };
                          Update: Omit<
                            Database['public']['Tables'][Table]['Update'],
                            'other_details'
                          > & {
                            other_details?: interview_session_cancel_other_details;
                          };
                          Relationships: Database['public']['Tables'][Table]['Relationships'];
                        }
                      : // interview_meeting table
                        Table extends 'applications'
                        ? {
                            Row: Omit<
                              Database['public']['Tables'][Table]['Row'],
                              'feedback'
                            > & {
                              feedback: applications_feedback;
                            };
                            Insert: Omit<
                              Database['public']['Tables'][Table]['Insert'],
                              'feedback'
                            > & {
                              feedback?: applications_feedback;
                            };
                            Update: Omit<
                              Database['public']['Tables'][Table]['Update'],
                              'feedback'
                            > & {
                              feedback?: applications_feedback;
                            };
                            Relationships: Database['public']['Tables'][Table]['Relationships'];
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

export type DatabaseEnums = CustomDatabase['public']['Enums'];

type interview_session_relation_user_feedback = {
  recommendation: number;
  objective: string;
} | null;

type new_task_schedule_date_range = {
  start_date: string;
  end_date: string;
};
type sub_task_log_jsonb_data = {
  [key: string]: any;
};

interface recruiter_scheduling_settings {
  isAutomaticTimezone: boolean;
  timeZone: {
    label: string;
    name: string;
    tzCode: string;
    utc: string;
  };
  interviewLoad: {
    dailyLimit: {
      value: number;
      type: 'Hours' | 'Interviews';
    };
    weeklyLimit: {
      value: number;
      type: 'Hours' | 'Interviews';
    };
  };
  workingHours: {
    day: string;
    isWorkDay: boolean;
    timeRange: {
      startTime: string;
      endTime: string;
    };
  }[];
  totalDaysOff: {
    date: string;
    event_name: string;
    locations: string[];
  }[];
  schedulingKeyWords: {
    free: any[];
    SoftConflicts: any[];
    outOfOffice: string[];
    recruitingBlocks: string[];
  };
  break_hour: {
    start_time: string;
    end_time: string;
  };
}

type recruiter_scheduling_reason = {
  company?: {
    rescheduling?: string[];
    cancelation?: string[];
    decline?: string[];
  };
  candidate?: { rescheduling?: string[]; cancelation?: string[] };
};

type interview_session_cancel_other_details = {
  dateRange?: { start: string; end: string };
  note?: string;
};

type applications_feedback = {
  schedule: { feedback: string; rating: number };
  sessions?: { [key: string]: { rating: number; feedback: string } };
};
