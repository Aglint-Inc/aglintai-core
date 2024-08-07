import {
  createAgent,
  runAgentNode,
} from 'src/controllers/supervisor/utils/helper';
import {llm} from 'src/controllers/supervisor/utils/llm';
import {TeamState} from 'src/controllers/supervisor/utils/state';
import {fetchInterviewTypesTool} from './tools/fetchInterviewTypes';
import {fetchInterviewTypesRelationsTool} from './tools/fetchRelations';
import { CallBackAll } from '@aglint/shared-utils';

export const interviewTypesReadNode = async ({
  state,
  recruiter_id,
  callback,
}: {
  state: TeamState;
  recruiter_id: string;
  callback: (x: CallBackAll) => void;
}) => {
  const tools = [
    fetchInterviewTypesTool({recruiter_id, callback}),
    fetchInterviewTypesRelationsTool({recruiter_id, callback}),
  ];

  const fetchInterviewTypesAgent = await createAgent(
    llm,
    tools,
    'You are an assistant.' +
      'call fetch_interview_types tool if user ask to get interview types' +
      'call fetch_interview_types_users tool if user wants to list users or interviewers in it, given name of the interview type' +
      'Dont call the same tool twice in a row.'
  );
  return runAgentNode({
    state,
    agent: fetchInterviewTypesAgent,
    name: 'interviewTypesRead',
  });
};
