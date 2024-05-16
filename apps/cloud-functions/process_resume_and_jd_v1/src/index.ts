import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";

import { handleCalls as handleCalls } from "./preCall";
import { getResponse as getResponse, setToProcess } from "./utils";
import LoggerV2 from "./logger";

export const hello: HttpFunction = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    const {
      application_id,
      candidate_id,
      job_id,
      file_id,
      resume,
      jd_json,
      resume_text,
      json_resume,
      parameter_weights,
      jd_score,
      retry = 0,
      company = "Aglint",
      step,
      update,
      model = "openai",
      test,
    } = req.body as {
      application_id: string;
      candidate_id: string;
      job_id: string;
      file_id: string;
      resume: string;
      jd_json: { [key: string]: string | any };
      parameter_weights: any;
      resume_text: string;
      json_resume: { [key: string]: string | any };
      jd_score: { [key: string]: string | any };
      retry: number;
      company: string;
      step?: "text" | "json" | "score";
      update?: boolean;
      model: "openai" | "anthropic";
      test?: boolean;
    };
    if ((!application_id || !resume) && !test && (!file_id || !job_id)) {
      return res.status(400).send(
        getResponse({
          error: `Invalid request. Required payload missing. ${JSON.stringify({
            application_id,
            resume,
            jd_json: jd_json,
          })}`,
          application_id,
        })
      );
    }
    const loggerDetails = {
      company,
      application_id,
      job_id,
      retry: String(retry || 0),
    };
    const logger = new LoggerV2(
      "logger",
      {
        labels: {
          function: "process_resume_and_jd_v1",
          ...loggerDetails,
        },
        resource: {
          type: "global",
        },
        severity: "INFO",
      },
      {
        timestamp: new Date().toISOString(),
        subProcess: "",
        status: "logger-init",
      }
    );
    logger.loggerDetails = loggerDetails;
    console.log(`request received for: ${application_id} retry: ${retry || 0}`);
    logger.createLog(
      {
        message: `request received for: ${application_id} retry: ${retry || 0}`,
      },
      {
        severity: "DEFAULT",
      }
    );
    setToProcess(application_id, retry, logger);
    try {
      await handleCalls({
        application_id,
        candidate_id,
        file_id,
        resume,
        jd_json,
        resume_text,
        json_resume,
        parameter_weights,
        jd_score,
        step,
        model,
        update,
        logger,
        test: test || false,
      });
      return res
        .status(200)
        .json(getResponse({ processing: true, application_id, logger }));
    } catch (error) {
      let errorMessage = "Internal Server Error at: process_resume.";
      if (typeof error === "string") {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      // console.error(errorMessage);
      return res
        .status(200)
        .json(getResponse({ error: errorMessage, application_id, logger }));
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send(getResponse({ error: "Method Not Allowed!" }));
    return;
  }
};
