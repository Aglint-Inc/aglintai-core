import { createTRPCRouter } from '../../trpc';
import { interview_count } from './interview_count';
import { interview_decline } from './interview_decline';
import { interviewer_leaderboard } from './interviewer_leaderboard';

export const analyticsRouter = createTRPCRouter({
  interview_count,
  interview_decline,
  interviewer_leaderboard,
});
