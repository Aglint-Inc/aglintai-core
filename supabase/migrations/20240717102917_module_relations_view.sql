drop view if exists module_relations_view;

create view
  public.module_relations_view as
with interview_data AS
(select
  interview_module_relation.id as module_relation_id,
  interview_module_relation.pause_json,
  interview_module_relation.training_status as module_training_status,
  interview_module_relation.user_id,
  interview_module_relation.module_id,
  interview_session_relation.training_type,
  recruiter_user.first_name,
  recruiter_user.position,
  recruiter_user.profile_image,
  recruiter_user.scheduling_settings,
  recruiter_user.phone,
  (
    SELECT
      json_agg(
        json_build_object(
          'interview_session',
          row_to_json(interview_session),
          'interview_meeting',
          row_to_json(interview_meeting)
        )
      )
    FROM
      interview_session_relation
      left JOIN interview_session on interview_session.id = interview_session_relation.session_id
      left JOIN interview_meeting on interview_meeting.id = interview_session.meeting_id
      left JOIN interview_module on interview_module.id = interview_session.module_id
    where
      interview_session_relation.interview_module_relation_id = interview_module_relation.id
      AND (interview_meeting.status = 'completed' or interview_meeting.status = 'confirmed')
  ) as meetings
from
  interview_module_relation
  left join interview_session_relation on interview_session_relation.interview_module_relation_id=interview_module_relation.id
  left join recruiter_user on interview_module_relation.user_id = recruiter_user.user_id)
select
  module_relation_id,
  pause_json,
  module_training_status,
  user_id,
  module_id,
  training_type,
  first_name,
  position,
  profile_image,
  scheduling_settings,
  phone,
  meetings, 
 (
    SELECT
      COUNT(*)
    FROM
      LATERAL json_array_elements(meetings) AS meeting_elements
    WHERE
       (meeting_elements->'interview_meeting'->>'status') = 'completed'
  ) AS completed_meeting_count,
  (
    SELECT
      COUNT(*)
    FROM
      LATERAL json_array_elements(meetings) AS meeting_elements
    WHERE
      (meeting_elements->'interview_meeting'->>'status') = 'completed' AND training_type='shadow'
  ) AS shadow_meeting_count,
  (
    SELECT
      COUNT(*)
    FROM
      LATERAL json_array_elements(meetings) AS meeting_elements
    WHERE
      (meeting_elements->'interview_meeting'->>'status') = 'completed' AND training_type='reverse_shadow'
  ) AS reverse_shadow_meeting_count
FROM interview_data;
