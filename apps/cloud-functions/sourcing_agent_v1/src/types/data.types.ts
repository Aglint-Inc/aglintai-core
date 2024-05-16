export type JOB_ASSISTANT_TYPE = {
  post: {
    in: {
      query: string;
      candidate_ids: string[];
      recruiter_id: string;
    };
  };
};

import { drizzle } from "drizzle-orm/postgres-js";

export type handleQueryType = {
  db: ReturnType<typeof drizzle>;
  thread_id: string;
  job_id: string;
  message: string;
};

export type OrderByType = "created_at" | "applied_at" | "overall_score";

export type conditionType = "gt" | "lt" | "eq" | "gte" | "lte" | "between";

export type getApplicationDataType = {
  job_id: string;
  application_ids: string[];
};

export type getFilterApplicationType = {
  job_id: string;
  location?: {
    type?: "exact" | "range";
    exact: {
      filter?: "in" | "not_in";
      city: string[];
      state: string[];
      country: string[];
    } | null;
    range: { distance: number; place: string } | null;
  } | null;
  score?: {
    condition: conditionType;
    lower_value: number;
    greater_value: number;
  } | null;
  skills?: string[] | null;
  company: {
    type: "current" | "previous";
    names: string[];
  } | null;
  experience_in_months: {
    lower_value: number;
    greater_value: number;
    condition: "gt" | "lt" | "eq" | "gte" | "lte" | "between";
  };
  sort:
    | {
        orderBy: OrderByType;
        order?: "asc" | "desc";
      }[]
    | null;
  offset?: number;
  limit?: number;
};

export type updateApplicationsType = {
  application_ids: string[];
  status: "qualified" | "disqualified" | "new";
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
          functionName: "get_applications";
          options: getFilterApplicationType;
        }
      | {
          functionName: "get_applications_details";
          options: getApplicationDataType;
        }
      | {
          functionName: "update_applications";
          options: updateApplicationsType;
        }
      | { functionName: "send_result"; options: SaveResultType }
    ) & { db: ReturnType<typeof drizzle>; job_id: string };

export const HandleSQLFunctionMapping = ({
  functionName,
  options,
}: {
  functionName: string;
  options: any;
}):
  | {
      functionName: "get_applications";
      options: getFilterApplicationType;
    }
  | {
      functionName: "get_applications_details";
      options: getApplicationDataType;
    }
  | {
      functionName: "update_applications";
      options: updateApplicationsType;
    } => {
  const tempFunctionName = functionName as
    | "get_applications"
    | "get_applications_extra_details"
    | "update_applications";
  switch (tempFunctionName) {
    case "get_applications":
      return {
        functionName: "get_applications",
        options: options as getFilterApplicationType,
      };
    case "get_applications_extra_details":
      return {
        functionName: "get_applications_details",
        options: options as getApplicationDataType,
      };
    case "update_applications": {
      return {
        functionName: "update_applications",
        options: options as updateApplicationsType,
      };
    }
    // case "send_result": {
    //   return {
    //     functionName: "send_result",
    //     options: options as SaveResultType,
    //   };
    // }
  }
};
