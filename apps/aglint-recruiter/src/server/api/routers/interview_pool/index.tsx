import { createTRPCRouter } from '../../trpc';
import { addUsers } from './add_users';
import { archiveGetSessions } from './archive_get_sessions';
import { candidatesModule } from './candidates';
import { createInterviewPool } from './create_pool';
import { deleteUser } from './delete_user';
import { feedbackPool } from './feedback';
import { getAllInterviewPool } from './get_all';
import { interviewPools } from './interview_types';
import { interviewPoolUsers } from './module_and_users';
import { schedulesPool } from './schedules';
import { trainingProgress } from './training_progress';
import { updateInterviewPool } from './update';
import { updateInterviewPoolRelation } from './update_relation';
import { updatePoolTraning } from './update_traning';

export const interview_pool = createTRPCRouter({
  module_and_users: interviewPoolUsers,
  training_progress: trainingProgress,
  candidates: candidatesModule,
  feedbacks: feedbackPool,
  schedules: schedulesPool,
  list: interviewPools,
  create_pool: createInterviewPool,
  add_users: addUsers,
  delete_user: deleteUser,
  update: updateInterviewPool,
  archive_get_sessions: archiveGetSessions,
  get_all: getAllInterviewPool,
  update_pool_relation: updateInterviewPoolRelation,
  update_pool_traning: updatePoolTraning,
});
