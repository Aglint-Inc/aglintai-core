import { supabase } from "./config";
import LoggerV2 from "./logger";
import { PromptResponse, PromptSkillResponse } from "./types";

export const arrayToPrompt = (header: string, content: string[]) => {
  return `${content.map((c, i) => `${header} ${i + 1}. ${c}`).join(`\n`)}`;
};

export const rejectAfterDelay = (ms: number) =>
  new Promise((_, reject) => {
    setTimeout(reject, ms, new Error("Timeout"));
  });

export const getScore = (promptResponse: PromptResponse[]) => {
  if (promptResponse) {
    const count = promptResponse.length;
    if (count === 0) return 0;
    return Math.trunc(
      getFinalScore(
        promptResponse.reduce((acc, curr) => {
          switch (curr.rating) {
            case "low":
              acc += 0;
              break;
            case "medium":
              acc += 50;
              break;
            case "high":
              acc += 100;
              break;
          }
          return acc;
        }, 0) / count,
        count
      )
    );
  }
  return 0;
};

export const getSkillScore = (promptResponse: PromptSkillResponse) => {
  if (promptResponse) {
    const count = Object.keys(promptResponse).length;
    if (count === 0) return 0;
    return Math.trunc(
      getFinalScore(
        Object.values(promptResponse).reduce((acc, curr) => {
          switch (curr) {
            case "low":
              acc += 0;
              break;
            case "medium":
              acc += 50;
              break;
            case "high":
              acc += 100;
              break;
          }
          return acc;
        }, 0) / count,
        count,
        0.65
      )
    );
  }
  return 0;
};

export const getFinalScore = (
  score: number,
  count: number,
  rFactor: number = 0.25 //Inversely proportional to effectiveness of count
) => {
  return getCappedFactor(count, rFactor) * getLogarithmicScore(score);
};

const getLogarithmicScore = (score: number) => {
  if (score < 1) score = 1;
  return 100 * (Math.log(score) / Math.log(100));
};

const getCappedFactor = (count: number, rFactor: number) => {
  return 1 - rFactor ** count;
};

export const getResponse = async ({
  jd_score,
  token = null,
  saved = false,
  error,
  application_id,
  logger,
}: {
  jd_score?: any;
  token?: {
    [key: string]: number;
  } | null;
  saved?: boolean;
  error?: string;
  application_id?: string;
  logger?: LoggerV2;
}) => {
  if (error) {
    if (application_id) {
      console.error({ error });
      await logs(
        {
          application_id,
          logs: {
            function: "resume_scoring_v1",
            error,
          },
        },
        logger
      );
    } else
      logger &&
        logger.createLog(
          {
            error: "application id missing",
            message: "application id missing",
            subProcess: "Response",
          },
          {
            severity: "ERROR",
          }
        );
  } else {
    logger &&
      logger.createLog({
        message: "generating Response",
        subProcess: "Response",
      });
  }
  // logger.end();
  return { jd_score, saved, token, error };
};

export const saveToDB = async (data: any, id: string, logger?: LoggerV2) => {
  if (id.trim() === "") return false;
  console.log({
    data,
    processing_status: { processing_status: "success", ...data },
    id,
  });
  const { error } = await supabase
    .from("applications")
    .update({ processing_status: "success", ...data })
    .eq("id", id)
  if (error) {
    // console.error(error);
    logger &&
      logger.createLog(
        {
          error: String(error),
          subProcess: "saveToDB",
        },
        {
          severity: "ERROR",
        }
      );
  } else {
    logger &&
      logger.createLog(
        {
          message: "updating processing_status tp failed",
          subProcess: "saveToDB",
        },
        {
          severity: "WARNING",
        }
      );
  }
  return !Boolean(error);
};

export const updateResumeJsonDB = async (json_resume: any, id: string) => {
  if (id.trim() === "") return false;
  const { error } = await supabase
    .from("applications")
    .update({ json_resume })
    .eq("application_id", id);
  error && console.error("error", error);
  return !Boolean(error);
};

export const getOverallResumeScore = (scores: any, parameter_weights: any) => {
  return parameter_weights
    ? Math.trunc(
        Object.keys(parameter_weights).reduce((acc, curr) => {
          acc += (scores[curr] * parameter_weights[curr]) / 100;
          return acc;
        }, 0)
      )
    : 0;
};

export const calculateAndSave = async (
  in_score_json: {
    scores: {
      education: number;
      experience: number;
      skills: number;
    };
    badges: {
      skills: number;
      schools: number;
      positions: number;
      leadership: number;
      jobStability: number;
      careerGrowth: number;
    };
    relevance: {};
    reasoning: {} | null;
  },
  app_id: string,
  logger: LoggerV2
) => {
  if (!in_score_json) return false;
    const { error } = await supabase.rpc("calculate_resume_score", {
    in_score_json,
    app_id,
  });
  if (error) {
    // console.error(error);
    logger.createLog(
      {
        error: String(error),
        subProcess: "saveToDB",
      },
      {
        severity: "ERROR",
      }
    );
  } else {
    logger.createLog({
      message: "calculate and updating the db",
      subProcess: "saveToDB",
    });
  }
  return !Boolean(error);
};

export const logToken = async (
  application_id: string,
  token: {
    [key: string]: number;
  },
  task: "scoring" | "reasoning",
  logger: LoggerV2
) => {
  const { error } = await supabase.from("rp_token_usage").insert({
    application_id,
    task,
    token_used_json: token,
    total_token_used: token.total_tokens,
  });
  if (error) {
    // console.error(error);
    logger.createLog(
      {
        error: String(error),
        subProcess: "logToken",
      },
      {
        severity: "ERROR",
      }
    );
  } else {
    logger.createLog({
      message: "updating logs in db",
      subProcess: "logToken",
    });
  }
  return !Boolean(error);
};

export const logs = async (data: any, logger?: LoggerV2) => {
  logger &&
    logger.createLog(
      {
        error: data.logs.error,
        message: String(data.logs.error),
        subProcess: "logs",
      },
      {
        severity: "ERROR",
      }
    );
  await saveToDB(
    {
      processing_status: "failed",
    },
    data.application_id,
    logger
  );
  const { error } = await supabase.from("rp_logs").insert({ ...data });
  if (error) {
    // console.error(error);
    logger &&
      logger.createLog(
        {
          error: String(error),
          subProcess: "logs",
        },
        {
          severity: "ERROR",
        }
      );
  } else {
    logger &&
      logger.createLog({
        message: "updating error logs in db",
        subProcess: "logs",
      });
  }
  return !Boolean(error);
};

// export const newAbortSignal = (timeoutMs: number) => {
//   const abortController = new AbortController();
//   setTimeout(() => {
//     abortController.abort();
//     console.log("Aborting Signal.");
//   }, timeoutMs || 0);
//   return abortController.signal;
// };

// export const getScore = ({
//   relevance,
//   mode,
// }:
//   | {
//       relevance:
//         | "no match"
//         | "less match"
//         | "average match"
//         | "more match"
//         | "perfect match";
//       mode: "five";
//     }
//   | {
//       relevance: "less match" | "average match" | "more match";
//       mode: "three";
//     }) => {
//   if (mode === "three") {
//     return relevance === "more match"
//       ? 100
//       : relevance === "average match"
//       ? 50
//       : 0;
//   } else
//     return relevance === "perfect match"
//       ? 100
//       : relevance === "more match"
//       ? 75
//       : relevance === "average match"
//       ? 50
//       : relevance === "less match"
//       ? 25
//       : 0;
// };

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));
