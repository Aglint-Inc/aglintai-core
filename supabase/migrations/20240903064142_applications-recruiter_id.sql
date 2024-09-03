alter table "public"."applications" add column "recruiter_id" uuid;

alter table "public"."applications" add constraint "applications_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_recruiter_id_fkey";

with application_cte as (
    select 
        applications.id,
        public_jobs.recruiter_id
    from 
        applications
    inner join
        public_jobs on
            public_jobs.id = applications.job_id
)
update "public"."applications"
set recruiter_id = application_cte.recruiter_id
from application_cte
where applications.id = application_cte.id;

alter table "public"."applications" alter column "recruiter_id" set not null;