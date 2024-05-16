export type JOB_ASSISTANT_TYPE = {
  in: {
    thread_id: string;
    message?: string;
    candidate?: {
      id: string | null;
      temp_id: string | null;
    };
    run_data?: {
      id: string;
      functionName: string;
      functionResult: any;
      type: string;
    } | null;
  };
};

import { drizzle } from "drizzle-orm/postgres-js";

export type handleQueryType = {
  db: ReturnType<typeof drizzle>;
  thread_id: string;
  candidate?: {
    id: string | null;
    temp_id: string | null;
  };
  run_data?: {
    id: string;
    functionName: string;
    functionResult: any;
    type: string;
  } | null;
  message?: string;
};

export type OrderByType = "created_at" | "applied_at" | "overall_score";

export type conditionType = "gt" | "lt" | "eq" | "gte" | "lte" | "between";

export type getApplicationDataType = {
  job_id: string;
  application_ids: string[];
};

export type get_jobs_Type = {
  recruiterId: string;
  options: {
    title?: string | null;
    keyWords: string[] | null;
    location?: {
      filter?: "in" | "not_in";
      city: string[];
      // state: string[];
      // country: string[];
    } | null;
    experience?: number;
    offset?: number;
    limit?: number;
  };
};

export type updateApplicationsType = {
  application_ids: string[];
  status: "qualified" | "disqualified";
  send_mail_update: boolean;
};
export type SaveResultType = {
  application_selection: {
    message: string;
    applications_id: string[];
  };
};

export type HandleQueryType = {};

export type HandleSQLFunctionType =
  | (
      | {
          functionName: "get_jobs";
          options: get_jobs_Type;
        }
      | {
          functionName: "request_applications_details";
          options: getApplicationDataType;
        }
      | {
          functionName: "submit_job_application";
          options: updateApplicationsType;
        }
    ) & { db: ReturnType<typeof drizzle> };

export const HandleSQLFunctionMapping = ({
  functionName,
  options,
}: {
  functionName: string;
  options: any;
}): {
  functionName: "get_jobs";
  options: get_jobs_Type;
} => {
  const tempFunctionName = functionName as "get_jobs";
  switch (tempFunctionName) {
    case "get_jobs":
      return {
        functionName: "get_jobs",
        options: options as get_jobs_Type,
      };
    // case "get_applications_extra_details":
    //   return {
    //     functionName: "get_applications_details",
    //     options: options as getApplicationDataType,
    //   };
    // case "update_applications": {
    //   return {
    //     functionName: "update_applications",
    //     options: options as updateApplicationsType,
    //   };
    // }
  }
};
