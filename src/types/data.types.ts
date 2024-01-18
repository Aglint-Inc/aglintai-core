import { Database } from './schema';

export type AddressType = {
  line1: string;
  line2: string;
  city: string;
  region: string;
  country: string;
};

export type SocialsType = {
  [key: string]: string;
};

export type RecruiterType = Omit<
  Database['public']['Tables']['recruiter']['Row'],
  'socials'
> & { socials: SocialsType | null };

export type JobTypeDB = Database['public']['Tables']['public_jobs']['Row'];

export type AglintCandidatesTypeDB =
  Database['public']['Tables']['aglint_candidates']['Row'];
//TODO: Draft?

export type JobApplcationDB =
  Database['public']['Tables']['applications']['Row'];

export type RecruiterDB = Database['public']['Tables']['recruiter']['Row'];
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

export type ApplicationReceived = {
  body: string;
  default: boolean;
  subject: string;
};

export type EmailTemplateType = {
  interview: ApplicationReceived;
  rejection: ApplicationReceived;
  application_recieved: ApplicationReceived;
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
export type RecruiterUserType =
  Database['public']['Tables']['recruiter_user']['Row'];

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
