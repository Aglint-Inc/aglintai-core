alter table "public"."interview_session" add column "recruiter_id" uuid;

alter table "public"."interview_session" add constraint "interview_session_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_session" validate constraint "interview_session_recruiter_id_fkey";

with interview_session_cte as (
    select 
        interview_session.id,
        (
            case 
                when interview_plan.recruiter_id is not null then interview_plan.recruiter_id
                else interview_meeting.recruiter_id
            end
        ) as recruiter_id
    from 
        interview_session
    left join
        interview_plan on
            interview_plan.id = interview_session.interview_plan_id
    left join 
        interview_meeting on
            interview_meeting.id = interview_session.meeting_id
    
)
update "public"."interview_session"
set recruiter_id = interview_session_cte.recruiter_id
from interview_session_cte
where interview_session.id = interview_session_cte.id;

delete from interview_session
where recruiter_id is null;

alter table "public"."interview_session" alter column "recruiter_id" set not null;
