import { plmClient } from "../client";
import LoggerV2 from "../logger";
import { schemaObject } from "../schema";

const MODEL_NAME = "tunedModels/t2j-prml0k366ad2";

export const plmAiApi = async ({
  message: input,
  logger,
}: {
  message: string;
  logger: LoggerV2;
}) => {
  logger.createLog({
    message: `using plm model.`,
    subProcess: "plmAiApi",
  });
  // const client = new TextServiceClient();

  const promptString = `parse input to given structure and return output in json.
    input: ${input}
    structure: ${JSON.stringify(schemaObject)}
    output:`;
  const stopSequences: any[] = [];

  const result = await plmClient
    .generateText({
      // required, which model to use to generate the result
      model: MODEL_NAME,
      // optional, 0.0 always uses the highest-probability result
      temperature: 0.7,
      // optional, how many candidate results to generate
      candidateCount: 1,
      // optional, number of most probable tokens to consider for generation
      topK: 40,
      // optional, for nucleus sampling decoding strategy
      topP: 0.95,
      // optional, maximum number of output tokens to generate
      maxOutputTokens: 1024,
      // optional, sequences at which to stop model generation
      stopSequences: stopSequences,
      // optional, safety settings
      safetySettings: [
        {
          category: "HARM_CATEGORY_DEROGATORY",
          threshold: "BLOCK_LOW_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_TOXICITY",
          threshold: "BLOCK_LOW_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_VIOLENCE",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUAL",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_MEDICAL",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
      prompt: {
        text: promptString,
      },
    })
    .then((result: any) => {
      try {
        return JSON.parse(result[0].candidates[0].output);
      } catch (error) {
        throw Error(String(error));
      }
    });
  return {
    result,
    token: {
      totalCompletionTokens: 0,
      totalPromptTokens: 0,
      totalExecutionTokens: 0,
    },
  };
};
