import OpenAI from "openai";
import { AssistantCreateParams } from "openai/resources/beta/assistants/assistants";
import {
  HandleSQLFunctionMapping,
  HandleSQLFunctionType,
} from "../types/data.types";
import { drizzle } from "drizzle-orm/postgres-js";
import { RunSubmitToolOutputsParams } from "openai/resources/beta/threads/runs/runs";
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
  getChatResponse = async ({
    run,
    db,
    job_id,
    functionCallHandler,
  }: {
    run: OpenAI.Beta.Threads.Runs.Run;
    db?: ReturnType<typeof drizzle>;
    job_id?: string;
    functionCallHandler?: (x: HandleSQLFunctionType) => any;
  }) => {
    let chatRun = run;
    let stopLoop = false;
    return new Promise<{
      assistantMessageId: string;
      message: any;
      runResult: { [key: string]: any };
    }>(async (resolve) => {
      let timeOut = setTimeout(async () => {
        if (
          ["queued", "in_progress", "requires_action"].includes(chatRun.status)
        ) {
          this.beta.threads.runs.cancel(chatRun.thread_id, chatRun.id);
        }
        stopLoop = true;
        throw new Error("chat Run Timeout");
      }, 60000);
      let runResult: { [key: string]: any } = {};
      let quickReturn: string | null = null;
      let tempFunctionCallHandler:
        | ((x: { functionName: string; functionArguments: any }) => any)
        | null = null;
      if (db && job_id && functionCallHandler) {
        tempFunctionCallHandler = ({
          functionName,
          functionArguments,
        }: {
          functionName: string;
          functionArguments: any;
        }) =>
          functionCallHandler({
            db,
            job_id,
            ...HandleSQLFunctionMapping({
              functionName,
              options: functionArguments,
            }),
          });
      }
      while (
        !stopLoop &&
        (chatRun.status === "queued" ||
          chatRun.status === "in_progress" ||
          chatRun.status === "requires_action")
      ) {
        chatRun = await this.beta.threads.runs.retrieve(
          chatRun.thread_id,
          chatRun.id
        );
        if (tempFunctionCallHandler && chatRun.status === "requires_action") {
          try {
            const tools =
              chatRun.required_action?.submit_tool_outputs.tool_calls;
            if (tools?.length) {
              const tool_outputs: RunSubmitToolOutputsParams["tool_outputs"] =
                [];
              for (let tool of tools) {
                const functionName = tool.function.name! as string;
                const functionArguments = JSON.parse(
                  tool.function.arguments! || "{}"
                );
                const reason = functionArguments.reason || "no reason";
                console.log({ functionName, reason, functionArguments });
                const tempData = await tempFunctionCallHandler({
                  functionName,
                  functionArguments,
                });
                runResult[functionName] = {
                  reason,
                  data: tempData,
                  arguments: functionArguments,
                };
                const outputData = JSON.stringify(tempData);
                // functionName === "get_applications"
                //   ? "applications selected"
                //   : JSON.stringify(tempData);

                const output =
                  functionName === "get_applications"
                    ? reason === "filtered_result"
                      ? ((quickReturn = tempData.length
                          ? "quick return used"
                          : "no candidates found!"),
                        `\`\`\`${outputData}\`\`\` return this application_id's in html table formate.`)
                      : outputData
                    : functionName === "get_applications_extra_details"
                    ? reason === "compared_result"
                      ? `\`\`\`${outputData}\`\`\`\n\nResponsibility: return which applicant(use Names as heading) is best fit for job role(in points) only in table formate. Do not return information from input.\n or \n Follow instructions if provided by user for comparison.`
                      : outputData
                    : outputData;
                // console.log({ output });
                tool_outputs.push({
                  // output: `result:'''${outputData}''' return response in html table formate`,
                  output: tempData?.length ? output : "no data found!",
                  tool_call_id: tool.id,
                });
                console.log({ length: tempData.length, tool_outputs });
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
            if (
              ["queued", "in_progress", "requires_action"].includes(
                chatRun.status
              )
            ) {
              this.beta.threads.runs.cancel(chatRun.thread_id, chatRun.id);
            }
            throw error;
          }
        }
        // sleep
        if (quickReturn) break;
        console.log(chatRun.status, { thread_id: chatRun.thread_id });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      console.log({ thread_id: chatRun.thread_id });
      clearTimeout(timeOut);
      if (quickReturn || chatRun.status === "completed") {
        const messageData = (
          await this.beta.threads.messages.list(chatRun.thread_id)
        ).data[0];
        return resolve(
          quickReturn
            ? {
                assistantMessageId: getRandomId(),
                message: quickReturn,
                runResult,
              }
            : {
                assistantMessageId: messageData.id,
                message:
                  // @ts-ignore
                  messageData.content[0].text.value,
                runResult,
              }
        );
      }
      throw new Error(`Run Failed with status: ${chatRun.status}`);
    });
  };
}

const getRandomId = () => {
  const desiredLength = 28;
  let generatedID = "msgx_";
  while (generatedID.length < desiredLength) {
    generatedID += Math.floor(Math.random() * 10); // Random digit
  }
  return generatedID;
};
