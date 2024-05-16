import {
  pgTable,
  uuid,
  timestamp,
  jsonb,
  integer,
  boolean,
  pgEnum,
  customType,
  text,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Assuming application_processing_status and application_status are custom enum types
export const application_processing_status = pgEnum(
  "application_processing_status",
  ["not started", "processing", "failed", "success"]
);
export const application_status = pgEnum("application_status", [
  "new",
  "assessment",
  "qualified",
  "disqualified",
]);
export const file_type = pgEnum("file_type", [
  "resume",
  "coverletter",
  "cv",
  "image",
]);

export const applicationsTable = pgTable("applications", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  applied_at: timestamp("applied_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  candidate_id: uuid("candidate_id")
    .notNull()
    .references(() => candidatesTable.id),
  job_id: uuid("job_id")
    .notNull()
    .references(() => publicJobsTable.id),
  candidate_file_id: uuid("candidate_file_id").references(
    () => candidateFilesTable.id
  ),
  score_json: jsonb("score_json"),
  overall_score: integer("overall_score"),
  processing_status: application_processing_status("processing_status")
    .default(sql`'not started'::application_processing_status`)
    .notNull(),
  status: application_status("status")
    .default(sql`'new'::application_status`)
    .notNull(),
  retry: integer("retry")
    .default(sql`'0'::numeric`)
    .notNull(),
  status_emails_sent: jsonb("status_emails_sent")
    .default(sql`'{}'::jsonb`)
    .notNull(),
  is_resume_fetching: boolean("is_resume_fetching").default(false).notNull(),
  assessment_id: uuid("assessment_id").references(
    () => assessmentResultsTable.id
  ),
  phone_screening: jsonb("phone_screening"),
});

// Note: You need to define the enums 'application_processing_status' and 'application_status' as per your database schema.
const citext = customType<{ data: string }>({
  dataType() {
    return "text";
  },
});
const geometry = customType<{
  data: [number, number];
  notNull: true;
  default: true;
}>({
  dataType() {
    return "[serial, serial]";
  },
});
const vector = customType<{
  data: number[];
  notNull: true;
  default: true;
}>({
  dataType() {
    return "serial[]";
  },
});

export const candidatesTable = pgTable("candidates", {
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .primaryKey(),
  recruiter_id: uuid("recruiter_id").notNull(),
  email: citext("email").notNull(),
  avatar: text("avatar"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  experience_in_months: integer("experince_in_months"),
  company: text("current_company"),
  last_updated: timestamp("last_updated", { withTimezone: true })
    .defaultNow()
    .notNull(),
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  first_name: citext("first_name")
    .default(sql`'not set'::citext`)
    .notNull(),
  last_name: citext("last_name"),
  geolocation: geometry("geolocation"),
  linkedin: text("linkedin"),
  phone: text("phone"),

  // Constraints
});

export const candidateFilesTable = pgTable("candidate_files", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  candidate_id: uuid("candidate_id").references(() => candidatesTable.id),
  file_url: text("file_url"),
  resume_text: text("resume_text"),
  resume_json: jsonb("resume_json"),
  skills_embedding: vector("skills_embedding"),
  education_embedding: vector("education_embedding"),
  experience_embedding: vector("experience_embedding"),
  resume_embedding: vector("resume_embedding"),
  type: file_type("type").default(sql`'resume'::file_type`),
});

export const publicJobsTable = pgTable("public_jobs", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  company_details: text("company_details"),
  overview: text("overview"),
  logo: text("logo"),
  company: text("company"),
  location: text("location"),
  job_title: text("job_title"),
  description: text("description"),
  skills: text("skills").array(),
  slug: text("slug")
    .default(sql`''::text`)
    .notNull(),
  job_type: text("job_type"),
  workplace_type: text("workplace_type"),
  screening_setting: jsonb("screening_setting").default(sql`'{}'::jsonb`),
  screening_questions: jsonb("screening_questions").array().default(sql`array[
    '{"id": "_TtFCnB4eaNdK5RZ-LsAL", "copy": "Skill", "category": "skill", "questions": []}'::jsonb,
    '{"id": "OHA290kmXtmow8f85UDWs", "copy": "Behavior", "category": "behavior", "questions": []}'::jsonb,
    '{"id": "LTezJA4H_rfZKdt1Rll9-", "copy": "communication", "category": "communication", "questions": []}'::jsonb,
    '{"id": "Myjsxafr-GsUMSO4O2-bJ", "copy": "Performance", "category": "performance", "questions": []}'::jsonb,
    '{"id": "wQcmD1Y72rtd4cMuk2CG1", "copy": "Education", "category": "education", "questions": []}'::jsonb,
    '{"id": "thq14SF4XYQk_XgTEx61e", "copy": "General", "category": "general", "questions": []}'::jsonb
  ]`),
  job_criteria: jsonb("job_criteria").default(sql`'{}'::jsonb`),
  posted_by: text("posted_by")
    .default(sql`'Aglint'::text`)
    .notNull(),
  email_template: jsonb("email_template")
    .default(
      sql`'{"followup": {"body": "", "subject": ""}, "interview": {"body": "", "subject": ""}, "rejection": {"body": "", "subject": ""}, "application_received": {"body": "", "subject": ""}}'::jsonb`
    )
    .notNull(),
  active_status: jsonb("active_status")
    .default(
      sql`'{"closed": {"isActive": false, "timeStamp": null}, "sourcing": {"isActive": false, "timeStamp": null}, "interviewing": {"isActive": false, "timeStamp": null}}'::jsonb`
    )
    .notNull(),
  updated_at: timestamp("updated_at"),
  department: text("department"),
  recruiter_id: uuid("recruiter_id").notNull(),
  new_screening_setting: jsonb("new_screening_setting")
    .default(
      sql`'{"interview": {"isManual": true, "qualificationRange": null}, "screening": {"isManual": true, "qualificationRange": null}, "interviewMail": {"isManual": true, "timestamp": null}, "feedbackVisible": false, "disqualifiedMail": {"isManual": true, "timestamp": null}}'::jsonb`
    )
    .notNull(),
  parameter_weights: jsonb("parameter_weights")
    .default(sql`'{"skills": 45, "education": 5, "experience": 50}'::jsonb`)
    .notNull(),
  jd_json: jsonb("jd_json"),
  end_video: jsonb("end_video"),
  intro_videos: jsonb("intro_videos"),
  start_video: jsonb("start_video"),
  video_assessment: boolean("video_assessment").default(false).notNull(),
  draft: jsonb("draft"),
  status: text("status")
    .default(sql`'draft'::text`)
    .notNull(),
  interview_instructions: text("interview_instructions"),
  assessment: boolean("assessment"),
  is_ats_sync: boolean("is_ats_sync").default(false).notNull(),
  jd_json_2: jsonb("jd_json_2"),
  phone_screening: jsonb("phone_screening"),
});

export const assessmentResultsTable = pgTable("assessment_results", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  interview_duration: text("interview_duration").notNull(),
  ai_interviewer_id: integer("ai_interviewer_id").notNull(),
  interview_score: integer("interview_score")
    .default(sql`'0'::integer`)
    .notNull(),
  feedback: jsonb("feedback").notNull(),
  conversation: jsonb("conversation").array().notNull(),
  interviewing_date: timestamp("interviewing_date", { withTimezone: true })
    .defaultNow()
    .notNull(),
  application_id: uuid("application_id").notNull(),
});

export const jobAssistantChatTable = pgTable("job_assiatan_chat", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  job_id: uuid("job_id")
    .notNull()
    .references(() => publicJobsTable.id),
  name: text("name"),
  thread_id: text("thread_id").notNull(),
  updated_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  last_message: text("last_message"),
});
