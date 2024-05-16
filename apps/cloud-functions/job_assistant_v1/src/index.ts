import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";

import {
  createThread,
  getChatDetails,
  getJOBDetails,
  getResponse,
} from "./utils";
import { JOB_ASSISTANT_TYPE } from "./types/data.types";
import { handleQuery } from "./process";
import { connectionString } from "./client/pgClient";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

// import LoggerV2 from "./logger";

export const hello: HttpFunction = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    const { job_id } = req.query as JOB_ASSISTANT_TYPE["get"]["in"];
    const chat_id = "";
    const client = postgres(connectionString, { prepare: false });
    try {
      const db = drizzle(client);
      const jobDetails = await getJOBDetails({ db, job_id });
      if (!jobDetails.skills?.length) delete jobDetails.skills;
      return (
        res
          .status(200)
          // .json(getResponse({ processing: true, application_id, logger }));
          .json(
            getResponse({
              result: {
                thread_id: await createThread(JSON.stringify(jobDetails, null)),
              },
            })
          )
      );
    } catch (error: any) {
      let errorMessage = "Internal Server Error at: process_resume.";
      console.error({ error });
      return (
        res
          .status(200)
          // .json(getResponse({ error: errorMessage, logger }));
          .json(getResponse({ error: error.message || errorMessage }))
      );
    } finally {
      client?.end();
    }
  } else if (req.method === "POST") {
    const { chat_id, message } = req.body as JOB_ASSISTANT_TYPE["post"]["in"];
    if (!chat_id || !message) {
      return res
        .status(200)
        .json(getResponse({ error: "chat_id and message are required." }));
    }
    const client = postgres(connectionString, { prepare: false });
    const db = drizzle(client);
    try {
      const { thread_id, job_id } = await getChatDetails({ db, chat_id });
      return (
        res
          .status(200)
          // .json(getResponse({ processing: true, application_id, logger }));
          .json(
            getResponse({
              result: await handleQuery({ db, thread_id, job_id, message }),
            })
          )
      );
    } catch (error: any) {
      let errorMessage = "Internal Server Error at: job_assistant_v1.";
      console.error({ error });
      return (
        res
          .status(200)
          // .json(getResponse({ error: errorMessage, logger }));
          .json(getResponse({ error: error.message || errorMessage }))
      );
    } finally {
      client?.end();
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send(getResponse({ error: "Method Not Allowed!" }));
    return;
  }
};
