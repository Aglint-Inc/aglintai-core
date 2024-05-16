import { drizzle } from "drizzle-orm/postgres-js";
import { ASSISTANT_ID, openai } from "./client/openai";
import {
  HandleSQLFunctionType,
  JOB_ASSISTANT_TYPE,
  SaveResultType,
  handleQueryType,
} from "./types/data.types";

// import {
//   getFilterApplication,
//   get_application_data,
//   update_applications,
// } from "./dbFunction";
import { getEmbedding } from "./utils";
import { candidates } from "./drizzle/schema";
import { Run } from "openai/resources/beta/threads/runs/runs";

export const handleQuery = async ({
  db,
  thread_id,
  candidate,
  run_data,
  message,
}: handleQueryType) => {
  let userMessageId: string | null = null;
  let run: Run | null = null;
  if (!run_data && message) {
    userMessageId = await openai.addNewMessage({
      thread_id,
      message: message,
    });
    run = await openai.runThread({
      thread_id,
      assistant_id: ASSISTANT_ID!,
    });
  } else {
    run = await openai.submitRun({
      run_id: run_data!.id,
      thread_id,
      actions: {
        functionName: run_data!.functionName,
        functionResult: run_data!.functionResult,
        type: run_data!.type,
      },
    });
  }

  const result = await openai.getChatResponse({
    run,
    db,
    functionCallHandler: handleSQLFunction,
  });
  return { userMessageId, ...result };
};

const handleSQLFunction = ({
  db,
  functionName,
  options,
}: HandleSQLFunctionType) => {
  switch (functionName) {
    // case "get_applications":
    //   return getFilterApplication({ db, ...options, job_id });
    // case "get_applications_details":
    //   return get_application_data({ db, ...options, job_id });
    // case "update_applications":
    //   return update_applications({ db, ...options });
    default:
      return Promise.resolve();
  }
};

const createTempCandidate = async (options: {
  db: ReturnType<typeof drizzle>;
  id: string;
  options: {
    firstName: string;
    lastName: string;
    experience_in_months: number;
    current_company: string;
    current_title: string;
  };
}) => {
  // db.insert(candidates).values(options.options).returning({ id: candidates.id });
  return options;
};
