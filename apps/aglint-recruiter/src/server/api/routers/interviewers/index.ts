import { createTRPCRouter } from '../../trpc';
import { getAllInterviewers } from './all_interviewers';
import { getInterviewerDetails } from './interviewer_detail';

export const interviewerRouter = createTRPCRouter({
  get_all_interviewers: getAllInterviewers,
  get_user_details: getInterviewerDetails,
});
