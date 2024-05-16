import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";

import { connectionString, getChatDetails, getResponse } from "./utils";
import { JOB_ASSISTANT_TYPE } from "./types/data.types";
// import { handleQuery } from "./process";
// import postgres from "postgres";
// import { drizzle } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { handleQuery } from "./process";

// import LoggerV2 from "./logger";

export const hello: HttpFunction = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    const { thread_id, message, candidate, run_data } =
      req.body as JOB_ASSISTANT_TYPE["in"];
    if (!thread_id && (!run_data || !message)) {
      return res
        .status(200)
        .json(getResponse({ error: "chat_id and message are required." }));
    }
    const client = postgres(connectionString, { prepare: false });
    const db = drizzle(client);
    try {
      // const { thread_id } = await getChatDetails({ db, chat_id });
      // const thread_id = "thread_UyP1FiFidBPcxy5sJTcXKHha";
      return (
        res
          .status(200)
          // .json(getResponse({ processing: true, application_id, logger }));
          .json(
            getResponse({
              result: await handleQuery({
                db,
                thread_id,
                message,
                candidate,
                run_data,
              }),
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
    }
    const data = "";
    return res.status(200).json(
      getResponse({
        result: data,
      })
    );
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send(getResponse({ error: "Method Not Allowed!" }));
    return;
  }
};
