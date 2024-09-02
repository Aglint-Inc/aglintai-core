alter table "public"."interview_plan" add column "recruiter_id" uuid;

alter table "public"."interview_plan" add constraint "interview_plan_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_plan" validate constraint "interview_plan_recruiter_id_fkey";

with interview_plan_cte as (
    select 
        interview_plan.id,
        (
            case
                when public_jobs.recruiter_id is not null then public_jobs.recruiter_id
                else applications.recruiter_id
            end
        ) as recruiter_id
    from 
        interview_plan
    left join
        public_jobs on
            public_jobs.id = interview_plan.job_id
    left join
        applications on
            applications.id = interview_plan.application_id
)
update "public"."interview_plan"
set recruiter_id = interview_plan_cte.recruiter_id
from interview_plan_cte
where interview_plan.id = interview_plan_cte.id;

delete from interview_plan
where interview_plan.job_id is null and interview_plan.application_id is null;

alter table "public"."interview_plan" alter column "recruiter_id" set not null;