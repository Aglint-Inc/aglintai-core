import {
  createAgent,
  runAgentNode,
} from 'src/controllers/supervisor/utils/helper';
import {llm} from 'src/controllers/supervisor/utils/llm';
import {TeamState} from 'src/controllers/supervisor/utils/state';
import {fetchScheduledInterviewsTool} from './tools';
import {CallBackPayload} from '../../types';

export const fetchScheduledInterviewsNode = async ({
  state,
  recruiter_id,
  callback,
}: {
  state: TeamState;
  recruiter_id: string;
  callback: (x: CallBackPayload) => void;
}) => {
  const tools = [
    fetchScheduledInterviewsTool({
      recruiter_id,
      callback,
    }),
  ];

  const fetchScheduledInterviewsAgent = await createAgent(
    llm,
    tools,
    'You are a helfful assistant. Call fetch_scheduled_interviews tool if user ask to get scheduled interviews. Dont call the same tool twice in a row.' +
      'If you get stuck take help from user'
  );

  return runAgentNode({
    state,
    agent: fetchScheduledInterviewsAgent,
    name: 'fetchScheduledInterviewsRead',
  });
};
