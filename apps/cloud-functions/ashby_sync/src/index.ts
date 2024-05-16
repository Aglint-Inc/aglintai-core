import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";

// const Text_TO_JSON = "http://localhost:8083/";

import LoggerV2 from "./logger";
import { ashbySync } from "./jsonProcessing";

export const hello: HttpFunction = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    const { ashby_key, recruiter_id, test } = req.body as {
      ashby_key: string;
      recruiter_id: string;
      test?: boolean;
    };
    if (!ashby_key) {
      return res.status(400).send(
        getResponse({
          error: "Invalid request. Required ashby_key missing.",
        })
      );
    }
    const logger = new LoggerV2(
      "logger-test",
      {
        labels: {
          function: "ashby_sync",
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
        message: `request received for key: ${ashby_key}`,
        subProcess: "main",
      },
      {
        severity: "DEFAULT",
      }
    );

    try {
      const result = await ashbySync(ashby_key, logger, recruiter_id);

      return res
        .status(200)
        .json(getResponse({ success: Boolean(result), logger }));
    } catch (error) {
      let errorMessage = "Internal Server Error at: parseJson.";
      if (typeof error === "string") {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return res.status(200).json(getResponse({ error: errorMessage, logger }));
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send(getResponse({ error: "Method Not Allowed!" }));
    return;
  }
};

export const runtime = "edge";

const getResponse = ({
  success,
  error,
  logger,
}: {
  success?: boolean;
  error?: string;
  logger?: LoggerV2;
}) => {
  error &&
    logger &&
    logger.createLog(
      {
        message: `${error}`,
        subProcess: "getResponse",
      },
      {
        severity: "ERROR",
      }
    );
  return { success, error };
};
