import { openaiApi } from "./api/openai";
import { anthropicApi } from "./api/anthropic";
import LoggerV2 from "./logger";
import { plmAiApi } from "./api/plm";

export const parseJson = async ({
  ai,
  message,
  logger,
}: {
  ai: "openai" | "anthropic" | "pllm";
  message: string;
  logger: LoggerV2;
}) => {
  logger.createLog({
    message: `Switching ai model.`,
    subProcess: "parseJson",
  });
  switch (ai) {
    case "openai":
      return openaiApi({ message, logger });
    case "anthropic":
      return anthropicApi({ message, logger });
    case "pllm":
      return plmAiApi({ message, logger });
    default:
      return {
        result: {},
        token: {
          totalCompletionTokens: 0,
          totalPromptTokens: 0,
          totalExecutionTokens: 0,
        },
      };
  }
};
