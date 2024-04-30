import { Database } from '@/src/types/schema';

import { type useCompanyMembers } from '../company-members';
import { type InterviewModulesType } from '../interview-modules/types';
import { getInterviewTrainingProgress } from '.';

type Enums = Database['public']['Enums'];
export type Functions = Database['public']['Functions'];

export type SchedulingDashboardTypes = {
  interviewMeetingStatus: Functions['get_interview_meeting_status_count']['Returns'];
  interviewLeaderBoard: Functions['get_interview_leaderboard']['Returns'];
  interviewTrainingProgress: InterviewTrainingProgressType;
  interviewConversion: Functions['get_conversion_count']['Returns'];
  interviewTrainingStatus: CustomType<
    Functions['get_interview_training_status_count']['Returns'],
    {
      training_status_count: {
        // eslint-disable-next-line no-unused-vars
        [id in Enums['status_training']]: number;
      };
    }
  >;
};

export type SchedulingDashboardArgs = {
  interviewMeetingStatus: CustomType<
    Functions['get_interview_meeting_status_count']['Args'],
    { type: TimelineType }
  >;
  interviewLeaderBoard: CustomType<
    Functions['get_interview_leaderboard']['Args'],
    { type: TimelineType }
  >;
  interviewTrainingProgress: Parameters<typeof getInterviewTrainingProgress>[0];
  interviewConversion: CustomType<
    Functions['get_conversion_count']['Args'],
    { type: TimelineType }
  >;
  interviewTrainingStatus: Functions['get_interview_training_status_count']['Args'];
};

type TimelineType = 'year' | 'month' | 'week' | 'day';

export type CustomType<
  T,
  U extends T extends any[]
    ? // eslint-disable-next-line no-unused-vars
      Partial<{ [id in keyof T[number]]: any }>
    : // eslint-disable-next-line no-unused-vars
      Partial<{ [id in keyof T]: any }>,
> = T extends any[] ? (Omit<T[number], keyof U> & U)[] : Omit<T, keyof U> & U;

type TrainingTypes = Exclude<Enums['interviewer_type'], 'qualified'>;

type InterviewTrainingProgressType = ({
  recruiter_user: ReturnType<typeof useCompanyMembers>['data'][number];
  module: Pick<InterviewModulesType[number], 'name' | 'settings' | 'id'>;
} & {
  // eslint-disable-next-line no-unused-vars
  count: { [key in TrainingTypes]: number };
})[];
