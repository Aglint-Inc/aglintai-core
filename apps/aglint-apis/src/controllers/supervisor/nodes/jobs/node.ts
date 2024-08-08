import {
  createAgent,
  runAgentNode,
} from 'src/controllers/supervisor/utils/helper';
import {llm} from 'src/controllers/supervisor/utils/llm';
import {TeamState} from 'src/controllers/supervisor/utils/state';
import {fetchHiringTeamTool} from './tools/fetchHiringTeam';
import {fetchUserJobs} from './tools/fetchUserJobs';
import {CallBackAll} from '@aglint/shared-utils';

export const fetchJobRelatedNode = async ({
  state,
  job_id,
  callback,
  recruiter_id,
  user_id,
}: {
  state: TeamState;
  job_id: string;
  recruiter_id: string;
  user_id: string;
  callback: (x: CallBackAll) => void;
}) => {
  const tools = [
    fetchUserJobs({
      recruiter_id,
      callback,
      user_id,
    }),
    fetchHiringTeamTool({
      job_id,
      recruiter_id,
      callback,
    }),
  ];

  const fetchUserRequestsAgent = await createAgent(
    llm,
    tools,
    'You are a helfful assistant.' +
      'Call fetch_jobs_user tool if user ask to get his jobs.' +
      'Call fetch_hiring_team tool if user wants to get hiring team for a job' +
      'Dont call the same tool twice in a row.' +
      'If you get stuck take help from user'
  );

  return runAgentNode({
    state,
    agent: fetchUserRequestsAgent,
    name: 'jobsRelatedRead',
  });
};
