import { createTRPCRouter } from '../../trpc';
import { candidate } from './candidate';
import { interview } from './interview';
import { interview_count } from './interview_count';
import { interview_decline } from './interview_decline';
import { interviewer_analytics } from './interviewer_analytics';
import { interviewer_leaderboard } from './interviewer_leaderboard';
import { interviewer_rejections } from './interviewer_reject';
import { job } from './job';
import { request_metrics } from './request_metrics';

export const analytics = createTRPCRouter({
  interview_count,
  interview_decline,
  interviewer_leaderboard,
  interviewer_analytics,
  interviewer_rejections,
  request_metrics,
  job,
  candidate,
  interview
});
