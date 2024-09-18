
import { createTRPCRouter } from '@/server/api/trpc';

import { candidate_pipeline } from './candidate_pipeline';
import { interview_statistics } from './interview_statistics';
import { interviewer_performance } from './interviewer_performance';

export const interview = createTRPCRouter({
  interview_statistics,
  candidate_pipeline,
  interviewer_performance
});
