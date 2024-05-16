import Anthropic from "@anthropic-ai/sdk";
import { anthropic } from "../client";
import LoggerV2 from "../logger";

export const anthropicApi = async ({
  message,
  logger,
}: {
  message: string;
  logger: LoggerV2;
}) => {
  logger.createLog({
    message: `using anthropic model.`,
    subProcess: "anthropicApi",
  });
  let totalCompletionTokens = 0;
  let totalPromptTokens = 0;
  let totalExecutionTokens = 0;
  const completion = await anthropic.completions.create({
    model: "claude-2.1",
    max_tokens_to_sample: 4000,
    temperature: 0,
    prompt: `Your Task is to extract information from the below resume text in terms of the below format.Generate a JSON object with the following conditions:
    - Let months be in terms numbers where January is 1 and so on.
    - If the data is unavailable, the value should be set to null.
    Format - {{
      "basics": {{
        "email": "",
        "phone": "",
        "social": [
          ""
        ],
        "lastName": "",
        "linkedIn": "",
        "location": "",
        "firstName": "",
        "currentCompany": "",
        "currentJobTitle": ""
      }},
      "skills": [],
      "schools": [
        {{
          "end": {{
            "year": null,
            "month": null
          }},
          "gpa": null,
          "field": "",
          "start": {{
            "year": null,
            "month": null
          }},
          "degree": "",
          "institution": ""
        }}
      ],
      "languages": [],
      "positions": [
        {{
          "end": {{
            "year": null,
            "month": null
          }},
          "org": "",
          "start": {{
            "year": null,
            "month": null
          }},
          "title": "",
          "summary": "",
          "location": ""
        }}
      ],
      "certificates": [""]
    }}
    ${Anthropic.HUMAN_PROMPT} ${message} ${Anthropic.AI_PROMPT}`,
  });
  const result = JSON.parse(
    completion.completion.split("```")[1].replace("json", "") || "{}"
  );
  return {
    result,
    token: { totalCompletionTokens, totalPromptTokens, totalExecutionTokens },
  };
};
