import { createTRPCRouter } from '../../trpc';
import { candidate } from './candidate';
import { interview_count } from './interview_count';
import { interview_decline } from './interview_decline';
import { interviewer_analytics } from './interviewer_analytics';
import { interviewer_leaderboard } from './interviewer_leaderboard';
import { interviewer_rejections } from './interviewer_reject';
import { job } from './job';

export const analytics = createTRPCRouter({
  interview_count,
  interview_decline,
  interviewer_leaderboard,
  interviewer_analytics,
  interviewer_rejections,
  job,
  candidate,
});
