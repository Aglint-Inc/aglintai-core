import { JobAssistantChatMessages } from '@aglint/shared-types';

import { Application } from '@/src/types/applications.types';

export interface AssistantMessageInterface extends JobAssistantChatMessages {
  sender: 'You' | 'Assistant';
  content: {
    active: boolean;
    message: ChatInput;
    result_applications: Application[];
    searchArguments: null;
  };
}

export type ChatInput = { text: string; html: string; wordCount: number };
