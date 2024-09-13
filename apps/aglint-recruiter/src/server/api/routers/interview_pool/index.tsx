import { createTRPCRouter } from '../../trpc';
import { candidatesModule } from './candidates';
import { feedbackPool } from './feedback';
import { interviewPoolUsers } from './module_and_users';
import { schedulesPool } from './schedules';
import { trainingProgress } from './training_progress';

export const interviewPool = createTRPCRouter({
  module_and_users: interviewPoolUsers,
  training_progress: trainingProgress,
  candidates: candidatesModule,
  feedbacks: feedbackPool,
  schedules: schedulesPool,
});
