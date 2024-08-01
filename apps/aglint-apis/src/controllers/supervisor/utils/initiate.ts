import {END, StateGraphArgs} from '@langchain/langgraph';
import {BaseMessage} from 'langchain/schema';

export interface AgentStateChannels {
  messages: BaseMessage[];
  next: string;
}

export const agentStateChannels: StateGraphArgs<AgentStateChannels>['channels'] =
  {
    messages: {
      value: (x?: BaseMessage[], y?: BaseMessage[]) =>
        (x ?? []).concat(y ?? []),
      default: () => [],
    },
    next: {
      value: (x?: string, y?: string) => y ?? x ?? END,
      default: () => END,
    },
  };
