// export type AssistantMessageType = {
//   message: string;
//   active: boolean;
//   candidates: any[];
//   role: string;

import {
  CandidateType,
  JobApplicationType,
  JobAssistantChatMessages,
} from '@/src/types/data.types';

// };
//@ts-ignore
export interface AssistantMessageInterface extends JobAssistantChatMessages {
  sender: 'You' | 'Assistant';
  content: {
    active: boolean;
    message: ChatInput;
    result_candidates: CandidateDetailsInterface[];
    searchArguments: null;
  };
}

export interface CandidateDetailsInterface extends CandidateType {
  application: JobApplicationType;
}

export type ChatInput = { text: string; html: string; wordCount: number };
