/* eslint-disable @typescript-eslint/ban-ts-comment */
import {END, START, StateGraph, StateGraphArgs} from '@langchain/langgraph';
import {BaseMessage} from 'langchain/schema';
import {greetingsNode} from './nodes/greetings/node';
import {interviewTypesReadNode} from './nodes/interviewTypeRead/node';
import {fetchScheduledInterviewsNode} from './nodes/scheduledInterviewsRead/node';
import {createSchedulingSupervisorAgent} from './supervisoragent';
import {TeamState} from './utils/state';
import {CallBackPayload} from './types';
import {fetchRequestsNode} from './nodes/requestsRead/node';
import {fetchJobRelatedNode} from './nodes/jobs/node';

export const agentChain = async ({
  recruiter_id,
  user_id,
  callback,
  job_id,
}: {
  recruiter_id: string;
  user_id: string;
  callback: (x: CallBackPayload) => void;
  job_id?: string;
}) => {
  const teamState: StateGraphArgs<TeamState>['channels'] = {
    messages: {
      value: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
      default: () => [],
    },
    team_members: {
      value: (x: string[], y: string[]) => x.concat(y),
      default: () => [],
    },
    next: {
      value: (x: string, y?: string) => y ?? x,
      default: () => 'supervisor',
    },
    instructions: {
      value: (x: string, y?: string) => y ?? x,
      default: () => "Resolve the user's request.",
    },
  };

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
      'fetchScheduledInterviewsRead',
      async state =>
        await fetchScheduledInterviewsNode({state, recruiter_id, callback})
    )
    // @ts-ignore
    .addNode('supervisor', await createSchedulingSupervisorAgent());

  // Define the control flow
  agent.addEdge('greetingAgent', 'supervisor');
  agent.addEdge('interviewTypesRead', 'supervisor');
  agent.addEdge('requestsRead', 'supervisor');
  agent.addEdge('jobsRelatedRead', 'supervisor');
  agent.addEdge('fetchScheduledInterviewsRead', 'supervisor');
  agent.addConditionalEdges('supervisor', x => x.next, {
    greetingAgent: 'greetingAgent',
    interviewTypesRead: 'interviewTypesRead',
    requestsRead: 'requestsRead',
    jobsRelatedRead: 'jobsRelatedRead',
    fetchScheduledInterviewsRead: 'fetchScheduledInterviewsRead',
    FINISH: END,
  });
  agent.addEdge(START, 'supervisor');
  const agentChain = agent.compile();

  return agentChain;
};
