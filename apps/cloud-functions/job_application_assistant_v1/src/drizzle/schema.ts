import {
  pgTable,
  foreignKey,
  pgEnum,
  bigint,
  timestamp,
  jsonb,
  uuid,
  text,
  type AnyPgColumn,
  integer,
  boolean,
  json,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const requestStatus = pgEnum("request_status", [
  "PENDING",
  "SUCCESS",
  "ERROR",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const fileType = pgEnum("file_type", [
  "resume",
  "coverletter",
  "cv",
  "image",
]);
export const applicationProcessingStatus = pgEnum(
  "application_processing_status",
  ["success", "not started", "processing", "failed"]
);
export const applicationStatus = pgEnum("application_status", [
  "screening",
  "new",
  "assessment",
  "qualified",
  "disqualified",
]);
export const recruiterRoles = pgEnum("recruiter_roles", [
  "admin",
  "recruiter",
  "human resource",
]);
export const dbSearchType = pgEnum("db_search_type", ["aglint", "candidate"]);
export const emailFetchStatus = pgEnum("email_fetch_status", [
  "not fetched",
  "success",
  "unable to fetch",
]);

export const jobReference = pgTable("job_reference", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  atsJson: jsonb("ats_json"),
  publicJobId: uuid("public_job_id")
    .notNull()
    .references(() => publicJobs.id, { onDelete: "cascade" }),
  ats: text("ats"),
  atsJobId: text("ats_job_id").notNull(),
  recruiterId: uuid("recruiter_id")
    .notNull()
    .references(() => recruiter.id, { onDelete: "cascade" }),
});

export const assessmentResults = pgTable("assessment_results", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  interviewDuration: text("interview_duration").notNull(),
  aiInterviewerId: integer("ai_interviewer_id").notNull(),
  interviewScore: integer("interview_score").default(0).notNull(),
  feedback: jsonb("feedback").notNull(),
  // TODO: failed to parse database type 'jsonb[]'
  conversation: jsonb("conversation").array().notNull(),
  interviewingDate: timestamp("interviewing_date", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  applicationId: uuid("application_id")
    .notNull()
    .references((): AnyPgColumn => applications.id, { onDelete: "cascade" }),
});

export const threads = pgTable("threads", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  threadId: text("thread_id"),
  assistantId: text("assistant_id"),
  candidateName: text("candidate_name"),
  candidateEmail: text("candidate_email"),
  candidatePhone: text("candidate_phone"),
  chatEnd: boolean("chat_end"),
  applied: boolean("applied"),
  linkedinUrl: text("linkedin_url"),
});

export const applicationReference = pgTable("application_reference", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  atsJson: json("ats_json").notNull(),
  isProcessed: boolean("is_processed").default(false).notNull(),
  recruiterId: uuid("recruiter_id").notNull(),
});

export const aglintCandidates = pgTable("aglint_candidates", {
  aglintId: uuid("aglint_id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  id: text("id").notNull(),
  city: text("city"),
  name: text("name"),
  email: text("email"),
  state: text("state"),
  title: text("title"),
  country: text("country"),
  headline: text("headline"),
  functions: text("functions").array(),
  lastName: text("last_name"),
  photoUrl: text("photo_url"),
  seniority: text("seniority"),
  firstName: text("first_name"),
  githubUrl: text("github_url"),
  departments: text("departments").array(),
  showIntent: boolean("show_intent"),
  twitterUrl: text("twitter_url"),
  emailStatus: text("email_status"),
  facebookUrl: text("facebook_url"),
  linkedinUrl: text("linkedin_url"),
  organization: jsonb("organization"),
  subdepartments: text("subdepartments").array(),
  intentStrength: text("intent_strength"),
  organizationId: text("organization_id"),
  // TODO: failed to parse database type 'jsonb[]'
  employmentHistory: jsonb("employment_history").array(),
  isLikelyToEngage: boolean("is_likely_to_engage"),
  revealedForCurrentTeam: boolean("revealed_for_current_team"),
  extrapolatedEmailConfidence: text("extrapolated_email_confidence"),
  searchQuery: jsonb("search_query").notNull(),
  phoneNumbers: jsonb("phone_numbers"),
  emailFetchStatus: emailFetchStatus("email_fetch_status")
    .default("not fetched")
    .notNull(),
});

export const jobAssiatanChat = pgTable("job_assiatan_chat", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  jobId: uuid("job_id")
    .notNull()
    .references(() => publicJobs.id, { onDelete: "cascade" }),
  name: text("name"),
  threadId: text("thread_id").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  lastMessage: text("last_message"),
});

export const candidateList = pgTable("candidate_list", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  candidates: text("candidates").default("{}").array().notNull(),
  name: text("name").notNull(),
  recruiterId: uuid("recruiter_id")
    .notNull()
    .references(() => recruiter.id, { onDelete: "cascade" }),
});

export const env = pgTable("env", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text("name"),
  value: text("value"),
});

export const notifyMe = pgTable("notify_me", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  email: text("email").notNull(),
  jobId: text("job_id"),
  jobTitle: text("job_title"),
});

export const candidates = pgTable(
  "candidates",
  {
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    recruiterId: uuid("recruiter_id").references(() => recruiter.id, {
      onDelete: "cascade",
    }),
    // TODO: failed to parse database type 'citext'
    email: text("email").notNull(),
    avatar: text("avatar"),
    city: text("city"),
    state: text("state"),
    country: text("country"),
    experienceInMonths: integer("experience_in_months"),
    lastUpdated: timestamp("last_updated", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    id: uuid("id")
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    // TODO: failed to parse database type 'citext'
    firstName: text("first_name").notNull(),
    // TODO: failed to parse database type 'citext'
    lastName: text("last_name"),
    // TODO: failed to parse database type 'geometry'
    geolocation: text("geolocation"),
    linkedin: text("linkedin"),
    phone: text("phone"),
    currentCompany: text("current_company"),
  },
  (table) => {
    return {
      candidateUkey: unique("candidate_ukey").on(
        table.recruiterId,
        table.email
      ),
      candidatesIdKey: unique("candidates_id_key").on(table.id),
    };
  }
);

export const outreachedEmails = pgTable("outreached_emails", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  candidateId: text("candidate_id").notNull(),
  email: jsonb("email").default({}).notNull(),
  emailSent: boolean("email_sent").default(false).notNull(),
  recruiterUserId: uuid("recruiter_user_id")
    .notNull()
    .references(() => recruiterUser.userId, { onDelete: "cascade" }),
});

export const leverJobReference = pgTable("lever_job_reference", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  lastSyncedAt: timestamp("last_synced_at", { mode: "string" }).defaultNow(),
  postingId: uuid("posting_id").notNull(),
  jobId: uuid("job_id")
    .notNull()
    .references(() => publicJobs.id, { onDelete: "cascade" }),
  recruiterId: uuid("recruiter_id").references(() => recruiter.id, {
    onDelete: "cascade",
  }),
});

export const leverReference = pgTable("lever_reference", {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  lastSynced: timestamp("last_synced", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  applicationId: uuid("application_id").primaryKey().notNull(),
  opportunityId: uuid("opportunity_id").notNull(),
  postingId: uuid("posting_id").notNull(),
  publicJobId: uuid("public_job_id")
    .notNull()
    .references(() => publicJobs.id, { onDelete: "cascade" }),
  stage: text("stage"),
  feedback: jsonb("feedback"),
});

export const supportGroups = pgTable("support_groups", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
  userIds: uuid("user_ids")
    .default(sql`'{}'`)
    .array()
    .notNull(),
  companyId: uuid("company_id").references(() => recruiter.id, {
    onDelete: "cascade",
  }),
});

export const supportTicket = pgTable("support_ticket", {
  idx: uuid("idx")
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
  //   @ts-ignore
  userId: uuid("user_id"),
  companyId: uuid("company_id").references(() => recruiter.id, {
    onDelete: "cascade",
  }),
  jobId: uuid("job_id")
    .notNull()
    .references(() => publicJobs.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  type: text("type").notNull(),
  actionPending: jsonb("action_pending").default({}).notNull(),
  assignTo: uuid("assign_to"),
  // TODO: failed to parse database type 'jsonb[]'
  content: jsonb("content").array().notNull(),
  state: text("state").default("created").notNull(),
  priority: text("priority").default("low").notNull(),
  userName: text("user_name").notNull(),
  emailUpdates: boolean("email_updates").default(false).notNull(),
  email: text("email"),
  attachments: text("attachments").array(),
  supportGroupId: uuid("support_group_id"),
  applicationId: uuid("application_id"),
  id: text("id").default("").primaryKey().notNull(),
});

export const recruiter = pgTable("recruiter", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  recruiterType: text("recruiter_type"),
  name: text("name"),
  email: text("email"),
  companyWebsite: text("company_website"),
  industry: text("industry"),
  logo: text("logo"),
  phoneNumber: text("phone_number"),
  primaryContact: jsonb("primary_contact"),
  hrContact: jsonb("hr_contact"),
  availableRoles: text("available_roles").default("{}").array().notNull(),
  departments: text("departments").default("{}").array().notNull(),
  technologyScore: text("technology_score").default("{}").array().notNull(),
  companyOverview: text("company_overview"),
  eOStatement: text("e_o_statement"),
  applicationProcess: text("application_process"),
  mVStatement: text("m_v_statement"),
  employmentType: jsonb("employment_type")
    .default({
      contract: true,
      fulltime: true,
      parttime: true,
      temporary: true,
      volunteer: true,
      internship: true,
    })
    .notNull(),
  workplaceType: jsonb("workplace_type")
    .default({ hybrid: true, onsite: true, offsite: true })
    .notNull(),
  emailTemplate: jsonb("email_template")
    .default({
      interview: {
        body: "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>",
        default: true,
        subject:
          "Congratulations! You''ve Been Selected for an Assessment with [companyName]",
        fromName: "aglint",
      },
      rejection: {
        body: "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>",
        default: true,
        subject: "Your application at [companyName]",
        fromName: "aglint",
      },
      phone_screening: {
        body: "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>",
        default: true,
        subject:
          "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]",
        fromName: "aglint",
      },
      interview_resend: {
        body: "<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>",
        default: true,
        subject:
          "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]",
        fromName: "aglint",
      },
      application_recieved: {
        body: "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>",
        default: true,
        subject: "We received your application for a position at [companyName]",
        fromName: "aglint",
      },
      phone_screening_resend: {
        body: "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>",
        default: true,
        subject:
          "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]",
        fromName: "aglint",
      },
    })
    .notNull(),
  companyValues: text("company_values"),
  benefits: text("benefits"),
  employeeSize: text("employee_size"),
  // TODO: failed to parse database type 'jsonb[]'
  officeLocations: jsonb("office_locations").array(),
  socials: jsonb("socials").default({
    custom: {},
    twitter: "",
    youtube: "",
    facebook: "",
    linkedin: "",
    instagram: "",
  }),
  roles: jsonb("roles")
    .default({
      admin: {
        sourcing: true,
        screening: true,
        job_posting: true,
        manage_roles: true,
        manage_users: {
          admin: true,
          recruiter: true,
          interviewer: true,
          "human resource": true,
        },
        edit_workflow: true,
        send_interview_link: true,
        view_candidates_profile: true,
      },
      recruiter: {
        sourcing: true,
        screening: true,
        job_posting: true,
        manage_roles: false,
        manage_users: {
          admin: false,
          recruiter: false,
          interviewer: true,
          "human resource": false,
        },
        edit_workflow: true,
        send_interview_link: true,
        view_candidates_profile: true,
      },
      "human resource": {
        sourcing: true,
        screening: true,
        job_posting: true,
        manage_roles: false,
        manage_users: {
          admin: false,
          recruiter: true,
          interviewer: true,
          "human resource": false,
        },
        edit_workflow: true,
        send_interview_link: true,
        view_candidates_profile: true,
      },
    })
    .notNull(),
  leverKey: text("lever_key"),
  aiAvatar: jsonb("ai_avatar"),
  audioAvatarId: integer("audio_avatar_id").default(0).notNull(),
  videoAssessment: boolean("video_assessment").default(false),
  atsFamiliar: text("ats_familiar"),
  useOfPurpose: jsonb("use_of_purpose"),
  recruiterUserId: uuid("recruiter_user_id"),
  recruiterActive: boolean("recruiter_active").default(false),
  greenhouseKey: text("greenhouse_key"),
  assistantId: text("assistant_id"),
  ashbyKey: text("ashby_key"),
  ashbySyncToken: text("ashby_sync_token"),
  ashbyLastSynced: timestamp("ashby_last_synced", {
    withTimezone: true,
    mode: "string",
  }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const recruiterUser = pgTable("recruiter_user", {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  userId: uuid("user_id").primaryKey().notNull(),
  recruiterId: uuid("recruiter_id").references(() => recruiter.id, {
    onDelete: "cascade",
  }),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  profileImage: text("profile_image"),
  phone: text("phone"),
  joinedAt: timestamp("joined_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  joinStatus: text("join_status").default("invited").notNull(),
  isDeactivated: boolean("is_deactivated").default(false),
  position: text("position"),
  emailAuth: jsonb("email_auth"),
  // TODO: failed to parse database type 'jsonb[]'
  emailOutreachTemplates: jsonb("email_outreach_templates").array(),
  role: recruiterRoles("role").default("admin").notNull(),
});

export const recruiterRelation = pgTable(
  "recruiter_relation",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    recruiterId: uuid("recruiter_id")
      .notNull()
      .references(() => recruiter.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    createdBy: uuid("created_by")
      .default(sql`auth.uid()`)
      .notNull(),
  },
  (table) => {
    return {
      recruiterRelationUkey: unique("recruiter_relation_ukey").on(
        table.recruiterId,
        table.userId
      ),
    };
  }
);

export const publicJobs = pgTable("public_jobs", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  companyDetails: text("company_details"),
  overview: text("overview"),
  logo: text("logo"),
  company: text("company"),
  location: text("location"),
  jobTitle: text("job_title"),
  description: text("description"),
  skills: text("skills").array(),
  slug: text("slug").default("").notNull(),
  jobType: text("job_type"),
  workplaceType: text("workplace_type"),
  screeningSetting: jsonb("screening_setting").default({}),
  // TODO: failed to parse database type 'jsonb[]'
  screeningQuestions: jsonb("screening_questions").array(),
  jobCriteria: jsonb("job_criteria").default({}),
  postedBy: text("posted_by").default("Aglint").notNull(),
  emailTemplate: jsonb("email_template")
    .default({
      interview: {
        body: "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>",
        default: true,
        subject:
          "Congratulations! You''ve Been Selected for an Assessment with [companyName]",
        fromName: "aglint",
      },
      rejection: {
        body: "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>",
        default: true,
        subject: "Your application at [companyName]",
        fromName: "aglint",
      },
      phone_screening: {
        body: "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>",
        default: true,
        subject:
          "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]",
        fromName: "aglint",
      },
      interview_resend: {
        body: "<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>",
        default: true,
        subject:
          "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]",
        fromName: "aglint",
      },
      application_recieved: {
        body: "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>",
        default: true,
        subject: "We received your application for a position at [companyName]",
        fromName: "aglint",
      },
      phone_screening_resend: {
        body: "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>",
        default: true,
        subject:
          "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]",
        fromName: "aglint",
      },
    })
    .notNull(),
  activeStatus: jsonb("active_status")
    .default({
      closed: { isActive: false, timeStamp: null },
      sourcing: { isActive: false, timeStamp: null },
      interviewing: { isActive: false, timeStamp: null },
    })
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
  department: text("department"),
  recruiterId: uuid("recruiter_id")
    .notNull()
    .references(() => recruiter.id, { onDelete: "cascade" }),
  newScreeningSetting: jsonb("new_screening_setting")
    .default({
      interview: { isManual: true, qualificationRange: null },
      screening: { isManual: true, qualificationRange: null },
      interviewMail: { isManual: true, timestamp: null },
      feedbackVisible: false,
      disqualifiedMail: { isManual: true, timestamp: null },
    })
    .notNull(),
  parameterWeights: jsonb("parameter_weights")
    .default({ skills: 45, education: 5, experience: 50 })
    .notNull(),
  jdJson: jsonb("jd_json"),
  endVideo: jsonb("end_video"),
  introVideos: jsonb("intro_videos"),
  startVideo: jsonb("start_video"),
  videoAssessment: boolean("video_assessment").default(false).notNull(),
  draft: jsonb("draft"),
  status: text("status").default("draft").notNull(),
  interviewInstructions: text("interview_instructions"),
  assessment: boolean("assessment").default(false),
  isAtsSync: boolean("is_ats_sync").default(false).notNull(),
  phoneScreening: jsonb("phone_screening"),
  jdChanged: boolean("jd_changed").default(false),
  phoneScreenEnabled: boolean("phone_screen_enabled").default(false),
  // TODO: failed to parse database type 'vector'
  jobDetailsEmbedding: text("job_details_embedding"),
  experienceInMonths: integer("experience_in_months"),
  locationJson: jsonb("location_json"),
});

export const aiVideos = pgTable("ai_videos", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  videoId: varchar("video_id"),
  videoUrl: varchar("video_url"),
  fileUrl: varchar("file_url"),
  error: jsonb("error"),
});

export const greenhouseReference = pgTable("greenhouse_reference", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  applicationId: uuid("application_id").notNull(),
  publicJobId: uuid("public_job_id").notNull(),
  postingId: text("posting_id").notNull(),
  greenhouseId: text("greenhouse_id").notNull(),
  resume: text("resume"),
  resumeSaved: boolean("resume_saved").default(false).notNull(),
});

export const jobAssiatanChatMessages = pgTable("job_assiatan_chat_messages", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  jobAssiatanChatId: uuid("job_assiatan_chat_id")
    .notNull()
    .references(() => jobAssiatanChat.id, { onDelete: "cascade" }),
  sender: text("sender").notNull(),
  type: text("type").notNull(),
  messageId: text("message_id").notNull(),
  content: jsonb("content").notNull(),
});

export const rpLogs = pgTable("rp_logs", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  applicationId: uuid("application_id").notNull(),
  logs: jsonb("logs").default({}).notNull(),
});

// export const jsonResume = pgTable("json_resume", {
// 	?column?: jsonb("?column?"),
// });

export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  appliedAt: timestamp("applied_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  jobId: uuid("job_id")
    .notNull()
    .references(() => publicJobs.id, { onDelete: "cascade" }),
  candidateFileId: uuid("candidate_file_id").references(
    () => candidateFiles.id,
    { onDelete: "set null" }
  ),
  scoreJson: jsonb("score_json"),
  overallScore: integer("overall_score").default(-1).notNull(),
  processingStatus: applicationProcessingStatus("processing_status")
    .default("not started")
    .notNull(),
  status: applicationStatus("status").default("new").notNull(),
  retry: integer("retry").default(0).notNull(),
  statusEmailsSent: jsonb("status_emails_sent").default({}).notNull(),
  isResumeFetching: boolean("is_resume_fetching").default(false).notNull(),
  assessmentId: uuid("assessment_id").references(
    (): AnyPgColumn => assessmentResults.id,
    { onDelete: "set null" }
  ),
  phoneScreening: jsonb("phone_screening"),
  candidateId: uuid("candidate_id").references(() => candidates.id, {
    onDelete: "cascade",
  }),
});

export const companySearchCache = pgTable("company_search_cache", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  companyName: text("company_name").notNull(),
  websiteUrl: text("website_url"),
  searchResult: jsonb("search_result").notNull(),
});

export const rpTokenUsage = pgTable("rp_token_usage", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  applicationId: uuid("application_id").notNull(),
  tokenUsedJson: jsonb("token_used_json"),
  totalTokenUsed: integer("total_token_used"),
  task: text("task"),
});

export const candidateSearchHistory = pgTable("candidate_search_history", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  recruiterId: uuid("recruiter_id")
    .notNull()
    .references(() => recruiter.id, { onDelete: "cascade" }),
  isSearchJd: boolean("is_search_jd").default(false),
  queryJson: jsonb("query_json"),
  // TODO: failed to parse database type 'jsonb[]'
  searchResults: jsonb("search_results").array(),
  bookmarkedCandidates: text("bookmarked_candidates").default("{}").array(),
  searchQuery: text("search_query"),
  dbSearch: dbSearchType("db_search").default("candidate"),
  candidates: text("candidates").default("{}").array().notNull(),
  usedCredits: jsonb("used_credits")
    .default({ email_credits: 0, export_credits: 0, mobile_credits: 0 })
    .notNull(),
});

export const candidateFiles = pgTable("candidate_files", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  candidateId: uuid("candidate_id")
    .notNull()
    .references(() => candidates.id, { onDelete: "cascade" }),
  fileUrl: text("file_url"),
  resumeText: text("resume_text"),
  resumeJson: jsonb("resume_json"),
  // TODO: failed to parse database type 'vector'
  skillsEmbedding: text("skills_embedding"),
  // TODO: failed to parse database type 'vector'
  educationEmbedding: text("education_embedding"),
  // TODO: failed to parse database type 'vector'
  experienceEmbedding: text("experience_embedding"),
  // TODO: failed to parse database type 'vector'
  resumeEmbedding: text("resume_embedding"),
  type: fileType("type").default("resume"),
});
