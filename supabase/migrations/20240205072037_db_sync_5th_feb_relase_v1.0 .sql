-- alter table "public"."candidates" alter column "recruiter_id" drop not null;

alter table "public"."public_jobs" add column "experience_in_months" numeric;

alter table "public"."public_jobs" add column "job_details_embedding" vector;

alter table "public"."public_jobs" add column "location_json" jsonb;

alter table "public"."public_jobs" alter column "email_template" set default '{"interview": {"body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''ve Been Selected for an Assessment with [companyName]", "fromName": "aglint"}, "rejection": {"body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "aglint"}, "phone_screening": {"body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "aglint"}, "interview_resend": {"body": "<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "aglint"}, "application_recieved": {"body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "aglint"}, "phone_screening_resend": {"body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "aglint"}}'::jsonb;

alter table "public"."recruiter" alter column "email_template" set default '{"interview": {"body": "<p>Dear [firstName],</p><p>Thank you for submitting your application for the [jobTitle] at [companyName]. We''re pleased to announce that you''ve been selected for an assessment.</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Congratulations! You''ve Been Selected for an Assessment with [companyName]", "fromName": "aglint"}, "rejection": {"body": "<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "Your application at [companyName]", "fromName": "aglint"}, "phone_screening": {"body": "<p>Dear [firstName],</p><p>I hope this message finds you well. We appreciate your interest in the [jobTitle] position at [companyName], and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: [phoneScreeningLink]</p><p>Best regards ,</p><p>[companyName]</p>", "default": true, "subject": "Invitation to a Phone Screening Session for [firstName] - [jobTitle] Position at [companyName]", "fromName": "aglint"}, "interview_resend": {"body": "<p>Dear [firstName],</p><p>We noticed that you haven''t given your assessment for the [jobTitle] position at [companyName]. Don''t miss this opportunity!</p><p>You''re welcome to choose an assessment time that suits your schedule.</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Schedule Your Assessment for [jobTitle] at [companyName]", "fromName": "aglint"}, "application_recieved": {"body": "<p>Hi [firstName],</p><p>You have successfully submitted your application for this position:</p><p>[jobTitle]</p><p>We will review your application shortly. If your profile match our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in [companyName].</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>Sincerely,</p><p>[companyName]</p>", "default": true, "subject": "We received your application for a position at [companyName]", "fromName": "aglint"}, "phone_screening_resend": {"body": "<p>Dear [firstName],</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the [jobTitle] position at [companyName]. We wouldn''t want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>[phoneScreeningLink]</p><p>We''re looking forward to hearing from you soon!</p><p>Warm regards,</p><p>[companyName]</p>", "default": true, "subject": "Reminder: Complete Your Phone Screening for [jobTitle] Position at [companyName]", "fromName": "aglint"}}'::jsonb;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_resume_match(job_id text, top_match integer DEFAULT 80, good_match integer DEFAULT 60, average_match integer DEFAULT 40, poor_match integer DEFAULT 20)
 RETURNS TABLE(match_category text, count integer)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        categories.match_category,
        COALESCE(COUNT(match_alias.match_category), 0) AS count
    FROM 
        (
            SELECT 'top_match' AS match_category UNION ALL
            SELECT 'good_match' UNION ALL
            SELECT 'average_match' UNION ALL
            SELECT 'poor_match' UNION ALL
            SELECT 'no_match' UNION ALL
            SELECT 'unknown_match'
        ) AS categories
    LEFT JOIN (
        SELECT 
            CASE 
                WHEN overall_score <= 100 AND overall_score >= top_match THEN 'top_match'
                WHEN overall_score < top_match AND overall_score >= good_match THEN 'good_match'
                WHEN overall_score < good_match AND overall_score >= average_match THEN 'average_match'
                WHEN overall_score < average_match AND overall_score >= poor_match THEN 'poor_match'
                WHEN overall_score < poor_match AND overall_score >= 0 THEN 'no_match'
                ELSE 'unknown_match'
            END AS match_category
        FROM 
            applications
        WHERE 
            job_id = jobId::UUID
    ) AS match_alias
    ON categories.match_category = match_alias.match_category
    GROUP BY 
        categories.match_category;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getresumematch(jobid uuid, section application_status, topmatch integer DEFAULT 80, goodmatch integer DEFAULT 60, averagematch integer DEFAULT 40, poormatch integer DEFAULT 20)
 RETURNS TABLE(match text, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT categories.match, COALESCE(match_category.count, 0) AS count
    FROM (
      SELECT 'topMatch' AS match UNION ALL
      SELECT 'goodMatch' UNION ALL
      SELECT 'averageMatch' UNION ALL
      SELECT 'poorMatch' UNION ALL
      SELECT 'noMatch' UNION ALL
      SELECT 'unknownMatch'
    ) AS categories
    LEFT JOIN (
      SELECT 
        CASE 
          WHEN overall_score <= 100 AND overall_score >=topMatch THEN 'topMatch'
          WHEN overall_score < topMatch AND overall_score >=goodMatch THEN 'goodMatch'
          WHEN overall_score < goodMatch AND overall_score >=averageMatch THEN 'averageMatch'
          WHEN overall_score < averageMatch AND overall_score >=poorMatch THEN 'poorMatch'
          WHEN overall_score < poorMatch AND overall_score >=0 THEN 'noMatch'
          ELSE 'unknownMatch'
        END AS match,
        COUNT(*) AS count
        FROM 
        applications
        WHERE 
            job_id = jobId AND status = section
        GROUP BY 
            match
    ) AS match_category
    ON categories.match = match_category.match;
END
$function$
;

CREATE OR REPLACE FUNCTION public.set_active_rec(in_user_id uuid, in_recruiter_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
is_admin boolean;
BEGIN
      update recruiter_relation set is_active = (in_recruiter_id = recruiter_id) where user_id = in_user_id;
    RETURN true;
END;
$function$
;

create policy "authenticated delete access only"
on "public"."applications"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM public_jobs
  WHERE (public_jobs.id = applications.job_id))));



