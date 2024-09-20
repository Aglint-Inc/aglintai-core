import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";
import { calculateAndSave, getResponse, logToken } from "./util";

import dotenv from "dotenv";
import { scoring } from "./scoring";
import {
  openAiRatingPromptBuilder,
  openAiReasoningPromptBuilder,
} from "./openAiPromptBuilder";
import {
  anthropicResultParser,
  geminiRatingResultParser,
  openAiRatingResultParser,
  openAiReasoningResultParser,
} from "./resultParser";
import { candidateInsights } from "./candidateInsights";
import { getLists } from "./getLists";
import axios from "axios";
import { anthropicPromptBuilder } from "./anthropicPromptBuilder";
import {
  AnthropicPromptBuilderResponse,
  GeminiPromptBuilderResponse,
  OpenAiPromptBuilderResponse,
} from "./types";
import { geminiRatingPromptBuilder } from "./geminiPromptBuilder";
import LoggerV2 from "./logger";

dotenv.config();
const review_candidate_application = process.env.REVIEW_CANDIDATE;

if (!review_candidate_application) {
  throw new Error("REVIEW_CANDIDATE environment variables are required.");
}

export const hello: HttpFunction = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    const {
      resume_json,
      jd_json,
      application_id,
      loggerDetails,
      model = "openai",
      test = false,
    } = req.body as {
      resume_json: any;
      jd_json: any;
      application_id: string;
      loggerDetails: { [key: string]: string };
      model?: "openai" | "anthropic" | "gemini";
      test?: boolean;
    };
    if (!resume_json && !jd_json) {
      return res.status(400).send(
        await getResponse({
          error: "Invalid request. Required payload missing.",
        })
      );
    }
    const logger = new LoggerV2(
      "logger-test",
      {
        labels: {
          function: "resume_scoring_v2",
          ...loggerDetails,
        },
        resource: {
          type: "global",
        },
        severity: "INFO",
      },
      {
        timestamp: new Date().toISOString(),
        subProcess: "main",
        status: "logger-init",
      }
    );

    logger.createLog(
      {
        message: `request received for: ${application_id}`,
      },
      {
        severity: "DEFAULT",
      }
    );
    try {
      const tempResult = (async () => {
        logger.createLog({
          message: `prompt sent started`,
          subProcess: "main",
        });
        const results =
          model === "openai"
            ? await openAiRatingPromptBuilder(jd_json, resume_json)
            : model === "gemini"
            ? await geminiRatingPromptBuilder(jd_json, resume_json)
            : await anthropicPromptBuilder(jd_json, resume_json);
        logger.createLog({
          message: `response recieved, scoring function started`,
          subProcess: "main",
        });

        // handel Error
        const errorRes = results?.find((obj) => Boolean(obj.error));
        if (errorRes) {
          throw new Error(errorRes.error?.message || "Internal server error!");
        }

        const resultObj = results
          ? model === "openai"
            ? openAiRatingResultParser(results as OpenAiPromptBuilderResponse)
            : model === "gemini"
            ? geminiRatingResultParser(results as GeminiPromptBuilderResponse)
            : anthropicResultParser(results as AnthropicPromptBuilderResponse)
          : null;
        const badges = resultObj
          ? candidateInsights(resultObj, resume_json)
          : {
              skills: 0,
              schools: 0,
              positions: 0,
              leadership: 0,
              jobStability: 0,
              careerGrowth: 0,
            };
        const relevance = resultObj
          ? getLists(resultObj)
          : {
              skills: null,
              schools: null,
              positions: null,
            };
        const response = resultObj ? scoring(resultObj) : null;
        logger.createLog({
          message: `scoring function completed`,
          subProcess: "main",
        });
        const scores = {
          education: response?.schools.score || 0,
          experience: response?.positions.score || 0,
          skills: response?.skills.score || 0,
        };
        logger.createLog({
          message: `Reasoning function started`,
          subProcess: "main",
        });
        const reasoningResponse =
          test && model !== "openai"
            ? null
            : await openAiReasoningPromptBuilder(
                jd_json,
                resume_json,
                resultObj,
                badges
              );
        logger.createLog({
          message: `Reasoning function completed`,
          subProcess: "main",
        });
        const reasoning =
          test && model !== "openai"
            ? null
            : openAiReasoningResultParser(reasoningResponse);
        let saved = false;
        const token: { [key: string]: number } = {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0,
        };
        const reasoning_token: { [key: string]: number } = {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0,
        };
        const jd_score = { scores, badges, relevance, reasoning };
        if (!test && application_id) {
          saved = await calculateAndSave(jd_score, application_id, logger);
          axios
            .post(review_candidate_application, {
              application_id,
            })
            .catch((e) => {
              // do noting
            });
          if (response) {
            [
              ...(response.schools.list || []),
              ...(response.positions.list || []),
              {
                tokens: response.skills?.tokens || {
                  prompt_tokens: 0,
                  completion_tokens: 0,
                  total_tokens: 0,
                },
              },
            ].map((data) => {
              Object.entries(data.tokens).map(([key, val]) => {
                token[String(key)] += Number(val);
              });
            });
            [
              ...(reasoningResponse?.map((r) => {
                return {
                  tokens: r?.data?.tokens || {
                    prompt_tokens: 0,
                    completion_tokens: 0,
                    total_tokens: 0,
                  },
                };
              }) || []),
            ].map((data) => {
              Object.entries(data.tokens).map(([key, val]) => {
                reasoning_token[String(key)] += Number(val);
              });
            });
            await Promise.allSettled([
              logToken(application_id, token, "scoring", logger),
              logToken(application_id, reasoning_token, "reasoning", logger),
            ]);
          }
        }
        return {
          jd_score: jd_score,
          saved,
          token,
          application_id,
          logger,
        };
      })();
      const result = await Promise.race([tempResult, timeoutPro()]);
      if (res.headersSent) return;
      return res
        .status(200)
        .json(
          await getResponse(result as unknown as Awaited<typeof tempResult>)
        );
    } catch (error) {
      if (res.headersSent) return;
      let errorMessage = "Internal Server Error at: resume_scoring_v1.";
      if (typeof error === "string") {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return res.status(200).json(
        await getResponse({
          error: errorMessage,
          application_id,
          logger,
        })
      );
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send(await getResponse({ error: "Method Not Allowed!" }));
    return;
  }
};

export const runtime = "edge";

const timeoutPro = async () => {
  return new Promise((_, rej) => {
    setTimeout(() => {
      rej("Manual Timeout");
    }, 1000 * 90); // 90 sec
  });
};
