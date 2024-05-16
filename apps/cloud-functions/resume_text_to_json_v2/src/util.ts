import { supabase } from "./client";
import LoggerV2 from "./logger";

export const getResponse = ({
  json,
  embeddings,
  token = null,
  saved = false,
  error,
  logger,
  application_id,
}: {
  json?: any;
  embeddings?: any;
  token?: {
    totalCompletionTokens: number;
    totalPromptTokens: number;
    totalExecutionTokens: number;
  } | null;
  saved?: boolean;
  error?: string;
  logger?: LoggerV2;
  application_id?: string;
}) => {
  if (error && logger && application_id) {
    logs(
      {
        application_id,
        logs: {
          function: "resume_text_to_json_v1",
          error,
        },
      },
      logger
    );
  } else {
    logger?.createLog({
      message: "generating Response",
      subProcess: "getResponse",
    });
  }
  // error && console.error(error);
  // if(error){
  //   logger.createLog({
  //     message: `request received for: ${application_id}`,
  //     subProcess: "getResponse",
  //   });
  // }
  // logger.end();
  return { json, embeddings, saved, token, error };
};

export const saveToDB = async ({
  table,
  data,
  id,
  logger,
}: {
  table: "application" | "candidate_files";
  data: any;
  id: string;
  logger: LoggerV2;
}) => {
  if (id.trim() === "") return false;
  const { error } = await supabase
    .from(table)
    .update({ ...data })
    .eq("id", id);
  if (error) {
    // console.error(error);
    logger.createLog(
      {
        error: String(error),
        subProcess: `saveToDB: ${table}`,
      },
      {
        severity: "ERROR",
      }
    );
  } else {
    logger.createLog({
      message: `updating db ${table}`,
      subProcess: "saveToDB",
    });
  }
  return !Boolean(error);
};

export const logToken = async (
  application_id: string,
  token: {
    totalCompletionTokens: number;
    totalPromptTokens: number;
    totalExecutionTokens: number;
  },
  logger: LoggerV2
) => {
  const { error } = await supabase.from("rp_token_usage").insert({
    application_id,
    task: "json",
    token_used_json: token,
    total_token_used: token.totalExecutionTokens,
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
      message: "updating db",
      subProcess: "logToken",
    });
  }
  return !Boolean(error);
};

export const logs = async (data: any, logger: LoggerV2) => {
  await supabase
    .from("job_applications")
    .update({
      api_status: "failed",
    })
    .eq("application_id", data.application_id);
  const { error } = await supabase.from("rp_logs").insert({ ...data });
  if (error) {
    // console.error(error);
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
    logger.createLog({
      message: "updating db",
      subProcess: "logs",
    });
  }
  return !Boolean(error);
};

function fixJsonString(jsonString: string): string {
  jsonString = jsonString.replace(/:\s*"([^"]*)"/g, (match, p1) => {
    return `: "${p1.replace(/"/g, '\\"')}"`;
  });

  // Check if JSON is valid after the fix
  try {
    JSON.parse(jsonString);
    return jsonString;
  } catch (e: any) {
    throw new Error(
      "The JSON is still invalid after attempting to fix: " + e.message
    );
  }
}
