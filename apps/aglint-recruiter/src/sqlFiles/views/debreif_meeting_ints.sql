DROP VIEW IF EXISTS debreif_meeting_interviewers;

create view debreif_meeting_interviewers as
select
    recruiter_user.first_name,
    recruiter_user.last_name,
    recruiter_user.profile_image,
    recruiter_user.email,
    recruiter_user.user_id,
    interview_session_relation.interviewer_type,
    interview_session_relation.training_type,
    interview_session_relation.is_confirmed,
    interview_session.meeting_id,
    interview_session.id as session_id
from
    interview_session_relation
    left join interview_session on interview_session.id = interview_session_relation.session_id
    left join recruiter_user on recruiter_user.user_id = interview_session_relation.user_id;

select
    *
from
    debreif_meeting_interviewers;