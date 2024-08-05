/* eslint-disable @typescript-eslint/ban-ts-comment */
import {END, START, StateGraph, StateGraphArgs} from '@langchain/langgraph';
import {createSchedulingSupervisorAgent} from './supervisoragent';
import {BaseMessage} from 'langchain/schema';
import {TeamState} from '../../utils/state';
import {greetingsNode} from './nodes/greetings/node';
import {requestAvailibilityNode} from './nodes/availibilityRequest/node';

export const candidateAvailabilityRequestAgentChain = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const teamState: StateGraphArgs<TeamState>['channels'] = {
    messages: {
      value: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
      default: () => [],
    },
    team_members: {
      value: (x: string[], y: string[]) => x.concat(y),
      default: () => ['candidateAvailabilityRequestAgent'],
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

  const candidateAvailabilityRequestAgent = new StateGraph({
    channels: teamState,
  })
    .addNode('greetingAgent', async state => await greetingsNode({state}))
    .addNode(
      'candidateAvailabilityRequestAgent',
      async state => await requestAvailibilityNode({state, recruiter_id})
    )
    // @ts-ignore
    .addNode('supervisor', await createSchedulingSupervisorAgent());

  // Define the control flow
  candidateAvailabilityRequestAgent.addEdge('greetingAgent', 'supervisor');
  candidateAvailabilityRequestAgent.addEdge(
    'candidateAvailabilityRequestAgent',
    'supervisor'
  );
  candidateAvailabilityRequestAgent.addConditionalEdges(
    'supervisor',
    x => x.next,
    {
      greetingAgent: 'greetingAgent',
      candidateAvailabilityRequestAgent: 'candidateAvailabilityRequestAgent',
      FINISH: END,
    }
  );
  candidateAvailabilityRequestAgent.addEdge(START, 'supervisor');
  const candidateAvailabilityRequestAgentChain =
    candidateAvailabilityRequestAgent.compile();
  return candidateAvailabilityRequestAgentChain;
};
