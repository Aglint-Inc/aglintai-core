import OpenAI from "openai";
import { AssistantCreateParams } from "openai/resources/beta/assistants/assistants";
import {
  HandleSQLFunctionMapping,
  HandleSQLFunctionType,
} from "../types/data.types";
import { drizzle } from "drizzle-orm/postgres-js";
import { RunSubmitToolOutputsParams } from "openai/resources/beta/threads/runs/runs";
import { threadId } from "worker_threads";
import { json } from "stream/consumers";
interface CustomAssistantCreateParams extends AssistantCreateParams {
  model:
    | "gpt-3.5-turbo"
    | "gpt-3.5-turbo-1106"
    | "gpt-3.5-turbo-16k"
    | "gpt-4"
    | "gpt-4-1106-preview";
}
export class Custom_OpenAI extends OpenAI {
  createAssistant = async (options: CustomAssistantCreateParams) => {
    return (await this.beta.assistants.create(options)).id;
  };
  /**
   * Creates a thread with the given messages.
   * @param messages An array of messages containing the role and content.
   * @returns {Promise<String>} The ID of the created thread.
   */
  createThread = async ({
    messages,
  }: {
    messages: {
      role: "user";
      content: string;
    }[];
  }) => {
    return (
      await this.beta.threads.create({
        messages,
      })
    ).id;
  };

  /**
   * Runs a thread with the specified thread ID and assistant ID.
   * @param {Object} params - The parameters for running the thread.
   * @param {string} params.thread_id - The ID of the thread to run.
   * @param {string} params.assistant_id - The ID of the assistant to use.
   * @returns A promise that resolves with the Run object of running the thread.
   */
  runThread = async ({
    thread_id,
    assistant_id,
  }: {
    thread_id: string;
    assistant_id: string;
  }) => {
    return await this.beta.threads.runs.create(thread_id, {
      assistant_id: assistant_id,
    });
  };

  /**
   * Adds a new message to a thread.
   * @param {string} params.message - The content of the message.
   * @param {string} params.thread_id - The ID of the thread.
   * @return {PromiseLike<string>} The ID of the newly created message.
   */
  addNewMessage = async ({
    message,
    thread_id,
  }: {
    message: string;
    thread_id: string;
  }) => {
    const newMessage = await this.beta.threads.messages.create(thread_id, {
      role: "user",
      content: message,
    });
    return newMessage.id;
  };

  /**
   * Retrieves the run response for a given ID and thread ID.
   * @param {Object} params - The parameters for retrieving the run response.
   * @param {string} params.id - The ID of the run.
   * @param {string} params.thread_id - The ID of the thread.
   * @returns {Promise<{status:chatRun.status; message:{ id:string; message:string }|null}>} - A promise that resolves to an object containing the status and message of the run response.
   */
  getRunResponse = async ({
    id,
    thread_id,
  }: {
    id: string;
    thread_id: string;
  }) => {
    const chatRun = await this.beta.threads.runs.retrieve(thread_id, id);
    if (chatRun.status === "completed") {
      const allMessages = await this.beta.threads.messages.list(
        chatRun.thread_id
      );
      return {
        status: chatRun.status,
        message: {
          id: allMessages.data[0].id,
          text: (
            allMessages.data[0].content[0] as {
              type: string;
              text: { value: string };
            }
          ).text.value,
        },
      };
    }
    return {
      status: chatRun.status,
      message: null,
    };
  };

  /**
   * Retrieves the chat response from the specified run.
   *
   * @param run - The run object containing the chat response.
   * @returns {Promise<string>} The chat response data.
   * @throws Error if the run fails with a status other than "requires_action".
   */
  submitRun = async ({
    thread_id,
    run_id,
    actions,
  }: {
    thread_id: string;
    run_id: string;
    actions: {
      functionName: string;
      functionResult: any;
      type: string;
    };
  }) => {
    const run = await this.beta.threads.runs.retrieve(thread_id, run_id);
    if (run.status === "requires_action") {
      const tools = run.required_action?.submit_tool_outputs.tool_calls;
      if (tools?.length) {
        const tool_outputs: RunSubmitToolOutputsParams["tool_outputs"] = [];
        for (let tool of tools) {
          const functionName = tool.function.name! as string;
          if (functionName === actions.functionName) {
            let outputData = JSON.stringify(actions.functionResult);
            if (actions.type === "resume/linkedIn") {
              outputData = "resume/linkedIn upload. return 'Processing'";
            }
            tool_outputs.push({
              output: outputData,
              tool_call_id: tool.id,
            });
          }
        }
        await this.beta.threads.runs.submitToolOutputs(thread_id, run_id, {
          tool_outputs,
        });
      }
    }
    return run;
  };
  getChatResponse = async ({
    run,
    db,
    functionCallHandler,
  }: {
    run: OpenAI.Beta.Threads.Runs.Run;
    db: ReturnType<typeof drizzle>;
    functionCallHandler: (x: HandleSQLFunctionType) => any;
  }) => {
    let chatRun = run;
    let runDetails: {
      runId: string | null;
      status: "action_required" | "actions_completed" | "in_progress";
      action_type: string | null;
      action: any;
      candidate_id: string | null;
    } = {
      runId: null,
      status: "in_progress",
      action_type: null,
      action: null,
      candidate_id: null,
    };
    let runResult: { [key: string]: any } = {};
    while (
      chatRun.status === "queued" ||
      chatRun.status === "in_progress" ||
      chatRun.status === "requires_action"
    ) {
      chatRun = await this.beta.threads.runs.retrieve(
        chatRun.thread_id,
        chatRun.id
      );
      if (chatRun.status === "requires_action") {
        try {
          const tools = chatRun.required_action?.submit_tool_outputs.tool_calls;
          if (tools?.length) {
            const tool_outputs: RunSubmitToolOutputsParams["tool_outputs"] = [];
            let functionName: string | null = null;
            let functionArguments: any;
            for (let tool of tools) {
              functionName = tool.function.name! as string;
              functionArguments = JSON.parse(tool.function.arguments! || "{}");
              console.log({ functionName, functionArguments });
              let tempData = [];
              if (functionName !== "collect_user_details") {
                tempData = await functionCallHandler({
                  db,
                  ...HandleSQLFunctionMapping({
                    functionName,
                    options: functionArguments,
                  }),
                });
              }
              runResult[functionName] = {
                // reason: functionArguments.reason || "no reason",
                data: tempData,
                arguments: functionArguments,
              };
              const outputData = JSON.stringify(tempData);
              // functionName === "get_applications"
              //   ? "applications selected"
              //   : JSON.stringify(tempData);
              console.log({ outputData });
              tool_outputs.push({
                output: outputData,
                tool_call_id: tool.id,
              });
            }
            if (functionName && functionName === "collect_user_details") {
              runDetails = {
                runId: chatRun.id,
                status: "action_required",
                action_type: functionName,
                action: functionArguments,
                candidate_id: functionArguments.candidate_id,
              };
              break;
            }
            await this.beta.threads.runs.submitToolOutputs(
              chatRun.thread_id,
              chatRun.id,
              {
                tool_outputs: tool_outputs,
              }
            );
          }
        } catch (error) {
          this.beta.threads.runs.cancel(chatRun.thread_id, chatRun.id);
          throw error;
        }
      }
      // sleep
      console.log(chatRun.status);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (chatRun.status === "completed") {
      const messageData = (
        await this.beta.threads.messages.list(chatRun.thread_id)
      ).data[0];
      return {
        assistantMessageId: messageData.id,
        message:
          // @ts-ignore
          messageData.content[0].text.value,
        runResult,
        runDetails: null,
      };
    } else if (runDetails.status === "action_required") {
      return {
        assistantMessageId: null,
        message: null,
        runResult,
        runDetails,
      };
    }
    throw Error(`Run Failed with status: ${chatRun.status}`);
  };
}
