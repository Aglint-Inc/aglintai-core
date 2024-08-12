import {
  createAgent,
  runAgentNode,
} from 'src/controllers/supervisor/utils/helper';
import {llm} from 'src/controllers/supervisor/utils/llm';
import {TeamState} from 'src/controllers/supervisor/utils/state';
import {fetchScheduledInterviewsTool} from './tools/fetch_scheduled_interviews';
import {CallBackAll} from '@aglint/shared-types';
import {fetchIssueScheduledInterviewsTool} from './tools/issue_scheduled_interview';
import {fetchDeclinedCandidateInterviewsTool} from './tools/fetch_candidate_declined_interviews';

export const getScheduledInterviewsNode = async ({
  state,
  recruiter_id,
  callback,
  user_id,
}: {
  state: TeamState;
  recruiter_id: string;
  callback: (x: CallBackAll) => void;
  user_id: string;
}) => {
  const tools = [
    fetchScheduledInterviewsTool({
      recruiter_id,
      callback,
      user_id,
    }),
    fetchIssueScheduledInterviewsTool({
      callback,
      user_id,
    }),
    fetchDeclinedCandidateInterviewsTool({
      callback,
      user_id,
    }),
  ];

  const fetchScheduledInterviewsAgent = await createAgent(
    llm,
    tools,
    'You are a helpful assistant.\n\n' +
      'Scheduled interviews or schedules both are the same.\n\n' +
      "Call the 'fetch_scheduled_interviews' tool to get scheduled interviews or upcoming interviews.\n\n" +
      'Call  the "fetch_candidate_declined_interviews" tool to get declined interviews by candidate.\n\n' +
      'Call the "issue_scheduled_interviews" tool to get scheduled interviews with issues.\n\n' +
      'Do not call the same tool twice in a row. If you get stuck, ask the user for help.'
  );

  return runAgentNode({
    state,
    agent: fetchScheduledInterviewsAgent,
    name: 'getScheduledInterviews',
  });
};
