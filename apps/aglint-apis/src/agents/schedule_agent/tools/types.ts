import {ChatCompletionTool} from 'openai/resources';

export type OpenAiFuncType = {
  tool_def: ChatCompletionTool;
  func: any;
};
