import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "@langchain/core/messages";

const extractionFunctionSchema = {
  get_jobs: {
    name: "get_jobs",
    description: "apply for job",
    parameters: {
      type: "object",
      properties: {
        keyWords: {
          type: "array",
          items: {
            type: "string",
          },
        },
        location: {
          type: "object",
          properties: {
            filter: {
              type: "string",
              enum: ["in", "not_in"],
            },
            city: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
        experience_in_months: {
          type: "number",
        },
        offset: {
          type: "number",
        },
        limit: {
          type: "number",
        },
      },
      required: ["candidate_id", "job_id"],
    },
  },
};

export const getFilter = async (message: string) => {
  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo-1106" });

  const result = await model.invoke([new HumanMessage(message)], {
    functions: [extractionFunctionSchema["get_jobs"]],
    function_call: { name: "get_jobs" },
  });
  console.log({ result });
};
