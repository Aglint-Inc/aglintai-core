with sessions as (
  select
    id,
    session_order,
    interview_plan_id
  from
    interview_session
  order by 
    interview_plan_id, 
    session_order
), new_sessions as (
  select 
    id, 
    row_number() over (partition by interview_plan_id) as session_order
  from 
    sessions
)
update interview_session
set session_order = new_sessions.session_order
from new_sessions
where interview_session.id = new_sessions.id;

drop function if exists reorder_sessions;