import {
  createAgent,
  runAgentNode,
} from 'src/controllers/supervisor/utils/helper';
import {llm} from 'src/controllers/supervisor/utils/llm';
import {fetchInterviewTypesRelations} from './tools/fetchRelations';
import {fetchInterviewTypes} from './tools/fetchInterviewTypes';
import {TeamState} from 'src/controllers/supervisor/utils/state';
import {CallBackPayload} from 'src/controllers/supervisor/main';

export const InterviewTypesReadNode = async ({
  state,
  recruiter_id,
  callback,
}: {
  state: TeamState;
  recruiter_id: string;
  callback: (x: CallBackPayload) => void;
}) => {
  const tools = [
    fetchInterviewTypes({recruiter_id, callback}),
    fetchInterviewTypesRelations({recruiter_id, callback}),
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
