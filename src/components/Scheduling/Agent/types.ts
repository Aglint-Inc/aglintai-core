import { Candidate } from '@/src/types/candidates.types';
import { JobApplcationDB } from '@/src/types/data.types';

export const allFunctions = [
  'fetch-all-interview-panel',
  'find-intersection-confirmed-slot',
  'create-interview-panel',
  'fetch-user-by-name',
  'select-panel-users-for-scheduling',
  'find_available_time_slots',
  'get-all-interviewers',
];

export type FunctionResponse =
  | {
      name: 'fetch-all-interview-panel';
      response: {
        panels: {
          relations: {
            id: string;
            panel_id: string;
            user_id: string;
          }[];
          created_at: string;
          duration_available: JSON;
          id: string;
          name: string;
          recruiter_id: string;
        }[];
        message: string;
      };
    }
  | { name: 'edit-interview-panel-name'; response: any }
  | { name: 'find-intersection-confirmed-slot'; response: any }
  | { name: 'create-interview-panel'; response: any }
  | {
      name: 'fetch-user-by-name';
      response:
        | {
            message: string;
            panels: {
              relations: {
                id: string;
                panel_id: string;
                user_id: string;
              }[];
              created_at: string;
              duration_available: JSON;
              id: string;
              name: string;
              recruiter_id: string;
            }[];
          }
        | {
            message: string;
            users: {
              applications: JobApplcationDB;
              candidate: Candidate;
              job: {
                id: string;
                job_title: string;
                recruiter_id: string;
              };
            }[];
          };
    }
  | {
      name: 'select-panel-users-for-scheduling';
      response: {
        message: string;
        panel: {
          relations: {
            id: string;
            panel_id: string;
            user_id: string;
          }[];
          created_at: string;
          duration_available: JSON;
          id: string;
          name: string;
          recruiter_id: string;
        };
      };
    }
  | { name: 'find_available_time_slots'; response: any }
  | {
      name: 'get-all-interviewers';
      response: {
        message: string;
        users: {
          first_name: string;
          last_name: string;
          user_id: string;
          email: string;
          role: string;
          profile_image: string;
        }[];
      };
    };
