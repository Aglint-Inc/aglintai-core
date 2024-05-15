export type MessageType = {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
};
