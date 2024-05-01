import { createServerClient } from '@supabase/ssr';

import { CustomDatabase, DatabaseEnums, DatabaseTable } from './customSchema';
import { Database } from './schema';

export type AddressType = {
  line1: string;
  line2: string;
  city: string;
  region: string;
  country: string;
};

export type SupabaseType = ReturnType<
  typeof createServerClient<CustomDatabase>
>;

export type SocialsType = {
  [key: string]: string;
};

export type RecruiterType = Omit<DatabaseTable['recruiter'], 'socials'> & {
  socials: SocialsType | null;
};

export type JobTypeDB = Database['public']['Tables']['public_jobs']['Row'];
export type JobAssistantChats =
  Database['public']['Tables']['job_assiatan_chat']['Row'];
export type JobAssistantChatMessages =
  Database['public']['Tables']['job_assiatan_chat_messages']['Row'];

export type AglintCandidatesTypeDB =
  Database['public']['Tables']['aglint_candidates']['Row'];

export type CandidateListTypeDB =
  Database['public']['Tables']['candidate_list']['Row'];
//TODO: Draft?

export type JobApplcationDB =
  Database['public']['Tables']['applications']['Row'];

export type RecruiterDB = DatabaseTable['recruiter'];
export type RecruiterRelationsType =
  Database['public']['Tables']['recruiter_relation']['Row'];

export type JobType = Omit<JobTypeDB, 'active_status'> & {
  active_status: StatusJobs | null;
};

export type JobPostStatusType = 'closed' | 'draft' | 'published';

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

export type Support_ticketType =
  Database['public']['Tables']['support_ticket']['Row'];

export type Public_jobsType =
  Database['public']['Tables']['public_jobs']['Row'];

export type SupportGroupType =
  Database['public']['Tables']['support_groups']['Row'];

// //////////////////////////////////////// API types ///////////////////////////////////////////////

// support email api
export type getMailBodyType = {
  email_type: 'interviewLink' | 'disqualified' | 'qualified';

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

export type EmailTemplateFields = {
  body: string;
  default: boolean;
  subject: string;
  fromName: string;
};

export type EmailTemplateType = {
  interview: EmailTemplateFields;
  rejection: EmailTemplateFields;
  application_received: EmailTemplateFields;
  phone_screening: EmailTemplateFields;
  interview_resend: EmailTemplateFields;
  phone_screening_resend: EmailTemplateFields;
};

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
  color?: 'string';
};
export type SkillsScore = {
  score: number;
};
export type Summary = {
  feedback: string;
  remark: string;
  suggestions: string[];
  color?: 'string';
};

type TempRecruiterUser = DatabaseTable['recruiter_user'];
export interface RecruiterUserType extends TempRecruiterUser {
  role: DatabaseEnums['user_roles'];
}
// export type RecruiterUserType =
//   Database['public']['Tables']['recruiter_user']['Row'] & {
//     scheduling_settings: schedulingSettingType;
//   };

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

export type JobApplicationType =
  Database['public']['Tables']['applications']['Row'];

export type CandidateType = Database['public']['Tables']['candidates']['Row'];

export type CandidateFileTypeDB =
  Database['public']['Tables']['candidate_files']['Row'];

export type InterviewScheduleTypeDB =
  Database['public']['Tables']['interview_schedule']['Row'];

export type NewCandidateType =
  Database['public']['Tables']['candidates']['Row'];

export type PublicJobsType = Database['public']['Tables']['public_jobs']['Row'];

export type SupportTicketType =
  Database['public']['Tables']['support_ticket']['Row'];

export type SearchHistoryType =
  Database['public']['Tables']['candidate_search_history']['Row'];

export type GreenhouseRefDbType =
  Database['public']['Tables']['greenhouse_reference']['Row'];

export type GreenhouseType = Pick<
  Database['public']['Tables']['greenhouse_reference']['Row'],
  'posting_id' | 'application_id' | 'greenhouse_id' | 'public_job_id' | 'resume'
>;

export type OutreachEmailDbType =
  Database['public']['Tables']['outreached_emails']['Row'];

export type InterviewModuleType =
  Database['public']['Tables']['interview_module']['Row'];

export type InterviewModuleRelationType =
  Database['public']['Tables']['interview_module_relation']['Row'] & {
    pause_json: {
      start_date: string;
      end_date: string;
      isManual: boolean;
    };
  };

export type AgentChatType = Database['public']['Tables']['agent_chatx']['Row'];

export type AgentActivityType =
  Database['public']['Tables']['agent_activity']['Insert'];

export type InterviewMeetingTypeDb =
  Database['public']['Tables']['interview_meeting']['Insert'];

export type IntegrationType =
  Database['public']['Tables']['request_integration_tool']['Row'];

export type ScheduleAgentChatHistoryTypeDB =
  Database['public']['Tables']['scheduling-agent-chat-history']['Row'];

export type InterviewPlanTypeDB =
  Database['public']['Tables']['interview_plan']['Row'];

export type InterviewSessionTypeDB =
  Database['public']['Tables']['interview_session']['Row'];
export type InterviewFilterJsonType =
  Database['public']['Tables']['interview_filter_json']['Row'];

export type InterviewSessionRelationTypeDB =
  Database['public']['Tables']['interview_session_relation']['Row'];

export type employmentTypeEnum =
  Database['public']['Enums']['employment_type_enum'];

export type InterviewSession =
  Database['public']['Tables']['interview_session']['Row'];

export type InterviewerSessionRelation =
  Database['public']['Tables']['interview_session_relation']['Row'];

export type SubTaskProgress =
  Database['public']['Tables']['sub_task_progress']['Row'];

export type InterviewScheduleActivityTypeDb =
  Database['public']['Tables']['interview_schedule_activity']['Row'];

export type ApplicationLogsTypeDb =
  Database['public']['Tables']['application_logs']['Row'];

export type TaskTypeDb = Database['public']['Tables']['new_tasks']['Row'];
