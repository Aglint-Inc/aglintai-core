import {BaseMessage} from '@langchain/core/messages';
import {StateGraphArgs} from '@langchain/langgraph';
import {TeamState} from './utils/state';

export const teamState: StateGraphArgs<TeamState>['channels'] = {
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
