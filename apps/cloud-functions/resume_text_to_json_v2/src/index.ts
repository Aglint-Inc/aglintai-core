import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";
import { getResponse, logToken, saveToDB } from "./util";
import { parseJson } from "./jsonProcessing";
import axios from "axios";

// const Text_TO_JSON = "http://localhost:8083/";

import dotenv from "dotenv";
import { getEmbeddings } from "./embedding";
import LoggerV2 from "./logger";
dotenv.config();

const RESUME_SCORING = process.env.RESUME_SCORING;

if (!RESUME_SCORING) {
  throw new Error("RESUME_SCORING environment variables is required.");
}

export const hello: HttpFunction = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    const {
      resume_text,
      jd_json,
      application_id,
      file_id,
      loggerDetails,
      model = "openai",
      test,
    } = req.body as {
      resume_text: string;
      jd_json: any;
      application_id: string;
      file_id: string;
      loggerDetails: { [key: string]: string };
      model: "openai" | "anthropic" | "pllm";
      test?: boolean;
    };
    if (
      !resume_text &&
      resume_text?.trim() === "" &&
      !jd_json &&
      !application_id
    ) {
      return res.status(400).send(
        getResponse({
          error: "Invalid request. Required payload missing.",
          application_id,
        })
      );
    }
    const logger = new LoggerV2(
      "logger-test",
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
    logger.createLog(
      {
        message: `request received for: ${application_id}`,
        subProcess: "main",
      },
      {
        severity: "DEFAULT",
      }
    );
    try {
      const { result: json_resume, token } = await parseJson({
        ai: model,
        message: resume_text || "",
        logger,
      });
      logger.createLog({
        message: `resume json created`,
        subProcess: "main",
      });
      let embeddings = {};
      let saved = false;
      if (!test && application_id) {
        embeddings = await getEmbeddings({
          resume_json: json_resume,
          logger,
        });
        logger.createLog({
          message: `resume embeddings completed`,
          subProcess: "main",
        });
        saved = await saveToDB({
          table: "candidate_files",
          data: { resume_json: json_resume, ...embeddings },
          id: file_id,
          logger,
        });
        await logToken(application_id, token, logger);
      }

      // call next api
      !test &&
        axios.post(RESUME_SCORING, {
          resume_text,
          resume_json: json_resume,
          jd_json,
          model,
          loggerDetails,
          application_id,
          file_id,
        });
      return res.status(200).json(
        getResponse({
          json: json_resume,
          embeddings,
          saved,
          application_id,
          logger,
          token,
        })
      );
    } catch (error) {
      console.log(error);
      let errorMessage = "Internal Server Error at: parseJson.";
      if (typeof error === "string") {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
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

export const runtime = "edge";
