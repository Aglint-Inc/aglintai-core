import { drizzle } from "drizzle-orm/postgres-js";
import { ASSISTANT_ID, openai } from "./client/openai";
import {
  HandleSQLFunctionType,
  JOB_ASSISTANT_TYPE,
  SaveResultType,
  handleQueryType,
} from "./types/data.types";

import {
  getFilterApplication,
  get_application_data,
  update_applications,
} from "./dbFunction";
import { getEmbedding } from "./utils";

export const handleQuery = async ({
  db,
  thread_id,
  job_id,
  message,
}: handleQueryType) => {
  const userMessageId = await openai.addNewMessage({
    thread_id,
    message: message,
  });
  const run = await openai.runThread({
    thread_id,
    assistant_id: ASSISTANT_ID!,
  });

  const result = await openai.getChatResponse({
    run,
    db,
    job_id,
    functionCallHandler: handleSQLFunction,
  });
  return { userMessageId, ...result };
};

const handleSQLFunction = ({
  db,
  job_id,
  functionName,
  options,
}: HandleSQLFunctionType) => {
  switch (functionName) {
    case "get_applications":
      return getFilterApplication({ db, ...options, job_id });
    case "get_applications_details":
      return get_application_data({ db, ...options, job_id });
    case "update_applications":
      return update_applications({ db, ...options });
    default:
      return Promise.resolve();
  }
};
const save_result = ({ application_selection }: SaveResultType) => {
  if (application_selection) {
    return { application_selection };
  }
  return {};
};
