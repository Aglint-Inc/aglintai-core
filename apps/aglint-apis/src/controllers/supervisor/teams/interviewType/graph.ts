/* eslint-disable @typescript-eslint/ban-ts-comment */
import {END, START, StateGraph} from '@langchain/langgraph';
import {fetchInterviewTypesNode} from './nodes/fetchInterviewTypes';
import {researchTeamState} from './state';
import {createInterviewSessionSupervisorAgent} from './supervisoragent';

export const fetchInterviewTypesChainFunction = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const researchGraph = new StateGraph({
    channels: researchTeamState,
  })
    .addNode(
      'fetchInterviewTypes',
      async state => await fetchInterviewTypesNode({state, recruiter_id})
    )
    // @ts-ignore
    .addNode('supervisor', await createInterviewSessionSupervisorAgent());

  // Define the control flow
  researchGraph.addEdge('fetchInterviewTypes', 'supervisor');
  researchGraph.addConditionalEdges('supervisor', x => x.next, {
    fetchInterviewTypes: 'fetchInterviewTypes',
    FINISH: END,
  });

  researchGraph.addEdge(START, 'supervisor');
  const researchChain = researchGraph.compile();

  return researchChain;
};
