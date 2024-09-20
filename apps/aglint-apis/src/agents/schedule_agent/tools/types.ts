import {ChatCompletionTool} from 'openai/resources/index.mjs';

export type OpenAiFuncType = {
  tool_def: ChatCompletionTool;
  func: any;
};
