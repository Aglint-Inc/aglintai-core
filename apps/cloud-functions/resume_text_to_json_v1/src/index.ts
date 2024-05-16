import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";
import { getResponse, logToken, saveToDB, sendToken } from "./util";
import { parseJson } from "./jsonProcessing";
import axios from "axios";

// const Text_TO_JSON = "http://localhost:8083/";

import dotenv from "dotenv";
import { getEmbeddings } from "./embedding";
import LoggerV2 from "./logger";
import { getLocation } from "./geoLoaction";
import { supabase } from "./client";
dotenv.config();

const resume_scoring_v1 = process.env.RESUME_SCORING;

if (!resume_scoring_v1) {
  throw new Error("resume_scoring_v1 environment variables are required.");
}

export const hello: HttpFunction = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    const {
      resume_text,
      jd_json,
      application_id,
      candidate_id,
      file_id,
      loggerDetails,
      parameter_weights,
      test,
    } = req.body as {
      resume_text: string;
      jd_json: any;
      application_id: string;
      candidate_id: string;
      file_id: string;
      loggerDetails: { [key: string]: string };
      parameter_weights: any;
      test?: boolean;
    };
    if (
      !resume_text &&
      resume_text.trim() === "" &&
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
      const { result: json_resume, token } = await parseJson(
        resume_text || "",
        logger
      );
      logger.createLog({
        message: `resume json created`,
        subProcess: "main",
      });
      // const embeddings = {};
      const embeddings = await getEmbeddings(json_resume, logger);
      logger.createLog({
        message: `resume embeddings completed`,
        subProcess: "main",
      });

      // get geolocation
      let location: {
        geolocation: string;
        city: any;
      } | null = null;
      // @ts-ignore
      if (json_resume?.basics?.location) {
        logger.createLog({
          message: `resume getting geolocation`,
          subProcess: "main",
        });
        try {
          location = await getLocation(
            // @ts-ignore
            `${json_resume?.basics?.location.city}, ${json_resume?.basics?.location.state}, ${json_resume?.basics?.location.country}`
          );
          logger.createLog({
            message: `resume got geolocation`,
            subProcess: "main",
          });
        } catch (e) {
          logger.createLog(
            {
              message: "error in geting geolocation",
              error: String(e),
              subProcess: "main",
            },
            {
              severity: "ERROR",
            }
          );
        }
      }
      let saved = false;
      const geoDataAndExp = {
        // @ts-ignore
        experience_in_months: json_resume?.basics?.totalExperienceInMonths,
        // @ts-ignore
        city: location?.city,
        // @ts-ignore
        state: location?.state,
        // @ts-ignore
        country: location?.country,
        geolocation: location?.geolocation,
      };

      if (!test && application_id && candidate_id && file_id) {
        saved =
          (await saveToDB({
            table: "candidate_files",
            data: { resume_json: json_resume, ...embeddings },
            id: file_id,
            logger,
          })) &&
          (await saveToDB({
            table: "candidates",
            data: geoDataAndExp,
            id: candidate_id,
            logger,
          }));
        await logToken(application_id, token, logger);
      }
      const { data } = await supabase.rpc("get_recruiter_name_id", {
        in_application_id: application_id,
      });
      sendToken(
        token.totalExecutionTokens,
        token.totalPromptTokens,
        token.totalCompletionTokens,
        data[0].name
      );
      // call next api
      !test &&
        axios.post(resume_scoring_v1, {
          resume_text,
          resume_json: json_resume,
          jd_json,
          loggerDetails,
          parameter_weights,
          application_id,
          file_id,
        });
      return res.status(200).json(
        getResponse({
          json: { geoDataAndExp, ...json_resume },
          embeddings,
          saved,
          application_id,
          token,
        })
      );
    } catch (error) {
      let errorMessage = "Internal Server Error at: parseJson.";
      if (typeof error === "string") {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return res
        .status(200)
        .json(getResponse({ error: errorMessage, logger, application_id }));
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send(getResponse({ error: "Method Not Allowed!" }));
    return;
  }
};

export const runtime = "edge";
// getLocation("san jos").then((data) => console.log(data));
