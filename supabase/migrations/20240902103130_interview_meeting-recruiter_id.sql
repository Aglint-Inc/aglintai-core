alter table "public"."interview_meeting" add column "recruiter_id" uuid;

alter table "public"."interview_meeting" add constraint "interview_meeting_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_meeting" validate constraint "interview_meeting_recruiter_id_fkey";

alter table "public"."interview_meeting" add column "job_id" uuid;

alter table "public"."interview_meeting" add constraint "interview_meeting_job_id_fkey" FOREIGN KEY (job_id) REFERENCES public_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_meeting" validate constraint "interview_meeting_job_id_fkey";

with interview_meeting_cte as (
    select 
        interview_meeting.id,
        applications.recruiter_id,
        applications.job_id
    from 
        interview_meeting
    left join
        applications on
            applications.id = interview_meeting.application_id
)
update "public"."interview_meeting"
set recruiter_id = interview_meeting_cte.recruiter_id, job_id = interview_meeting_cte.job_id
from interview_meeting_cte
where interview_meeting.id = interview_meeting_cte.id;

alter table "public"."interview_meeting" alter column "recruiter_id" set not null;

alter table "public"."interview_meeting" alter column "job_id" set not null;
