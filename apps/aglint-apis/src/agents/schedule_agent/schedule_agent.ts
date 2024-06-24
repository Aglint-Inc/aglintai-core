import {envConfig} from '../../config';
import OpenAI from 'openai';
import {ScheduleTool} from '../../types/app_types/scheduleAgentTypes';
import {
  CustomLlmResponse,
  Utterance,
  CustomLlmRequest,
  FunctionCall,
} from '../../types/retell.types';
import {LoggerType} from '../../utils/scheduling_utils/getCandidateLogger';
import WebSocket from 'ws';
import {agentPrompt} from './agent_prompt';
import {cancelInterview} from './tools/cancel-interview';
import {endCall} from './tools/end-call';
import {findInterviewSlots} from './tools/find-interview-slots';
import {scheduleInterviewSlot} from './tools/schedule-interview-slot';
import {OpenAiFuncType} from './tools/types';
import {
  addToolInvocToCandCache,
  removeToolInvocFromCandCache,
} from '../../utils/scheduling_utils/tool_utils';
import {scheduleTheCall} from './tools/schedule-call';
import {findCandTimeZone} from './tools/find-time-zone';
import {appLogger} from '../../services/logger';

export class ScheduleAgent {
  // private candidate: CandidateInfoType;
  private candidate_phone: string;
  private llm: OpenAI;
  private tools: OpenAiFuncType[];
  private call_sid: string;
  private logger: LoggerType;
  private is_drafting_stopped: boolean;
  constructor(_callSid: string, _candidate_phone: string, _logger: LoggerType) {
    this.tools = [
      endCall(),
      findInterviewSlots(),
      cancelInterview(),
      scheduleInterviewSlot(),
      scheduleTheCall(),
      findCandTimeZone(),
    ];
    this.call_sid = _callSid;
    this.candidate_phone = _candidate_phone;
    this.llm = new OpenAI({
      apiKey: envConfig.OPENAI_APIKEY,
    });
    this.logger = _logger;
    this.is_drafting_stopped = false;
  }

  BeginMessage(ws: WebSocket, begin_message: string) {
    const res: CustomLlmResponse = {
      response_type: 'response',
      response_id: 0,
      content: begin_message,
      content_complete: true,
      end_call: false,
    };
    ws.send(JSON.stringify(res));
  }

  private ConversationToChatRequestMessages(conversation: Utterance[]) {
    const result: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
    for (const turn of conversation) {
      result.push({
        role: turn.role === 'agent' ? 'assistant' : 'user',
        content: turn.content,
      });
    }
    return result;
  }

  private async PreparePrompt(
    request: CustomLlmRequest,
    funcResult?: FunctionCall
  ) {
    const transcript = this.ConversationToChatRequestMessages(
      request.transcript
    );

    const requestMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
      [
        {
          role: 'system',
          content: await agentPrompt(this.candidate_phone),
        },
      ];
    for (const message of transcript) {
      requestMessages.push(message);
    }

    // Populate func result to prompt so that GPT can know what to say given the result
    if (funcResult) {
      // add function call to prompt
      requestMessages.push({
        role: 'assistant',
        content: null,
        tool_calls: [
          {
            id: funcResult.id,
            type: 'function',
            function: {
              name: funcResult.funcName,
              arguments: JSON.stringify(funcResult.arguments),
            },
          },
        ],
      });
      // add function call result to prompt
      requestMessages.push({
        role: 'tool',
        tool_call_id: funcResult.id,
        content: funcResult.result || '',
      });
    }

    if (request.interaction_type === 'reminder_required') {
      requestMessages.push({
        role: 'user',
        content: '(Now the user has not reponded in a while, you would say:)',
      });
    }
    return requestMessages;
  }

  // on ws connectiion closes call this method
  public stopAgentDrafting() {
    this.is_drafting_stopped = true;
  }

  // Step 2: Prepare the function calling defition to the prompt
  // Done in tools import
  async DraftResponse(
    ws: WebSocket,
    request: CustomLlmRequest,
    funcResult?: FunctionCall
  ) {
    if (this.is_drafting_stopped) return;
    // If there are function call results, add it to prompt here.
    const requestMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
      await this.PreparePrompt(request, funcResult);

    let funcCall: FunctionCall | undefined;
    let funcArguments = '';

    try {
      const events = await this.llm.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        // model: "gpt-4-turbo-preview",
        messages: requestMessages,
        stream: true,
        temperature: 0.1,
        max_tokens: 200,
        frequency_penalty: 1.0,
        presence_penalty: 1.0,
        // Step 3: Add the  function into your requsts
        tools: this.tools.map(t => t.tool_def),
      });
      for await (const event of events) {
        if (event.choices.length >= 1) {
          const delta = event.choices[0].delta;
          //if (!delta || !delta.content) continue;
          if (!delta) continue;

          // Step 4: Extract the functions
          if (delta.tool_calls && delta.tool_calls.length >= 1) {
            const toolCall = delta.tool_calls[0];
            // Function calling here
            if (toolCall.id) {
              if (funcCall) {
                // Another function received, old function complete, can break here
                // You can also modify this to parse more functions to unlock parallel function calling
                appLogger.error('parallel function call triggered');
                break;
              } else {
                funcCall = {
                  id: toolCall.id,
                  funcName: toolCall.function?.name || '',
                  arguments: {},
                };
              }
            } else {
              // append argument
              funcArguments += toolCall.function?.arguments || '';
            }
          } else if (delta.content) {
            const res: CustomLlmResponse = {
              response_type: 'response',
              response_id: request.response_id,
              content: delta.content,
              content_complete: false,
              end_call: false,
            };
            ws.send(JSON.stringify(res));
          }
        }
      }
    } catch (err) {
      console.error('Error in gpt stream: ', err);
    } finally {
      if (!funcCall) {
        const res: CustomLlmResponse = {
          response_type: 'response',
          response_id: request.response_id,
          content: '',
          content_complete: true,
          end_call: false,
        };
        ws.send(JSON.stringify(res));
      } else {
        this.callAgentTools(ws, request, funcCall, funcArguments);
      }
    }
  }
  async callAgentTools(
    ws: WebSocket,
    request: CustomLlmRequest,
    funcCall: FunctionCall,
    func_args: string
  ) {
    const func_name = funcCall.funcName as ScheduleTool;
    addToolInvocToCandCache(this.candidate_phone, func_name);
    funcCall.arguments = JSON.parse(func_args);

    if (func_name === 'end-call') {
      const {func} = endCall();
      func({
        callSid: this.call_sid,
        ws: ws,
        logger: this.logger,
      });
    } else if (func_name === 'schedule-interterview') {
      appLogger.info('called', func_name);

      funcCall.arguments = JSON.parse(func_args);
      const {func} = scheduleInterviewSlot();
      funcCall.result = await func(
        funcCall.arguments,
        this.candidate_phone,
        this.logger
      );
    } else if (func_name === 'find-interview-slots') {
      const {func} = findInterviewSlots();
      funcCall.result = await func(
        funcCall.arguments,
        this.candidate_phone,
        this.logger
      );
    } else if (func_name === 'cancel-scheduled-interview') {
      const {func} = cancelInterview();
      funcCall.result = await func(
        funcCall.arguments,
        this.candidate_phone,
        this.logger
      );
    } else if (func_name === 'schedule-call') {
      const {func} = scheduleTheCall();
      funcCall.result = await func({
        args: funcCall.arguments,
        cand_phone: this.candidate_phone,
        candLogger: this.logger,
      });
    } else if (func_name === 'find-time-zone') {
      const {func} = findCandTimeZone();
      funcCall.result = await func({
        args: funcCall.arguments,
        cand_phone: this.candidate_phone,
        candLogger: this.logger,
      });
    } else {
      appLogger.info('didnt find func', funcCall.funcName);
    }

    if (funcCall.result) {
      appLogger.info('result', funcCall.result);
      this.DraftResponse(ws, request, funcCall);
    }
    await removeToolInvocFromCandCache(this.candidate_phone, func_name);
  }
}
