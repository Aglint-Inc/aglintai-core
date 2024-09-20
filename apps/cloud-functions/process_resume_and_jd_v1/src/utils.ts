import { supabase } from "./client/supabaseClient";
import LoggerV2 from "./logger";

export const getResponse = ({
  score,
  processing = false,
  saved = false,
  error,
  application_id,
  logger,
}: {
  score?: any;
  processing?: boolean;
  saved?: boolean;
  error?: string;
  application_id?: string;
  logger?: LoggerV2;
}) => {
  if (error && logger && application_id) {
    logs(
      {
        application_id,
        logs: {
          function: "resume_scoring_v1",
          error,
        },
      },
      logger
    );
    // logger.createLog(
    //   {
    //     error: String(error),
    //     subProcess: "Response",
    //   },
    //   {
    //     severity: "ERROR",
    //   }
    // );
  } else {
    logger?.createLog({
      message: "generating Response",
      subProcess: "Response",
    });
  }
  // logger.end();
  console.log("returning:", { score, processing, saved, error });
  return { score, processing, saved, error };
};

export const saveToDB = async ({
  table,
  data,
  id,
  logger,
}: {
  table: "applications" | "candidate_files";
  data: any;
  id: string;
  logger: LoggerV2;
}) => {
  console.log("saving", {
    table,
    data,
    id,
  });
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
    console.log("saved");
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
    task: "scoring",
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
      message: "updating logs in db",
      subProcess: "logToken",
    });
  }
  return !Boolean(error);
};

export const logs = async (data: any, logger: LoggerV2) => {
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
  if (!data.application_id && data.application_id.trim() === "") return;
  await supabase
    .from("applications")
    .update({
      processing_status: "failed",
    })
    .eq("id", data.application_id);
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
      message: "updating error logs in db",
      subProcess: "logs",
    });
  }
  return !Boolean(error);
};

export const newAbortSignal = (timeoutMs: number, funcName: string) => {
  const abortController = new AbortController();
  setTimeout(() => {
    abortController.abort();
    console.log("Aborting Signal for:", funcName);
  }, timeoutMs || 0);
  return abortController.signal;
};
export const setToProcess = async (
  id: string,
  retry: number,
  logger: LoggerV2
) => {
  if (id.trim() === "") return false;
  const { error } = await supabase
    .from("applications")
    .update({ processing_status: "processing", retry })
    .eq("id", id);
  if (error) {
    // console.error(error);
    logger.createLog(
      {
        error: String(error),
        subProcess: "setToProcess",
      },
      {
        severity: "ERROR",
      }
    );
  } else {
    logger.createLog({
      message: `setting row to 'processing' for ${
        logger.metadata.labels?.application_id || "id missing"
      }`,
      subProcess: "setToProcess",
    });
  }
  return !Boolean(error);
};
