import { createTRPCRouter } from '../../trpc';
import { addUsers } from './add_users';
import { archiveGetSessions } from './archive_get_sessions';
import { candidatesModule } from './candidates';
import { createInterviewPool } from './create_pool';
import { deleteUser } from './delete_user';
import { feedbackPool } from './feedback';
import { interviewPools } from './interview_types';
import { interviewPoolUsers } from './module_and_users';
import { schedulesPool } from './schedules';
import { trainingProgress } from './training_progress';
import { updateInterviewPool } from './update';

export const interview_pool = createTRPCRouter({
  module_and_users: interviewPoolUsers,
  training_progress: trainingProgress,
  candidates: candidatesModule,
  feedbacks: feedbackPool,
  schedules: schedulesPool,
  interview_pool: interviewPools,
  create_pool: createInterviewPool,
  add_users: addUsers,
  delete_user: deleteUser,
  update: updateInterviewPool,
  archive_get_sessions: archiveGetSessions,
});
