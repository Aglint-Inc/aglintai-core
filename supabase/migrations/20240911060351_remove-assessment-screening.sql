drop trigger if exists candidate_move_new_to_interview on applications;

drop trigger if exists clone_interview_session on applications;

drop trigger if exists application_disqualification on applications;

drop trigger if exists trigger_delete_interview_schedule on applications;

drop trigger if exists application_status_log on applications;

drop trigger if exists conversion_timestamp_trigger on applications;

drop view if exists job_view;

drop view if exists application_view;

drop view if exists application_status_view;

drop view if exists candidate_applications_view;

drop function if exists getresumematch;

drop function if exists getresumematches;

drop function if exists getsectioncounts;

alter table public_jobs drop column if exists assessment;

alter table public_jobs drop column if exists phone_screen_enabled;

update applications
set status = 'qualified'
where status = 'assessment' or status = 'screening';

alter table applications alter column status type text;

alter table applications alter column status set default 'new';

alter table applications add constraint "applications_status_check" CHECK ((status = ANY (ARRAY['new'::text, 'interview'::text, 'qualified'::text, 'disqualified'::text]))) not valid;

drop type application_status;

create view
  public.candidate_applications_view as
select
  concat(candidates.first_name, ' ', candidates.last_name) as candidate_name,
  candidates.id as candidate_id,
  candidates.email as candidate_email,
  applications.job_id,
  applications.id as application_id,
  applications.status as application_status,
  to_tsvector(
    (candidates.first_name::text || ' '::text) || candidates.last_name::text
  ) as full_text_search,
  public_jobs.job_title as job_role,
  candidates.recruiter_id as company_id
from
  applications
  left join candidates on candidates.id = applications.candidate_id
  left join public_jobs on public_jobs.id = applications.job_id;

create view
  public.application_status_view as
with
  processing_state_cte as (
    select
      applications.id,
      applications.job_id,
      applications.created_at,
      applications.applied_at,
      applications.overall_interview_score as interview_score,
      applications.processing_status,
      applications.bookmarked,
      applications.is_new,
      applications.status,
      applications.score_json -> 'badges'::text as badges,
      applications.candidate_id,
      applications.candidate_file_id,
      candidate_files.file_url,
      case
        when applications.is_resume_fetching = true then 'fetching'::resume_processing_state
        when candidate_files.file_url is null then 'unavailable'::resume_processing_state
        when applications.processing_status = 'not started'::application_processing_status
        or applications.processing_status = 'processing'::application_processing_status then 'processing'::resume_processing_state
        when (applications.score_json -> 'scores'::text) is not null then 'processed'::resume_processing_state
        else 'unparsable'::resume_processing_state
      end as resume_processing_state,
      applications.score_json -> 'scores'::text as scores
    from
      applications
      left join candidate_files on candidate_files.id = applications.candidate_file_id
  ),
  resume_processing_state as (
    select
      processing_state_cte.id,
      processing_state_cte.job_id,
      processing_state_cte.created_at,
      processing_state_cte.applied_at,
      processing_state_cte.interview_score,
      processing_state_cte.processing_status,
      processing_state_cte.bookmarked,
      processing_state_cte.is_new,
      processing_state_cte.status,
      processing_state_cte.badges,
      processing_state_cte.candidate_id,
      processing_state_cte.candidate_file_id,
      processing_state_cte.file_url,
      case
        when processing_state_cte.resume_processing_state = 'fetching'::resume_processing_state then 'fetching'::resume_processing_state
        when processing_state_cte.resume_processing_state = 'unavailable'::resume_processing_state then 'unavailable'::resume_processing_state
        when coalesce(recruiter_preferences.scoring <> true, true) then 'unscorable'::resume_processing_state
        else processing_state_cte.resume_processing_state
      end as resume_processing_state,
      case
        when processing_state_cte.resume_processing_state = 'fetching'::resume_processing_state then '-2'::integer::numeric
        when processing_state_cte.resume_processing_state = 'unparsable'::resume_processing_state then '-3'::integer::numeric
        when processing_state_cte.resume_processing_state = 'unavailable'::resume_processing_state then '-4'::integer::numeric
        when coalesce(recruiter_preferences.scoring <> true, true) then '-5'::integer::numeric
        when processing_state_cte.resume_processing_state = 'processed'::resume_processing_state
        and public_jobs.parameter_weights is not null then (
          select
            score_application (
              processing_state_cte.scores,
              public_jobs.parameter_weights
            ) as score_application
        )
        else '-1'::integer::numeric
      end as resume_score
    from
      processing_state_cte
      left join public_jobs on public_jobs.id = processing_state_cte.job_id
      left join recruiter_preferences on public_jobs.recruiter_id = recruiter_preferences.recruiter_id
  )
select
  resume_processing_state.id,
  resume_processing_state.job_id,
  resume_processing_state.created_at,
  resume_processing_state.applied_at,
  resume_processing_state.interview_score,
  resume_processing_state.processing_status,
  resume_processing_state.bookmarked,
  resume_processing_state.is_new,
  resume_processing_state.status,
  resume_processing_state.badges,
  resume_processing_state.candidate_id,
  resume_processing_state.candidate_file_id,
  resume_processing_state.file_url,
  resume_processing_state.resume_processing_state,
  resume_processing_state.resume_score,
  case
    when resume_processing_state.resume_score >= 80::numeric then 'top_match'::application_match
    when resume_processing_state.resume_score >= 60::numeric
    and resume_processing_state.resume_score < 80::numeric then 'good_match'::application_match
    when resume_processing_state.resume_score >= 40::numeric
    and resume_processing_state.resume_score < 60::numeric then 'average_match'::application_match
    when resume_processing_state.resume_score >= 20::numeric
    and resume_processing_state.resume_score < 40::numeric then 'poor_match'::application_match
    when resume_processing_state.resume_score >= 0::numeric
    and resume_processing_state.resume_score < 20::numeric then 'not_a_match'::application_match
    else 'unknown_match'::application_match
  end as application_match
from
  resume_processing_state;

create view
  public.application_view as
with
  application_candidate_cte as (
    select
      application_status_view.id,
      application_status_view.job_id,
      application_status_view.created_at,
      application_status_view.applied_at,
      application_status_view.interview_score,
      application_status_view.processing_status,
      application_status_view.bookmarked,
      application_status_view.is_new,
      application_status_view.status,
      application_status_view.badges,
      application_status_view.candidate_id,
      application_status_view.candidate_file_id,
      application_status_view.file_url,
      application_status_view.resume_processing_state,
      application_status_view.resume_score,
      application_status_view.application_match,
      candidates.email,
      trim(
        both
        from
          (
            coalesce(candidates.first_name, ''::citext)::text || ' '::text
          ) || coalesce(candidates.last_name, ''::citext)::text
      ) as name,
      candidates.city,
      candidates.linkedin,
      candidates.phone,
      candidates.state,
      candidates.country,
      candidates.current_job_title,
      candidates.timezone
    from
      application_status_view
      left join candidates on candidates.id = application_status_view.candidate_id
  ),
  meetings_cte as (
    select
      interview_meeting.application_id,
      interview_plan.id,
      interview_plan.plan_order,
      interview_plan.name,
      interview_meeting.status,
      interview_session.name as session_name
    from
      interview_session
      join interview_meeting on interview_meeting.id = interview_session.meeting_id
      join interview_plan on interview_plan.id = interview_session.interview_plan_id
  ),
  applications_all_meeting_cte as (
    select
      application_candidate_cte_1.id as application_id,
      coalesce(
        array_agg(meetings_cte.session_name) filter (
          where
            meetings_cte.session_name is not null
        ),
        array[]::text[]
      ) as session_names
    from
      application_candidate_cte application_candidate_cte_1
      left join meetings_cte on meetings_cte.application_id = application_candidate_cte_1.id
    group by
      application_candidate_cte_1.id
  ),
  application_meeting_cte as (
    select
      meetings_cte.application_id,
      meetings_cte.id,
      meetings_cte.plan_order,
      meetings_cte.name,
      json_build_object(
        'not_scheduled',
        count(meetings_cte.status) filter (
          where
            meetings_cte.status = 'not_scheduled'::interview_schedule_status
        ),
        'confirmed',
        count(meetings_cte.status) filter (
          where
            meetings_cte.status = 'confirmed'::interview_schedule_status
        ),
        'completed',
        count(meetings_cte.status) filter (
          where
            meetings_cte.status = 'completed'::interview_schedule_status
        ),
        'waiting',
        count(meetings_cte.status) filter (
          where
            meetings_cte.status = 'waiting'::interview_schedule_status
        ),
        'cancelled',
        count(meetings_cte.status) filter (
          where
            meetings_cte.status = 'cancelled'::interview_schedule_status
        ),
        'reschedule',
        count(meetings_cte.status) filter (
          where
            meetings_cte.status = 'reschedule'::interview_schedule_status
        )
      ) as status
    from
      meetings_cte
    group by
      meetings_cte.application_id,
      meetings_cte.id,
      meetings_cte.plan_order,
      meetings_cte.name
  ),
  application_plan_cte as (
    select
      application_meeting_cte.application_id as id,
      array_agg(
        json_build_object(
          'id',
          application_meeting_cte.id,
          'plan_order',
          application_meeting_cte.plan_order,
          'name',
          application_meeting_cte.name,
          'status',
          application_meeting_cte.status
        )
        order by
          application_meeting_cte.plan_order
      ) as interview_plans
    from
      application_meeting_cte
    group by
      application_meeting_cte.application_id
  ),
  application_task_cte as (
    select
      application_candidate_cte_1.id,
      coalesce(count(new_tasks.application_id), 0::bigint) as task_count
    from
      application_candidate_cte application_candidate_cte_1
      left join new_tasks on new_tasks.application_id = application_candidate_cte_1.id
    group by
      application_candidate_cte_1.id
  ),
  application_logs_cte as (
    select
      application_candidate_cte_1.id,
      coalesce(count(application_logs.application_id), 0::bigint) as activity_count
    from
      application_candidate_cte application_candidate_cte_1
      left join application_logs on application_logs.application_id = application_candidate_cte_1.id
    group by
      application_candidate_cte_1.id
  ),
  application_latest_activity_cte as (
    select distinct
      on (application_logs.application_id) application_logs.application_id,
      application_logs.created_at as latest_activity
    from
      application_logs
    order by
      application_logs.application_id,
      application_logs.created_at desc
  )
select
  application_candidate_cte.id,
  application_candidate_cte.job_id,
  application_candidate_cte.created_at,
  application_candidate_cte.applied_at,
  application_candidate_cte.resume_score,
  application_candidate_cte.interview_score,
  application_candidate_cte.processing_status,
  application_candidate_cte.bookmarked,
  application_candidate_cte.is_new,
  application_candidate_cte.status,
  application_candidate_cte.badges,
  application_candidate_cte.candidate_file_id,
  application_candidate_cte.email,
  application_candidate_cte.name,
  application_candidate_cte.city,
  application_candidate_cte.linkedin,
  application_candidate_cte.phone,
  application_candidate_cte.state,
  application_candidate_cte.country,
  application_candidate_cte.current_job_title,
  application_candidate_cte.file_url,
  application_candidate_cte.resume_processing_state,
  application_task_cte.task_count,
  application_logs_cte.activity_count,
  application_latest_activity_cte.latest_activity,
  application_candidate_cte.application_match,
  application_candidate_cte.candidate_id,
  application_candidate_cte.timezone,
  applications_all_meeting_cte.session_names,
  coalesce(
    application_plan_cte.interview_plans,
    array[]::json[]
  ) as interview_plans
from
  application_candidate_cte
  left join application_plan_cte on application_plan_cte.id = application_candidate_cte.id
  left join application_task_cte on application_task_cte.id = application_candidate_cte.id
  left join application_logs_cte on application_logs_cte.id = application_candidate_cte.id
  left join application_latest_activity_cte on application_latest_activity_cte.application_id = application_candidate_cte.id
  left join applications_all_meeting_cte on applications_all_meeting_cte.application_id = application_candidate_cte.id;

create view
  public.job_view as
with
  application_status_view_cte as (
    select
      application_status_view.status,
      application_status_view.job_id,
      application_status_view.resume_processing_state,
      application_status_view.application_match
    from
      application_status_view
  ),
  job_cte as (
    select
      public_jobs.created_at,
      public_jobs.department_id,
      departments.name as department,
      public_jobs.description,
      public_jobs.draft,
      public_jobs.id,
      public_jobs.jd_json,
      public_jobs.job_title,
      public_jobs.job_type,
      public_jobs.location_id,
      row_to_json(office_locations.*) as location,
      public_jobs.parameter_weights,
      public_jobs.posted_by,
      public_jobs.recruiter_id,
      public_jobs.scoring_criteria_loading,
      public_jobs.status,
      public_jobs.workplace_type,
      public_jobs.hiring_manager,
      public_jobs.recruiter,
      public_jobs.recruiting_coordinator,
      public_jobs.sourcer,
      public_jobs.interview_coordinator,
      public_jobs.interview_plan_warning_ignore,
      public_jobs.interview_session_warning_ignore,
      public_jobs.remote_sync_time,
      public_jobs.is_pinned
    from
      public_jobs
      left join departments on departments.id = public_jobs.department_id
      left join office_locations on office_locations.id = public_jobs.location_id
  ),
  status_count_default_cte as (
    select
      job_cte_1.id,
      defaults.status
    from
      (
        select
          'new' as status
        union
        select
          'interview' as status
        union
        select
          'qualified' as status
        union
        select
          'disqualified' as status
      ) defaults
      cross join job_cte job_cte_1
  ),
  status_count_cte as (
    select
      status_count_default_cte.id,
      status_count_default_cte.status,
      coalesce(
        count(application_status_view_cte.status),
        0::bigint
      ) as count
    from
      status_count_default_cte
      left join application_status_view_cte on status_count_default_cte.id = application_status_view_cte.job_id
      and status_count_default_cte.status = application_status_view_cte.status
    group by
      status_count_default_cte.id,
      status_count_default_cte.status
  ),
  job_section_count_cte as (
    select
      status_count_cte.id,
      json_object_agg(status_count_cte.status, status_count_cte.count) as section_count
    from
      status_count_cte
    group by
      status_count_cte.id
  ),
  application_match_default_cte as (
    select
      job_cte_1.id,
      defaults.application_match
    from
      (
        select
          'top_match'::application_match as application_match
        union
        select
          'good_match'::application_match as application_match
        union
        select
          'average_match'::application_match as application_match
        union
        select
          'poor_match'::application_match as application_match
        union
        select
          'not_a_match'::application_match as application_match
        union
        select
          'unknown_match'::application_match as application_match
      ) defaults
      cross join job_cte job_cte_1
  ),
  application_match_cte as (
    select
      application_match_default_cte.id,
      application_match_default_cte.application_match,
      coalesce(
        count(application_status_view_cte.application_match),
        0::bigint
      ) as count
    from
      application_match_default_cte
      left join application_status_view_cte on application_match_default_cte.id = application_status_view_cte.job_id
      and application_match_default_cte.application_match = application_status_view_cte.application_match
    group by
      application_match_default_cte.id,
      application_match_default_cte.application_match
  ),
  job_application_match_cte as (
    select
      application_match_cte.id,
      json_object_agg(
        application_match_cte.application_match,
        application_match_cte.count
      ) as application_match
    from
      application_match_cte
    group by
      application_match_cte.id
  ),
  processing_count_default_cte as (
    select
      job_cte_1.id,
      defaults.resume_processing_state
    from
      (
        select
          'fetching'::resume_processing_state as resume_processing_state
        union
        select
          'unavailable'::resume_processing_state as resume_processing_state
        union
        select
          'processing'::resume_processing_state as resume_processing_state
        union
        select
          'processed'::resume_processing_state as resume_processing_state
        union
        select
          'unparsable'::resume_processing_state as resume_processing_state
        union
        select
          'unscorable'::resume_processing_state as resume_processing_state
      ) defaults
      cross join job_cte job_cte_1
  ),
  processing_count_cte as (
    select
      processing_count_default_cte.id,
      processing_count_default_cte.resume_processing_state,
      coalesce(
        count(
          application_status_view_cte.resume_processing_state
        ),
        0::bigint
      ) as count
    from
      processing_count_default_cte
      left join application_status_view_cte on processing_count_default_cte.id = application_status_view_cte.job_id
      and processing_count_default_cte.resume_processing_state = application_status_view_cte.resume_processing_state
    group by
      processing_count_default_cte.id,
      processing_count_default_cte.resume_processing_state
  ),
  job_processing_count_cte as (
    select
      processing_count_cte.id,
      json_object_agg(
        processing_count_cte.resume_processing_state,
        processing_count_cte.count
      ) as processing_count
    from
      processing_count_cte
    group by
      processing_count_cte.id
  )
select
  job_cte.created_at,
  job_cte.department_id,
  job_cte.department,
  job_cte.description,
  job_cte.draft,
  job_cte.id,
  job_cte.jd_json,
  job_cte.job_title,
  job_cte.job_type,
  job_cte.location_id,
  job_cte.location,
  job_cte.parameter_weights,
  job_cte.posted_by,
  job_cte.recruiter_id,
  job_cte.scoring_criteria_loading,
  job_cte.status,
  job_cte.workplace_type,
  job_cte.hiring_manager,
  job_cte.recruiter,
  job_cte.recruiting_coordinator,
  job_cte.sourcer,
  job_cte.interview_coordinator,
  job_cte.interview_plan_warning_ignore,
  job_cte.interview_session_warning_ignore,
  job_cte.remote_sync_time,
  job_section_count_cte.section_count,
  job_processing_count_cte.processing_count,
  job_application_match_cte.application_match,
  job_cte.is_pinned
from
  job_cte
  left join job_section_count_cte on job_section_count_cte.id = job_cte.id
  left join job_processing_count_cte on job_processing_count_cte.id = job_cte.id
  left join job_application_match_cte on job_application_match_cte.id = job_cte.id;

CREATE TRIGGER candidate_move_new_to_interview AFTER UPDATE OF status ON public.applications FOR EACH ROW WHEN (((old.status = 'new') AND (new.status = 'interview'))) EXECUTE FUNCTION trigger_candidate_portal();

CREATE TRIGGER clone_interview_session AFTER UPDATE OF status ON public.applications FOR EACH ROW WHEN ((new.status = 'interview')) EXECUTE FUNCTION trigger_clone_interview_session();

CREATE TRIGGER application_disqualification AFTER UPDATE OF status ON public.applications FOR EACH ROW WHEN ((new.status = 'disqualified')) EXECUTE FUNCTION trigger_application_disqualification();

CREATE TRIGGER trigger_delete_interview_schedule AFTER UPDATE OF status ON public.applications FOR EACH ROW WHEN (OLD.status = 'disqualified' AND NEW.status = 'new') EXECUTE FUNCTION delete_interview_schedule_on_status_update();

CREATE TRIGGER application_status_log AFTER UPDATE OF status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_application_status_log();

CREATE TRIGGER conversion_timestamp_trigger AFTER UPDATE OF status ON public.applications FOR EACH ROW EXECUTE FUNCTION trigger_conversion_timestamp();