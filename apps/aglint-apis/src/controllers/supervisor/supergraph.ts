/* eslint-disable @typescript-eslint/ban-ts-comment */
import {RunnableLambda} from '@langchain/core/runnables';
import {END, START, StateGraph} from '@langchain/langgraph';
import {BaseMessage} from 'langchain/schema';
import {fetchInterviewTypesChainFunction} from './teams/interviewType/graph';
import {createTeamSupervisor} from './utils/helper';
import {llm} from './utils/llm';
import {scheduleInterviewChainFunction} from './teams/scheduling/graph';

interface State {
  messages: BaseMessage[];
  next: string;
  instructions: string;
}

export const superGraphChainFunction = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const supervisorNode = await createTeamSupervisor(
    llm,
    'You are a supervisor tasked with managing a conversation between the' +
      ' following teams: {team_members}. Given the following user request,' +
      ' respond with the worker to act next. Each worker will perform a' +
      ' task and respond with their results and status. When finished,' +
      ' respond with FINISH.\n\n' +
      ' Select strategically to minimize the number of steps taken.' +
      ' If user request is not related to both teams, respond with FINISH.',
    ['TeamScheduler', 'TeamInterviewScheduler']
  );

  const getMessages = RunnableLambda.from((state: State) => {
    return {messages: state.messages};
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const joinGraph = RunnableLambda.from((response: any) => {
    return {
      messages: [response.messages[response.messages.length - 1]],
    };
  });

  const interviewTypeChain = await fetchInterviewTypesChainFunction({
    recruiter_id,
  });

  const scheduleInterviewChain = await scheduleInterviewChainFunction({
    recruiter_id,
  });

  const superGraph = new StateGraph<State>({
    channels: {
      messages: {
        value: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
        default: () => [],
      },
      next: {
        value: (x: string, y?: string) => y ?? x,
        default: () => 'InterviewScheduler',
      },
      instructions: {
        value: (x: string, y?: string) => y ?? x,
        default: () => "Resolve the user's request.",
      },
    },
  })
    .addNode(
      'TeamScheduler',
      // @ts-ignore
      getMessages.pipe(scheduleInterviewChain).pipe(joinGraph)
    )
    .addNode(
      'TeamInterviewTypeFetcher',
      // @ts-ignore
      getMessages.pipe(interviewTypeChain).pipe(joinGraph)
    )
    // @ts-ignore
    .addNode('supervisor', supervisorNode);

  superGraph.addEdge('TeamScheduler', 'supervisor');
  superGraph.addEdge('TeamInterviewTypeFetcher', 'supervisor');
  superGraph.addConditionalEdges('supervisor', x => x.next, {
    TeamInterviewTypeFetcher: 'TeamInterviewTypeFetcher',
    TeamScheduler: 'TeamScheduler',
    FINISH: END,
  });

  superGraph.addEdge(START, 'supervisor');
  const compiledSuperGraph = superGraph.compile();

  return compiledSuperGraph;
};
