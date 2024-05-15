DROP VIEW IF EXISTS meeting_details;

create view meeting_details as
select
    interview_meeting.*,
    interview_session.id as session_id,
    interview_session.name as session_name,
    interview_session.break_duration,
    interview_session.session_order,
    interview_session.session_duration,
    interview_session.session_type
from
    interview_meeting
    left join interview_session on interview_meeting.id = interview_session.meeting_id;

select
    *
from
    meeting_details