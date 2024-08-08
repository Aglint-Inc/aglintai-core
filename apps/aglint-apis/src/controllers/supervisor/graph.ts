/* eslint-disable @typescript-eslint/ban-ts-comment */
import {CallBackAll} from '@aglint/shared-types';
import {END, START, StateGraph} from '@langchain/langgraph';
import {greetingsNode} from './nodes/greetings/node';
import {interviewTypesReadNode} from './nodes/interviewTypeRead/node';
import {fetchJobRelatedNode} from './nodes/jobs/node';
import {fetchRequestsNode} from './nodes/requestsRead/node';
import {teamScheduledInterviewsNode} from './nodes/scheduledInterviewsTeam/node';
import {teamState} from './state';
import {createSchedulingSupervisorAgent} from './supervisoragent';

export const agentChain = async ({
  recruiter_id,
  user_id,
  callback,
  job_id,
}: {
  recruiter_id: string;
  user_id: string;
  callback: (x: CallBackAll) => void;
  job_id?: string;
}) => {
  const agent = new StateGraph({
    channels: teamState,
  })
    .addNode('greetingAgent', async state => await greetingsNode({state}))
    .addNode(
      'interviewTypesRead',
      async state =>
        await interviewTypesReadNode({state, recruiter_id, callback})
    )
    .addNode(
      'jobsRelatedRead',
      async state =>
        await fetchJobRelatedNode({
          state,
          user_id,
          callback,
          job_id,
          recruiter_id,
        })
    )
    .addNode(
      'requestsRead',
      async state => await fetchRequestsNode({state, user_id, callback})
    )
    .addNode(
      'scheduledInterviewsTeam',
      async state =>
        await teamScheduledInterviewsNode({
          state,
          recruiter_id,
          callback,
          user_id,
        })
    )
    // @ts-ignore
    .addNode('supervisor', await createSchedulingSupervisorAgent());

  // Define the control flow
  agent.addEdge('greetingAgent', 'supervisor');
  agent.addEdge('interviewTypesRead', 'supervisor');
  agent.addEdge('requestsRead', 'supervisor');
  agent.addEdge('jobsRelatedRead', 'supervisor');
  agent.addEdge('scheduledInterviewsTeam', 'supervisor');
  agent.addConditionalEdges('supervisor', x => x.next, {
    greetingAgent: 'greetingAgent',
    interviewTypesRead: 'interviewTypesRead',
    requestsRead: 'requestsRead',
    jobsRelatedRead: 'jobsRelatedRead',
    scheduledInterviewsTeam: 'scheduledInterviewsTeam',
    FINISH: END,
  });
  agent.addEdge(START, 'supervisor');
  const agentChain = agent.compile();

  return agentChain;
};
