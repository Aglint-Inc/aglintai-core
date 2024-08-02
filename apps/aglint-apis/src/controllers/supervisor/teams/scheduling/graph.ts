/* eslint-disable @typescript-eslint/ban-ts-comment */
import {END, START, StateGraph} from '@langchain/langgraph';
import {teamState} from '../../utils/state';
import {scheduleInterviewNode} from './nodes/scheduleInterview';
import {createSchedulingSupervisorAgent} from './supervisoragent';

export const scheduleInterviewChainFunction = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const scheduleInterviewGraph = new StateGraph({
    channels: teamState,
  })
    .addNode(
      'scheduleInterview',
      async state => await scheduleInterviewNode({state, recruiter_id})
    )
    // @ts-ignore
    .addNode('supervisor', await createSchedulingSupervisorAgent());

  // Define the control flow
  scheduleInterviewGraph.addEdge('scheduleInterview', 'supervisor');
  scheduleInterviewGraph.addConditionalEdges('supervisor', x => x.next, {
    scheduleInterview: 'scheduleInterview',
    FINISH: END,
  });
  scheduleInterviewGraph.addEdge(START, 'supervisor');
  const scheduleInterviewChain = scheduleInterviewGraph.compile();
  return scheduleInterviewChain;
};
