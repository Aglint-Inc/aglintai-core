import {CallBackAll} from '@aglint/shared-types';
import {
  createAgent,
  runAgentNode,
} from 'src/controllers/supervisor/utils/helper';
import {llm} from 'src/controllers/supervisor/utils/llm';
import {TeamState} from 'src/controllers/supervisor/utils/state';
import {fetchDeclinedCandidateInterviewsTool} from './tools/fetch_candidate_declined_interviews';

export const getDeclinedInterviewsNode = async ({
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
    fetchDeclinedCandidateInterviewsTool({
      recruiter_id,
      callback,
      user_id,
    }),
  ];

  const fetchScheduledInterviewsAgent = await createAgent(
    llm,
    tools,
    'You are a helpful assistant.\n\n' +
      "Call the 'fetch_candidate_declined_interviews' tool only if the user asks to get candidate declined interviews.\n\n" +
      'Do not call the same tool twice in a row. If you get stuck, ask the user for help.'
  );

  return runAgentNode({
    state,
    agent: fetchScheduledInterviewsAgent,
    name: 'getDeclinedInterviews',
  });
};
