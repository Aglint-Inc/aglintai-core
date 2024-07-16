import { createServerClient } from "@supabase/ssr";

import {
  DB,
  DatabaseEnums,
  DatabaseTable,
  DatabaseTableInsert,
} from "./db/index.schema.types";

export type AddressType = {
  line1: string;
  line2: string;
  city: string;
  region: string;
  country: string;
};

export type SupabaseType = ReturnType<typeof createServerClient<DB>>;

export type SocialsType = {
  [key: string]: string;
};

export type RecruiterType = Omit<DatabaseTable["recruiter"], "socials"> & {
  socials: SocialsType | null;
};

export type JobTypeDB = DatabaseTable["public_jobs"];
export type JobAssistantChats = DatabaseTable["job_assiatan_chat"];
export type JobAssistantChatMessages =
  DatabaseTable["job_assiatan_chat_messages"];

export type AglintCandidatesTypeDB = DatabaseTable["aglint_candidates"];

export type CandidateListTypeDB = DatabaseTable["candidate_list"];
//TODO: Draft?

export type JobApplcationDB = DatabaseTable["applications"];

export type RecruiterDB = DatabaseTable["recruiter"];
export type RecruiterRelationsType = DatabaseTable["recruiter_relation"];

export type JobType = Omit<JobTypeDB, "active_status"> & {
  active_status: StatusJobs | null;
};

export type JobPostStatusType = "closed" | "draft" | "published";

export type StatusJobs = {
  sourcing: {
    isActive: boolean;
    timeStamp: string;
  };
  interviewing: {
    isActive: boolean;
    timeStamp: string;
  };
  closed: {
    isActive: boolean;
    timeStamp: string;
  };
};

export type Support_ticketType = DatabaseTable["support_ticket"];

export type Public_jobsType = DatabaseTable["public_jobs"];

export type SupportGroupType = DatabaseTable["support_groups"];

// //////////////////////////////////////// API types ///////////////////////////////////////////////

// support email api
export type getMailBodyType = {
  email_type: "interviewLink" | "disqualified" | "qualified";

  details: {
    fromEmail: string;
    fromName: string;
    link?: string;
    temples?: {
      subject: string;
      body: string;
    };
  };
};
export type SupportEmailAPIType = {
  application_id: string;
  email: string;
} & getMailBodyType;

export type getNotificationMailBodyType = {
  details: {
    fromEmail: string;
    fromName: string;
    link?: string;
    temples?: {
      subject: string;
      body: string;
    };
  };
};

export type NotificationsEmailAPIType = {
  application_id: string;
} & getNotificationMailBodyType;

// JD score
export type JdMatchAPIType = {
  over_all: OverAll;
  qualification: Qualification;
  skills_score: SkillsScore;
  summary: Summary;
};
export type OverAll = {
  match_remark: string;
  score: number;
};
export type Qualification = {
  certifications: Relevance | null;
  education: Relevance | null;
  experience: Relevance | null;
  project: Relevance | null;
};
export type Relevance = {
  isRelated: boolean;
  relevance: string;
  color?: "string";
};
export type SkillsScore = {
  score: number;
};
export type Summary = {
  feedback: string;
  remark: string;
  suggestions: string[];
  color?: "string";
};

type TempRecruiterUser = DatabaseTable["recruiter_user"];
export interface RecruiterUserType extends TempRecruiterUser {
  role: string;
  role_id: string;
  last_login?: string;
  manager_id: string;
  created_by: string;
}

export type RoleType = {
  sourcing: boolean;
  screening: boolean;
  job_posting: boolean;
  manage_roles: boolean;
  manage_users: {
    [key: string]: boolean;
  };
  edit_workflow: boolean;
  send_interview_link: boolean;
  view_candidates_profile: boolean;
};

export type CandidateType = DatabaseTable["candidates"];

export type CandidateFileTypeDB = DatabaseTable["candidate_files"];

export type InterviewScheduleTypeDB = DatabaseTable["interview_schedule"];

export type NewCandidateType = DatabaseTable["candidates"];

export type PublicJobsType = DatabaseTable["public_jobs"];

export type SupportTicketType = DatabaseTable["support_ticket"];

export type SearchHistoryType = DatabaseTable["candidate_search_history"];

export type GreenhouseRefDbType = DatabaseTable["greenhouse_reference"];

export type GreenhouseType = Pick<
  DatabaseTable["greenhouse_reference"],
  "posting_id" | "application_id" | "greenhouse_id" | "public_job_id" | "resume"
>;

export type OutreachEmailDbType = DatabaseTable["outreached_emails"];

export type InterviewModuleType = DatabaseTable["interview_module"];

export type InterviewModuleRelationType =
  DatabaseTable["interview_module_relation"] & {
    pause_json: {
      start_date: string;
      end_date: string;
      isManual: boolean;
    };
  };

export type InterviewMeetingTypeDb = DatabaseTableInsert["interview_meeting"];

export type IntegrationType = DatabaseTable["request_integration_tool"];

export type ScheduleAgentChatHistoryTypeDB =
  DatabaseTable["scheduling_agent_chat_history"];

export type InterviewPlanTypeDB = DatabaseTable["interview_plan"];

export type InterviewSessionTypeDB = DatabaseTable["interview_session"];
export type InterviewFilterJsonType = DatabaseTable["interview_filter_json"];

export type InterviewSessionRelationTypeDB =
  DatabaseTable["interview_session_relation"];

export type employmentTypeEnum = DatabaseEnums["employment_type_enum"];

export type InterviewSession = DatabaseTable["interview_session"];

export type InterviewerSessionRelation =
  DatabaseTable["interview_session_relation"];

export type ApplicationLogsTypeDb = DatabaseTable["application_logs"];

export type TaskTypeDb = DatabaseTable["new_tasks"];
