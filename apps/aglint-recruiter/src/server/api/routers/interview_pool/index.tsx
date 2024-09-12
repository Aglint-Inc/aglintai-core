import { createTRPCRouter } from '../../trpc';
import { interviewPoolUsers } from './users';

export const interviewPool = createTRPCRouter({
  users: interviewPoolUsers,
});
