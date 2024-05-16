"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateFiles = exports.candidateSearchHistory = exports.rpTokenUsage = exports.companySearchCache = exports.applications = exports.rpLogs = exports.jobAssiatanChatMessages = exports.greenhouseReference = exports.aiVideos = exports.publicJobs = exports.recruiterRelation = exports.recruiterUser = exports.recruiter = exports.supportTicket = exports.supportGroups = exports.leverReference = exports.leverJobReference = exports.outreachedEmails = exports.candidates = exports.notifyMe = exports.env = exports.candidateList = exports.jobAssiatanChat = exports.aglintCandidates = exports.applicationReference = exports.threads = exports.assessmentResults = exports.jobReference = exports.emailFetchStatus = exports.dbSearchType = exports.recruiterRoles = exports.applicationStatus = exports.applicationProcessingStatus = exports.fileType = exports.codeChallengeMethod = exports.aalLevel = exports.factorStatus = exports.factorType = exports.requestStatus = exports.keyType = exports.keyStatus = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.keyStatus = (0, pg_core_1.pgEnum)("key_status", ['default', 'valid', 'invalid', 'expired']);
exports.keyType = (0, pg_core_1.pgEnum)("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20']);
exports.requestStatus = (0, pg_core_1.pgEnum)("request_status", ['PENDING', 'SUCCESS', 'ERROR']);
exports.factorType = (0, pg_core_1.pgEnum)("factor_type", ['totp', 'webauthn']);
exports.factorStatus = (0, pg_core_1.pgEnum)("factor_status", ['unverified', 'verified']);
exports.aalLevel = (0, pg_core_1.pgEnum)("aal_level", ['aal1', 'aal2', 'aal3']);
exports.codeChallengeMethod = (0, pg_core_1.pgEnum)("code_challenge_method", ['s256', 'plain']);
exports.fileType = (0, pg_core_1.pgEnum)("file_type", ['resume', 'coverletter', 'cv', 'image']);
exports.applicationProcessingStatus = (0, pg_core_1.pgEnum)("application_processing_status", ['success', 'not started', 'processing', 'failed']);
exports.applicationStatus = (0, pg_core_1.pgEnum)("application_status", ['screening', 'new', 'assessment', 'qualified', 'disqualified']);
exports.recruiterRoles = (0, pg_core_1.pgEnum)("recruiter_roles", ['admin', 'recruiter', 'human resource']);
exports.dbSearchType = (0, pg_core_1.pgEnum)("db_search_type", ['aglint', 'candidate']);
exports.emailFetchStatus = (0, pg_core_1.pgEnum)("email_fetch_status", ['not fetched', 'success', 'unable to fetch']);
exports.jobReference = (0, pg_core_1.pgTable)("job_reference", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    atsJson: (0, pg_core_1.jsonb)("ats_json"),
    publicJobId: (0, pg_core_1.uuid)("public_job_id").notNull().references(() => exports.publicJobs.id, { onDelete: "cascade" }),
    ats: (0, pg_core_1.text)("ats"),
    atsJobId: (0, pg_core_1.text)("ats_job_id").notNull(),
    recruiterId: (0, pg_core_1.uuid)("recruiter_id").notNull().references(() => exports.recruiter.id, { onDelete: "cascade" }),
});
exports.assessmentResults = (0, pg_core_1.pgTable)("assessment_results", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    interviewDuration: (0, pg_core_1.text)("interview_duration").notNull(),
    aiInterviewerId: (0, pg_core_1.integer)("ai_interviewer_id").notNull(),
    interviewScore: (0, pg_core_1.integer)("interview_score").default('0').notNull(),
    feedback: (0, pg_core_1.jsonb)("feedback").notNull(),
    // TODO: failed to parse database type 'jsonb[]'
    conversation: unknown("conversation").array().notNull(),
    interviewingDate: (0, pg_core_1.timestamp)("interviewing_date", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    applicationId: (0, pg_core_1.uuid)("application_id").notNull().references(() => exports.applications.id, { onDelete: "cascade" }),
});
exports.threads = (0, pg_core_1.pgTable)("threads", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    threadId: (0, pg_core_1.text)("thread_id"),
    assistantId: (0, pg_core_1.text)("assistant_id"),
    candidateName: (0, pg_core_1.text)("candidate_name"),
    candidateEmail: (0, pg_core_1.text)("candidate_email"),
    candidatePhone: (0, pg_core_1.text)("candidate_phone"),
    chatEnd: (0, pg_core_1.boolean)("chat_end"),
    applied: (0, pg_core_1.boolean)("applied"),
    linkedinUrl: (0, pg_core_1.text)("linkedin_url"),
});
exports.applicationReference = (0, pg_core_1.pgTable)("application_reference", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    atsJson: (0, pg_core_1.json)("ats_json").notNull(),
    isProcessed: (0, pg_core_1.boolean)("is_processed").default(false).notNull(),
    recruiterId: (0, pg_core_1.uuid)("recruiter_id").notNull(),
});
exports.aglintCandidates = (0, pg_core_1.pgTable)("aglint_candidates", {
    aglintId: (0, pg_core_1.uuid)("aglint_id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    id: (0, pg_core_1.text)("id").notNull(),
    city: (0, pg_core_1.text)("city"),
    name: (0, pg_core_1.text)("name"),
    email: (0, pg_core_1.text)("email"),
    state: (0, pg_core_1.text)("state"),
    title: (0, pg_core_1.text)("title"),
    country: (0, pg_core_1.text)("country"),
    headline: (0, pg_core_1.text)("headline"),
    functions: (0, pg_core_1.text)("functions").array(),
    lastName: (0, pg_core_1.text)("last_name"),
    photoUrl: (0, pg_core_1.text)("photo_url"),
    seniority: (0, pg_core_1.text)("seniority"),
    firstName: (0, pg_core_1.text)("first_name"),
    githubUrl: (0, pg_core_1.text)("github_url"),
    departments: (0, pg_core_1.text)("departments").array(),
    showIntent: (0, pg_core_1.boolean)("show_intent"),
    twitterUrl: (0, pg_core_1.text)("twitter_url"),
    emailStatus: (0, pg_core_1.text)("email_status"),
    facebookUrl: (0, pg_core_1.text)("facebook_url"),
    linkedinUrl: (0, pg_core_1.text)("linkedin_url"),
    organization: (0, pg_core_1.jsonb)("organization"),
    subdepartments: (0, pg_core_1.text)("subdepartments").array(),
    intentStrength: (0, pg_core_1.text)("intent_strength"),
    organizationId: (0, pg_core_1.text)("organization_id"),
    // TODO: failed to parse database type 'jsonb[]'
    employmentHistory: unknown("employment_history").array(),
    isLikelyToEngage: (0, pg_core_1.boolean)("is_likely_to_engage"),
    revealedForCurrentTeam: (0, pg_core_1.boolean)("revealed_for_current_team"),
    extrapolatedEmailConfidence: (0, pg_core_1.text)("extrapolated_email_confidence"),
    searchQuery: (0, pg_core_1.jsonb)("search_query").notNull(),
    phoneNumbers: (0, pg_core_1.jsonb)("phone_numbers"),
    emailFetchStatus: (0, exports.emailFetchStatus)("email_fetch_status").default('not fetched').notNull(),
});
exports.jobAssiatanChat = (0, pg_core_1.pgTable)("job_assiatan_chat", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    jobId: (0, pg_core_1.uuid)("job_id").notNull().references(() => exports.publicJobs.id, { onDelete: "cascade" }),
    name: (0, pg_core_1.text)("name"),
    threadId: (0, pg_core_1.text)("thread_id").notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    lastMessage: (0, pg_core_1.text)("last_message"),
});
exports.candidateList = (0, pg_core_1.pgTable)("candidate_list", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    candidates: (0, pg_core_1.text)("candidates").default('{}').array().notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    recruiterId: (0, pg_core_1.uuid)("recruiter_id").notNull().references(() => exports.recruiter.id, { onDelete: "cascade" }),
});
exports.env = (0, pg_core_1.pgTable)("env", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    name: (0, pg_core_1.text)("name"),
    value: (0, pg_core_1.text)("value"),
});
exports.notifyMe = (0, pg_core_1.pgTable)("notify_me", {
    id: (0, pg_core_1.uuid)("id").default((0, drizzle_orm_1.sql) `uuid_generate_v4()`).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).defaultNow(),
    email: (0, pg_core_1.text)("email").notNull(),
    jobId: (0, pg_core_1.text)("job_id"),
    jobTitle: (0, pg_core_1.text)("job_title"),
});
exports.candidates = (0, pg_core_1.pgTable)("candidates", {
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    recruiterId: (0, pg_core_1.uuid)("recruiter_id").references(() => exports.recruiter.id, { onDelete: "cascade" }),
    // TODO: failed to parse database type 'citext'
    email: unknown("email").notNull(),
    avatar: (0, pg_core_1.text)("avatar"),
    city: (0, pg_core_1.text)("city"),
    state: (0, pg_core_1.text)("state"),
    country: (0, pg_core_1.text)("country"),
    experienceInMonths: (0, pg_core_1.integer)("experience_in_months"),
    lastUpdated: (0, pg_core_1.timestamp)("last_updated", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    id: (0, pg_core_1.uuid)("id").default((0, drizzle_orm_1.sql) `uuid_generate_v4()`).primaryKey().notNull(),
    // TODO: failed to parse database type 'citext'
    firstName: unknown("first_name").notNull(),
    // TODO: failed to parse database type 'citext'
    lastName: unknown("last_name"),
    // TODO: failed to parse database type 'geometry'
    geolocation: unknown("geolocation"),
    linkedin: (0, pg_core_1.text)("linkedin"),
    phone: (0, pg_core_1.text)("phone"),
    currentCompany: (0, pg_core_1.text)("current_company"),
}, (table) => {
    return {
        candidateUkey: (0, pg_core_1.unique)("candidate_ukey").on(table.recruiterId, table.email),
        candidatesIdKey: (0, pg_core_1.unique)("candidates_id_key").on(table.id),
    };
});
exports.outreachedEmails = (0, pg_core_1.pgTable)("outreached_emails", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    candidateId: (0, pg_core_1.text)("candidate_id").notNull(),
    email: (0, pg_core_1.jsonb)("email").default({}).notNull(),
    emailSent: (0, pg_core_1.boolean)("email_sent").default(false).notNull(),
    recruiterUserId: (0, pg_core_1.uuid)("recruiter_user_id").notNull().references(() => exports.recruiterUser.userId, { onDelete: "cascade" }),
});
exports.leverJobReference = (0, pg_core_1.pgTable)("lever_job_reference", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    lastSyncedAt: (0, pg_core_1.timestamp)("last_synced_at", { mode: 'string' }).defaultNow(),
    postingId: (0, pg_core_1.uuid)("posting_id").notNull(),
    jobId: (0, pg_core_1.uuid)("job_id").notNull().references(() => exports.publicJobs.id, { onDelete: "cascade" }),
    recruiterId: (0, pg_core_1.uuid)("recruiter_id").references(() => exports.recruiter.id, { onDelete: "cascade" }),
});
exports.leverReference = (0, pg_core_1.pgTable)("lever_reference", {
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    lastSynced: (0, pg_core_1.timestamp)("last_synced", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    applicationId: (0, pg_core_1.uuid)("application_id").primaryKey().notNull(),
    opportunityId: (0, pg_core_1.uuid)("opportunity_id").notNull(),
    postingId: (0, pg_core_1.uuid)("posting_id").notNull(),
    publicJobId: (0, pg_core_1.uuid)("public_job_id").notNull().references(() => exports.publicJobs.id, { onDelete: "cascade" }),
    stage: (0, pg_core_1.text)("stage"),
    feedback: (0, pg_core_1.jsonb)("feedback"),
});
exports.supportGroups = (0, pg_core_1.pgTable)("support_groups", {
    id: (0, pg_core_1.uuid)("id").default((0, drizzle_orm_1.sql) `uuid_generate_v4()`).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow(),
    userIds: (0, pg_core_1.uuid)("user_ids").default((0, drizzle_orm_1.sql) `'{}'`).array().notNull(),
    companyId: (0, pg_core_1.uuid)("company_id").references(() => exports.recruiter.id, { onDelete: "cascade" }),
});
exports.supportTicket = (0, pg_core_1.pgTable)("support_ticket", {
    idx: (0, pg_core_1.uuid)("idx").default((0, drizzle_orm_1.sql) `uuid_generate_v4()`).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow(),
    userId: (0, pg_core_1.uuid)("user_id").references(() => users.id, { onDelete: "cascade" }),
    companyId: (0, pg_core_1.uuid)("company_id").references(() => exports.recruiter.id, { onDelete: "cascade" }),
    jobId: (0, pg_core_1.uuid)("job_id").notNull().references(() => exports.publicJobs.id, { onDelete: "cascade" }),
    title: (0, pg_core_1.text)("title").notNull(),
    type: (0, pg_core_1.text)("type").notNull(),
    actionPending: (0, pg_core_1.jsonb)("action_pending").default({}).notNull(),
    assignTo: (0, pg_core_1.uuid)("assign_to"),
    // TODO: failed to parse database type 'jsonb[]'
    content: unknown("content").array().notNull(),
    state: (0, pg_core_1.text)("state").default('created').notNull(),
    priority: (0, pg_core_1.text)("priority").default('low').notNull(),
    userName: (0, pg_core_1.text)("user_name").notNull(),
    emailUpdates: (0, pg_core_1.boolean)("email_updates").default(false).notNull(),
    email: (0, pg_core_1.text)("email"),
    attachments: (0, pg_core_1.text)("attachments").array(),
    supportGroupId: (0, pg_core_1.uuid)("support_group_id"),
    applicationId: (0, pg_core_1.uuid)("application_id"),
    id: (0, pg_core_1.text)("id").default('').primaryKey().notNull(),
});
exports.recruiter = (0, pg_core_1.pgTable)("recruiter", {
    id: (0, pg_core_1.uuid)("id").default((0, drizzle_orm_1.sql) `uuid_generate_v4()`).primaryKey().notNull(),
    recruiterType: (0, pg_core_1.text)("recruiter_type"),
    name: (0, pg_core_1.text)("name"),
    email: (0, pg_core_1.text)("email"),
    companyWebsite: (0, pg_core_1.text)("company_website"),
    industry: (0, pg_core_1.text)("industry"),
    logo: (0, pg_core_1.text)("logo"),
    phoneNumber: (0, pg_core_1.text)("phone_number"),
    primaryContact: (0, pg_core_1.jsonb)("primary_contact"),
    hrContact: (0, pg_core_1.jsonb)("hr_contact"),
    availableRoles: (0, pg_core_1.text)("available_roles").default('{}').array().notNull(),
    departments: (0, pg_core_1.text)("departments").default('{}').array().notNull(),
    technologyScore: (0, pg_core_1.text)("technology_score").default('{}').array().notNull(),
    companyOverview: (0, pg_core_1.text)("company_overview"),
    eOStatement: (0, pg_core_1.text)("e_o_statement"),
    applicationProcess: (0, pg_core_1.text)("application_process"),
    mVStatement: (0, pg_core_1.text)("m_v_statement"),
    employmentType: (0, pg_core_1.jsonb)("employment_type").default({ "contract": true, "fulltime": true, "parttime": true, "temporary": true, "volunteer": true, "internship": true }).notNull(),
    workplaceType: (0, pg_core_1.jsonb)("workplace_type").default({ "hybrid": true, "onsite": true, "offsite": true }).notNull(),
    emailTemplate: (0, pg_core_1.jsonb)("email_template").default({ "interview": { "body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''ve Been Selected for an Assessment with [companyName]", "fromName": "aglint" }, "rejection": { "body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "aglint" }, "phone_screening": { "body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "aglint" }, "interview_resend": { "body": "<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "aglint" }, "application_recieved": { "body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "aglint" }, "phone_screening_resend": { "body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "aglint" } }).notNull(),
    companyValues: (0, pg_core_1.text)("company_values"),
    benefits: (0, pg_core_1.text)("benefits"),
    employeeSize: (0, pg_core_1.text)("employee_size"),
    // TODO: failed to parse database type 'jsonb[]'
    officeLocations: unknown("office_locations").array(),
    socials: (0, pg_core_1.jsonb)("socials").default({ "custom": {}, "twitter": "", "youtube": "", "facebook": "", "linkedin": "", "instagram": "" }),
    roles: (0, pg_core_1.jsonb)("roles").default({ "admin": { "sourcing": true, "screening": true, "job_posting": true, "manage_roles": true, "manage_users": { "admin": true, "recruiter": true, "interviewer": true, "human resource": true }, "edit_workflow": true, "send_interview_link": true, "view_candidates_profile": true }, "recruiter": { "sourcing": true, "screening": true, "job_posting": true, "manage_roles": false, "manage_users": { "admin": false, "recruiter": false, "interviewer": true, "human resource": false }, "edit_workflow": true, "send_interview_link": true, "view_candidates_profile": true }, "human resource": { "sourcing": true, "screening": true, "job_posting": true, "manage_roles": false, "manage_users": { "admin": false, "recruiter": true, "interviewer": true, "human resource": false }, "edit_workflow": true, "send_interview_link": true, "view_candidates_profile": true } }).notNull(),
    leverKey: (0, pg_core_1.text)("lever_key"),
    aiAvatar: (0, pg_core_1.jsonb)("ai_avatar"),
    audioAvatarId: (0, pg_core_1.integer)("audio_avatar_id").default('0').notNull(),
    videoAssessment: (0, pg_core_1.boolean)("video_assessment").default(false),
    atsFamiliar: (0, pg_core_1.text)("ats_familiar"),
    useOfPurpose: (0, pg_core_1.jsonb)("use_of_purpose"),
    recruiterUserId: (0, pg_core_1.uuid)("recruiter_user_id"),
    recruiterActive: (0, pg_core_1.boolean)("recruiter_active").default(false),
    greenhouseKey: (0, pg_core_1.text)("greenhouse_key"),
    assistantId: (0, pg_core_1.text)("assistant_id"),
    ashbyKey: (0, pg_core_1.text)("ashby_key"),
    ashbySyncToken: (0, pg_core_1.text)("ashby_sync_token"),
    ashbyLastSynced: (0, pg_core_1.timestamp)("ashby_last_synced", { withTimezone: true, mode: 'string' }),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});
exports.recruiterUser = (0, pg_core_1.pgTable)("recruiter_user", {
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    userId: (0, pg_core_1.uuid)("user_id").primaryKey().notNull().references(() => users.id, { onDelete: "cascade" }),
    recruiterId: (0, pg_core_1.uuid)("recruiter_id").references(() => exports.recruiter.id, { onDelete: "cascade" }),
    firstName: (0, pg_core_1.text)("first_name"),
    lastName: (0, pg_core_1.text)("last_name"),
    email: (0, pg_core_1.text)("email"),
    profileImage: (0, pg_core_1.text)("profile_image"),
    phone: (0, pg_core_1.text)("phone"),
    joinedAt: (0, pg_core_1.timestamp)("joined_at", { withTimezone: true, mode: 'string' }).defaultNow(),
    joinStatus: (0, pg_core_1.text)("join_status").default('invited').notNull(),
    isDeactivated: (0, pg_core_1.boolean)("is_deactivated").default(false),
    position: (0, pg_core_1.text)("position"),
    emailAuth: (0, pg_core_1.jsonb)("email_auth"),
    // TODO: failed to parse database type 'jsonb[]'
    emailOutreachTemplates: unknown("email_outreach_templates").array(),
    role: (0, exports.recruiterRoles)("role").default('admin').notNull(),
});
exports.recruiterRelation = (0, pg_core_1.pgTable)("recruiter_relation", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    recruiterId: (0, pg_core_1.uuid)("recruiter_id").notNull().references(() => exports.recruiter.id, { onDelete: "cascade" }),
    userId: (0, pg_core_1.uuid)("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    isActive: (0, pg_core_1.boolean)("is_active").default(false).notNull(),
    createdBy: (0, pg_core_1.uuid)("created_by").default((0, drizzle_orm_1.sql) `auth.uid()`).notNull().references(() => users.id, { onDelete: "cascade" }),
}, (table) => {
    return {
        recruiterRelationUkey: (0, pg_core_1.unique)("recruiter_relation_ukey").on(table.recruiterId, table.userId),
    };
});
exports.publicJobs = (0, pg_core_1.pgTable)("public_jobs", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    companyDetails: (0, pg_core_1.text)("company_details"),
    overview: (0, pg_core_1.text)("overview"),
    logo: (0, pg_core_1.text)("logo"),
    company: (0, pg_core_1.text)("company"),
    location: (0, pg_core_1.text)("location"),
    jobTitle: (0, pg_core_1.text)("job_title"),
    description: (0, pg_core_1.text)("description"),
    skills: (0, pg_core_1.text)("skills").array(),
    slug: (0, pg_core_1.text)("slug").default('').notNull(),
    jobType: (0, pg_core_1.text)("job_type"),
    workplaceType: (0, pg_core_1.text)("workplace_type"),
    screeningSetting: (0, pg_core_1.jsonb)("screening_setting").default({}),
    // TODO: failed to parse database type 'jsonb[]'
    screeningQuestions: unknown("screening_questions").array(),
    jobCriteria: (0, pg_core_1.jsonb)("job_criteria").default({}),
    postedBy: (0, pg_core_1.text)("posted_by").default('Aglint').notNull(),
    emailTemplate: (0, pg_core_1.jsonb)("email_template").default({ "interview": { "body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''ve Been Selected for an Assessment with [companyName]", "fromName": "aglint" }, "rejection": { "body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "aglint" }, "phone_screening": { "body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "aglint" }, "interview_resend": { "body": "<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "aglint" }, "application_recieved": { "body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "aglint" }, "phone_screening_resend": { "body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "aglint" } }).notNull(),
    activeStatus: (0, pg_core_1.jsonb)("active_status").default({ "closed": { "isActive": false, "timeStamp": null }, "sourcing": { "isActive": false, "timeStamp": null }, "interviewing": { "isActive": false, "timeStamp": null } }).notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow(),
    department: (0, pg_core_1.text)("department"),
    recruiterId: (0, pg_core_1.uuid)("recruiter_id").notNull().references(() => exports.recruiter.id, { onDelete: "cascade" }),
    newScreeningSetting: (0, pg_core_1.jsonb)("new_screening_setting").default({ "interview": { "isManual": true, "qualificationRange": null }, "screening": { "isManual": true, "qualificationRange": null }, "interviewMail": { "isManual": true, "timestamp": null }, "feedbackVisible": false, "disqualifiedMail": { "isManual": true, "timestamp": null } }).notNull(),
    parameterWeights: (0, pg_core_1.jsonb)("parameter_weights").default({ "skills": 45, "education": 5, "experience": 50 }).notNull(),
    jdJson: (0, pg_core_1.jsonb)("jd_json"),
    endVideo: (0, pg_core_1.jsonb)("end_video"),
    introVideos: (0, pg_core_1.jsonb)("intro_videos"),
    startVideo: (0, pg_core_1.jsonb)("start_video"),
    videoAssessment: (0, pg_core_1.boolean)("video_assessment").default(false).notNull(),
    draft: (0, pg_core_1.jsonb)("draft"),
    status: (0, pg_core_1.text)("status").default('draft').notNull(),
    interviewInstructions: (0, pg_core_1.text)("interview_instructions"),
    assessment: (0, pg_core_1.boolean)("assessment").default(false),
    isAtsSync: (0, pg_core_1.boolean)("is_ats_sync").default(false).notNull(),
    phoneScreening: (0, pg_core_1.jsonb)("phone_screening"),
    jdChanged: (0, pg_core_1.boolean)("jd_changed").default(false),
    phoneScreenEnabled: (0, pg_core_1.boolean)("phone_screen_enabled").default(false),
    // TODO: failed to parse database type 'vector'
    jobDetailsEmbedding: unknown("job_details_embedding"),
    experienceInMonths: (0, pg_core_1.integer)("experience_in_months"),
    locationJson: (0, pg_core_1.jsonb)("location_json"),
});
exports.aiVideos = (0, pg_core_1.pgTable)("ai_videos", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    videoId: (0, pg_core_1.varchar)("video_id"),
    videoUrl: (0, pg_core_1.varchar)("video_url"),
    fileUrl: (0, pg_core_1.varchar)("file_url"),
    error: (0, pg_core_1.jsonb)("error"),
});
exports.greenhouseReference = (0, pg_core_1.pgTable)("greenhouse_reference", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    applicationId: (0, pg_core_1.uuid)("application_id").notNull(),
    publicJobId: (0, pg_core_1.uuid)("public_job_id").notNull(),
    postingId: (0, pg_core_1.text)("posting_id").notNull(),
    greenhouseId: (0, pg_core_1.text)("greenhouse_id").notNull(),
    resume: (0, pg_core_1.text)("resume"),
    resumeSaved: (0, pg_core_1.boolean)("resume_saved").default(false).notNull(),
});
exports.jobAssiatanChatMessages = (0, pg_core_1.pgTable)("job_assiatan_chat_messages", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    jobAssiatanChatId: (0, pg_core_1.uuid)("job_assiatan_chat_id").notNull().references(() => exports.jobAssiatanChat.id, { onDelete: "cascade" }),
    sender: (0, pg_core_1.text)("sender").notNull(),
    type: (0, pg_core_1.text)("type").notNull(),
    messageId: (0, pg_core_1.text)("message_id").notNull(),
    content: (0, pg_core_1.jsonb)("content").notNull(),
});
exports.rpLogs = (0, pg_core_1.pgTable)("rp_logs", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    applicationId: (0, pg_core_1.uuid)("application_id").notNull(),
    logs: (0, pg_core_1.jsonb)("logs").default({}).notNull(),
});
// export const jsonResume = pgTable("json_resume", {
// 	?column?: jsonb("?column?"),
// });
exports.applications = (0, pg_core_1.pgTable)("applications", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    appliedAt: (0, pg_core_1.timestamp)("applied_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    jobId: (0, pg_core_1.uuid)("job_id").notNull().references(() => exports.publicJobs.id, { onDelete: "cascade" }),
    candidateFileId: (0, pg_core_1.uuid)("candidate_file_id").references(() => exports.candidateFiles.id, { onDelete: "set null" }),
    scoreJson: (0, pg_core_1.jsonb)("score_json"),
    overallScore: (0, pg_core_1.integer)("overall_score").default('-1').notNull(),
    processingStatus: (0, exports.applicationProcessingStatus)("processing_status").default('not started').notNull(),
    status: (0, exports.applicationStatus)("status").default('new').notNull(),
    retry: (0, pg_core_1.integer)("retry").default('0').notNull(),
    statusEmailsSent: (0, pg_core_1.jsonb)("status_emails_sent").default({}).notNull(),
    isResumeFetching: (0, pg_core_1.boolean)("is_resume_fetching").default(false).notNull(),
    assessmentId: (0, pg_core_1.uuid)("assessment_id").references(() => exports.assessmentResults.id, { onDelete: "set null" }),
    phoneScreening: (0, pg_core_1.jsonb)("phone_screening"),
    candidateId: (0, pg_core_1.uuid)("candidate_id").references(() => exports.candidates.id, { onDelete: "cascade" }),
});
exports.companySearchCache = (0, pg_core_1.pgTable)("company_search_cache", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    companyName: (0, pg_core_1.text)("company_name").notNull(),
    websiteUrl: (0, pg_core_1.text)("website_url"),
    searchResult: (0, pg_core_1.jsonb)("search_result").notNull(),
});
exports.rpTokenUsage = (0, pg_core_1.pgTable)("rp_token_usage", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    applicationId: (0, pg_core_1.uuid)("application_id").notNull(),
    tokenUsedJson: (0, pg_core_1.jsonb)("token_used_json"),
    totalTokenUsed: (0, pg_core_1.integer)("total_token_used"),
    task: (0, pg_core_1.text)("task"),
});
exports.candidateSearchHistory = (0, pg_core_1.pgTable)("candidate_search_history", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: (0, pg_core_1.bigint)("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    recruiterId: (0, pg_core_1.uuid)("recruiter_id").notNull().references(() => exports.recruiter.id, { onDelete: "cascade" }),
    isSearchJd: (0, pg_core_1.boolean)("is_search_jd").default(false),
    queryJson: (0, pg_core_1.jsonb)("query_json"),
    // TODO: failed to parse database type 'jsonb[]'
    searchResults: unknown("search_results").array(),
    bookmarkedCandidates: (0, pg_core_1.text)("bookmarked_candidates").default('{}').array(),
    searchQuery: (0, pg_core_1.text)("search_query"),
    dbSearch: (0, exports.dbSearchType)("db_search").default('candidate'),
    candidates: (0, pg_core_1.text)("candidates").default('{}').array().notNull(),
    usedCredits: (0, pg_core_1.jsonb)("used_credits").default({ "email_credits": 0, "export_credits": 0, "mobile_credits": 0 }).notNull(),
});
exports.candidateFiles = (0, pg_core_1.pgTable)("candidate_files", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    candidateId: (0, pg_core_1.uuid)("candidate_id").notNull().references(() => exports.candidates.id, { onDelete: "cascade" }),
    fileUrl: (0, pg_core_1.text)("file_url"),
    resumeText: (0, pg_core_1.text)("resume_text"),
    resumeJson: (0, pg_core_1.jsonb)("resume_json"),
    // TODO: failed to parse database type 'vector'
    skillsEmbedding: unknown("skills_embedding"),
    // TODO: failed to parse database type 'vector'
    educationEmbedding: unknown("education_embedding"),
    // TODO: failed to parse database type 'vector'
    experienceEmbedding: unknown("experience_embedding"),
    // TODO: failed to parse database type 'vector'
    resumeEmbedding: unknown("resume_embedding"),
    type: (0, exports.fileType)("type").default('resume'),
});
