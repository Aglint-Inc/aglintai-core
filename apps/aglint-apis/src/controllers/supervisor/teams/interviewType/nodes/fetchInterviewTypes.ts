import {
  createAgent,
  runAgentNode,
} from 'src/controllers/supervisor/utils/helper';
import {llm} from 'src/controllers/supervisor/utils/llm';
import {ResearchTeamState} from '../state';
import {fetchInterviewTypes} from '../tools/fetchInterviewTypes';
import {fetchInterviewTypesRelations} from '../tools/fetchRelations';

export const fetchInterviewTypesNode = async ({
  state,
  recruiter_id,
}: {
  state: ResearchTeamState;
  recruiter_id: string;
}) => {
  const tools = [
    fetchInterviewTypes({recruiter_id}),
    fetchInterviewTypesRelations({recruiter_id}),
  ];

  const fetchInterviewTypesAgent = await createAgent(
    llm,
    tools,
    'You are an assistant who can fetch all interview types or fetch all users inside an interview type. Dont call the same tool twice in a row.'
  );
  return runAgentNode({
    state,
    agent: fetchInterviewTypesAgent,
    name: 'fetchInterviewTypes',
  });
};
