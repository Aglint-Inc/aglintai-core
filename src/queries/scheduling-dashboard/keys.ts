import { appKey } from '..';
import { type getInterviewTrainingProgress } from '.';
import { Functions } from './types';

export const schedulingDashboardQueryKeys = {
  all: { queryKey: [appKey, 'scheduling_dashboard'] as string[] },
  interviewMeetingStatusCount: (
    args: Functions['get_interview_meeting_status_count']['Args'],
  ) => ({
    queryKey: [
      ...schedulingDashboardQueryKeys.all.queryKey,
      ...argsToKeys(args),
      'interview_meeting_status_count',
    ] as string[],
  }),
  interviewConversion: (args: Functions['get_conversion_count']['Args']) => ({
    queryKey: [
      ...schedulingDashboardQueryKeys.all.queryKey,
      ...argsToKeys(args),
      'interview_conversion',
    ] as string[],
  }),
  interviewLeaderboard: (
    args: Functions['get_interview_leaderboard']['Args'],
  ) => ({
    queryKey: [
      ...schedulingDashboardQueryKeys.all.queryKey,
      ...argsToKeys(args),
      'interview_leaderboard',
    ] as string[],
  }),
  interviewTrainingProgress: (
    args: Parameters<typeof getInterviewTrainingProgress>[0],
  ) => ({
    queryKey: [
      ...schedulingDashboardQueryKeys.all.queryKey,
      ...argsToKeys(args),
      'interview_training_progress',
    ] as string[],
  }),
  interviewTrainingStatus: (
    args: Functions['get_interview_training_status_count']['Args'],
  ) => ({
    queryKey: [
      ...schedulingDashboardQueryKeys.all.queryKey,
      ...argsToKeys(args),
      'interview_training_status',
    ] as string[],
  }),
} as const;

const argsToKeys = (obj: Object) => {
  return Object.entries(obj).map(([key, value]) => ({ [key]: value }));
};
