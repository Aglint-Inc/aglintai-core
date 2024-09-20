import axios from "axios";
import { logs, saveToDB } from "./utils";
import dotenv from "dotenv";
import { getImageToText } from "./ocr";
import LoggerV2 from "./logger";

dotenv.config();

const resume_to_text_v1 = process.env.RESUME_TO_TEXT;
const resume_text_to_json_v1 = process.env.Text_TO_JSON;
const resume_scoring_v1 = process.env.RESUME_SCORING;

if (!resume_to_text_v1) {
  throw new Error("resume_to_text_v1 environment variables are required.");
}
if (!resume_text_to_json_v1) {
  throw new Error("resume_text_to_json_v1 environment variables are required.");
}
if (!resume_scoring_v1) {
  throw new Error("resume_scoring_v1 environment variables are required.");
}

export const handleCalls = async ({
  application_id,
  candidate_id,
  file_id,
  resume,
  jd_json,
  resume_text,
  json_resume,
  jd_score,
  parameter_weights,
  step = "text",
  model,
  update = false,
  logger,
  test,
}: {
  application_id: string;
  candidate_id: string;
  file_id: string;
  resume: string;
  jd_json: { [key: string]: string | any };
  resume_text: string;
  parameter_weights: any;
  json_resume: { [key: string]: string | any };
  jd_score?: { [key: string]: string | any };
  step?: "text" | "json" | "score";
  model: "openai" | "anthropic";
  update?: boolean;
  logger: LoggerV2;
  test: boolean;
}) => {
  logger.createLog({
    message: `handling api switching automatic:${update}`,
    subProcess: "handleCalls",
  });
  if (update) {
    switch (step) {
      case "text":
        await handlerResumeToText({
          url: resume,
          jd_json,
          application_id,
          candidate_id,
          file_id,
          model,
          logger,
          test,
        });
        return;
      case "json":
        handlerTextToJson({
          resume_text,
          jd_json,
          application_id,
          candidate_id,
          file_id,
          model,
          logger,
        });
        return;
      case "score":
        handlerResumeScoring({
          resume_json: json_resume,
          jd_json,
          parameter_weights,
          application_id,
          file_id,
          model,
          logger,
        });
        return;
      case null:
      default:
        throw new Error("Force update: wrong step or null");
    }
  } else {
    if (!resume_text) {
      await handlerResumeToText({
        url: resume,
        jd_json,
        application_id,
        candidate_id,
        file_id,
        logger,
        model,
        test,
      });
      return;
    } else if (!json_resume) {
      handlerTextToJson({
        resume_text,
        jd_json,
        application_id,
        candidate_id,
        file_id,
        model,
        logger,
      });
      return;
    } else if (!jd_score) {
      handlerResumeScoring({
        resume_json: json_resume,
        parameter_weights,
        jd_json,
        application_id,
        file_id,
        model,
        logger,
      });
      return;
    }
  }
  await saveToDB({
    table: "applications",
    data: { processing_status: "success" },
    id: application_id,
    logger,
  });
  return true;
};

const handlerResumeToText = async ({
  url,
  jd_json,
  application_id,
  candidate_id,
  file_id,
  model,
  logger,
  test,
}: {
  url: string;
  jd_json: { [key: string]: any };
  application_id: string;
  file_id: string;
  candidate_id: string;
  model: "openai" | "anthropic";
  logger: LoggerV2;
  test: boolean;
}) => {
  logger.createLog({
    message: `calling resume_to_text_v1 api`,
    subProcess: "handlerResumeToText",
  });
  const { text, error } = await axios
    .post(resume_to_text_v1, { url, loggerDetails: logger.loggerDetails })
    .then(({ data }) => {
      return data as {
        text: string | null;
        images: string[] | null;
        error: string | null;
      };
    })
    .then(async ({ text, images, error }) => {
      if (error) {
        return { text: null, error };
      }
      if (images) {
        const { imageText, imageError } = await getImageToText(
          images,
          logger
        ).catch((error) => {
          return { imageText: null, imageError: String(error) };
        });
        return { text: imageText, error: imageError };
      }
      return { text, error };
    })
    .catch((error) => {
      let errorMassage = "Resume to text v1: ";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMassage +=
          "API Server Error with status: " + error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
        errorMassage +=
          "On response from API Server(Api server may be not running)";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMassage += error.message;
      }
      throw Error(errorMassage);
    });
  // console.log({ text, error });
  if (error) {
    await logs(
      {
        application_id,
        logs: {
          function: "process_resume_and_jd_v1",
          error,
        },
      },
      logger
    );
    return false;
  }

  !test &&
    text &&
    handlerTextToJson({
      resume_text: text,
      jd_json,
      application_id,
      candidate_id,
      file_id,
      model,
      logger,
    });
  await saveToDB({
    table: "candidate_files",
    data: { resume_text: text },
    id: file_id,
    logger,
  });
  return true;
};
const handlerTextToJson = async ({
  resume_text,
  jd_json,
  application_id,
  candidate_id,
  file_id,
  model,
  logger,
}: {
  resume_text: string;
  jd_json: { [key: string]: any };
  application_id: string;
  candidate_id: string;
  file_id: string;
  model: "openai" | "anthropic";
  logger: LoggerV2;
}) => {
  logger.createLog({
    message: `calling resume_text_to_json_v1 api`,
    subProcess: "handlerTextToJson",
  });
  axios
    .post(resume_text_to_json_v1, {
      resume_text,
      jd_json,
      candidate_id,
      application_id,
      file_id,
      model,
      loggerDetails: logger.loggerDetails,
      // signal: newAbortSignal(50000, "resume_text_to_json_v1"),
    })
    .catch((error) => {
      let errorMassage = "Resume text to json v1: ";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMassage +=
          "API Server Error with status: " + error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
        errorMassage +=
          "On response from API Server(Api server may be not running)";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMassage += error.message;
      }
      throw Error(errorMassage);
    });
  return true;
};
const handlerResumeScoring = async ({
  resume_json,
  jd_json,
  parameter_weights,
  application_id,
  file_id,
  model,
  logger,
}: {
  resume_json: { [key: string]: any };
  jd_json: { [key: string]: any };
  parameter_weights: any;
  application_id: string;
  file_id: string;
  model: "openai" | "anthropic";
  logger: LoggerV2;
}) => {
  logger.createLog({
    message: `calling resume_scoring_v1 api`,
    subProcess: "handlerResumeScoring",
  });
  axios
    .post(resume_scoring_v1, {
      resume_json,
      jd_json,
      application_id,
      file_id,
      parameter_weights,
      model,
      loggerDetails: logger.loggerDetails,
    })
    .catch((error) => {
      let errorMassage = "Handler Resume Scoring: ";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMassage +=
          "API Server Error with status: " + error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
        errorMassage +=
          "On response from API Server(Api server may be not running)";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMassage += error.message;
      }
      throw Error(errorMassage);
    });
  return true;
};
