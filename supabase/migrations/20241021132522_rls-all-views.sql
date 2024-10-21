create or replace view
  public.all_interviewers with (security_invoker=true) as
select
  ru.user_id,
  ru.first_name,
  ru.last_name,
  ru.email,
  ru.profile_image,
  ru."position",
  ru.schedule_auth,
  ru.scheduling_settings,
  ru.status,
  ru.department_id,
  ru.office_location_id,
  recrel.recruiter_id,
  coalesce(
    array_agg(
      distinct case
        when intmodrel.training_status = 'qualified'::status_training then intmod.name
        else null::text
      end
    ),
    '{}'::text[]
  ) as qualified_module_names,
  coalesce(
    array_agg(
      distinct case
        when intmodrel.training_status = 'training'::status_training then intmod.name
        else null::text
      end
    ),
    '{}'::text[]
  ) as training_module_names,
  (
    (
      select
        count(*) as count
      from
        interview_session_relation intsesrel
        join interview_session intses on intses.id = intsesrel.session_id
        join interview_meeting intm on intm.id = intses.meeting_id
        join interview_module_relation intmodrel_1 on intmodrel_1.id = intsesrel.interview_module_relation_id
      where
        intmodrel_1.user_id = ru.user_id
        and intm.status = 'confirmed'::interview_schedule_status
        and intsesrel.is_confirmed = true
    )
  )::integer as upcoming_meeting_count,
  (
    (
      select
        count(*) as count
      from
        interview_session_relation intsesrel
        join interview_session intses on intses.id = intsesrel.session_id
        join interview_meeting intm on intm.id = intses.meeting_id
        join interview_module_relation intmodrel_1 on intmodrel_1.id = intsesrel.interview_module_relation_id
      where
        intmodrel_1.user_id = ru.user_id
        and intm.status = 'completed'::interview_schedule_status
        and intsesrel.is_confirmed = true
    )
  )::integer as completed_meeting_count,
  (
    select
      coalesce(sum(intses.session_duration), 0::numeric) / 60.0
    from
      interview_session_relation intsesrel
      join interview_session intses on intses.id = intsesrel.session_id
      join interview_meeting intm on intm.id = intses.meeting_id
      join interview_module_relation intmodrel_1 on intmodrel_1.id = intsesrel.interview_module_relation_id
    where
      intmodrel_1.user_id = ru.user_id
      and (
        intm.status = 'completed'::interview_schedule_status
        or intm.status = 'confirmed'::interview_schedule_status
      )
      and intsesrel.is_confirmed = true
      and intm.start_time >= date_trunc(
        'week'::text,
        current_date::timestamp with time zone
      )
      and intm.start_time < (
        date_trunc(
          'week'::text,
          current_date::timestamp with time zone
        ) + '7 days'::interval
      )
  ) as total_hours_this_week,
  (
    select
      count(*) as count
    from
      interview_session_relation intsesrel
      join interview_session intses on intses.id = intsesrel.session_id
      join interview_meeting intm on intm.id = intses.meeting_id
      join interview_module_relation intmodrel_1 on intmodrel_1.id = intsesrel.interview_module_relation_id
    where
      intmodrel_1.user_id = ru.user_id
      and (
        intm.status = 'completed'::interview_schedule_status
        or intm.status = 'confirmed'::interview_schedule_status
      )
      and intsesrel.is_confirmed = true
      and intm.start_time >= date_trunc(
        'week'::text,
        current_date::timestamp with time zone
      )
      and intm.start_time < (
        date_trunc(
          'week'::text,
          current_date::timestamp with time zone
        ) + '7 days'::interval
      )
  ) as total_interviews_this_week,
  (
    select
      coalesce(sum(intses.session_duration), 0::numeric) / 60.0
    from
      interview_session_relation intsesrel
      join interview_session intses on intses.id = intsesrel.session_id
      join interview_meeting intm on intm.id = intses.meeting_id
      join interview_module_relation intmodrel_1 on intmodrel_1.id = intsesrel.interview_module_relation_id
    where
      intmodrel_1.user_id = ru.user_id
      and (
        intm.status = 'completed'::interview_schedule_status
        or intm.status = 'confirmed'::interview_schedule_status
      )
      and intsesrel.is_confirmed = true
      and intm.start_time >= current_date
      and intm.start_time < (current_date + '1 day'::interval)
  ) as total_hours_today,
  (
    select
      count(*) as count
    from
      interview_session_relation intsesrel
      join interview_session intses on intses.id = intsesrel.session_id
      join interview_meeting intm on intm.id = intses.meeting_id
      join interview_module_relation intmodrel_1 on intmodrel_1.id = intsesrel.interview_module_relation_id
    where
      intmodrel_1.user_id = ru.user_id
      and (
        intm.status = 'completed'::interview_schedule_status
        or intm.status = 'confirmed'::interview_schedule_status
      )
      and intsesrel.is_confirmed = true
      and intm.start_time >= current_date
      and intm.start_time < (current_date + '1 day'::interval)
  ) as total_interviews_today,
  ru.is_calendar_connected,
  (
    select
      jsonb_object_agg(daily_counts.day, daily_counts.meeting_count) as jsonb_object_agg
    from
      (
        select
          date_trunc('day'::text, intm.start_time) as day,
          count(*) as meeting_count
        from
          interview_session_relation intsesrel
          join interview_session intses on intses.id = intsesrel.session_id
          join interview_meeting intm on intm.id = intses.meeting_id
          join interview_module_relation intmodrel_1 on intmodrel_1.id = intsesrel.interview_module_relation_id
        where
          intmodrel_1.user_id = ru.user_id
          and intm.status = 'completed'::interview_schedule_status
          and intsesrel.is_confirmed = true
          and intm.start_time >= (current_date - '1 mon'::interval)
        group by
          (date_trunc('day'::text, intm.start_time))
      ) daily_counts
  ) as completed_meeting_last_month,
  (
    select
      coalesce(
        array_agg(distinct interview_plan.job_id),
        array[]::uuid[]
      ) as "coalesce"
    from
      interview_session_relation
      left join interview_module_relation on interview_session_relation.interview_module_relation_id = interview_module_relation.id
      left join recruiter_user on interview_module_relation.user_id = recruiter_user.user_id
      left join recruiter_user debrief_user on interview_session_relation.user_id = recruiter_user.user_id
      left join interview_session on interview_session.id = interview_session_relation.session_id
      left join interview_plan on interview_plan.id = interview_session.interview_plan_id
    where
      interview_plan.job_id is not null
      and (
        ru.user_id = recruiter_user.user_id
        or ru.user_id = debrief_user.user_id
      )
  ) as job_ids
from
  recruiter_user ru
  left join recruiter_relation recrel on recrel.user_id = ru.user_id
  left join interview_module_relation intmodrel on intmodrel.user_id = ru.user_id
  left join interview_module intmod on intmod.id = intmodrel.module_id
group by
  ru.user_id,
  recrel.recruiter_id;


create or replace view
  public.application_status_view with (security_invoker=true) as
with
  processing_state_cte as (
    select
      applications.id,
      applications.job_id,
      applications.recruiter_id,
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
      processing_state_cte.recruiter_id,
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
  end as application_match,
  resume_processing_state.recruiter_id
from
  resume_processing_state;


create or replace view
  public.application_view with (security_invoker=true) as
with
  application_candidate_cte as (
    select
      application_status_view.id,
      application_status_view.job_id,
      application_status_view.recruiter_id,
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
  ) as interview_plans,
  application_candidate_cte.recruiter_id
from
  application_candidate_cte
  left join application_plan_cte on application_plan_cte.id = application_candidate_cte.id
  left join application_task_cte on application_task_cte.id = application_candidate_cte.id
  left join application_logs_cte on application_logs_cte.id = application_candidate_cte.id
  left join application_latest_activity_cte on application_latest_activity_cte.application_id = application_candidate_cte.id
  left join applications_all_meeting_cte on applications_all_meeting_cte.application_id = application_candidate_cte.id;


create or replace view
  public.candidate_applications_view with (security_invoker=true) as
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

create or replace view
  public.interview_types_view with (security_invoker=true) as
select
  intmod.id,
  intmod.name,
  intmod.department_id,
  intmod.created_by,
  intmod.is_archived,
  intmod.description,
  intmod.recruiter_id,
  departments.name as department_name,
  coalesce(
    (
      select
        jsonb_agg(
          jsonb_build_object(
            'user_id',
            ru.user_id,
            'first_name',
            ru.first_name,
            'last_name',
            ru.last_name,
            'email',
            ru.email,
            'profile_image',
            ru.profile_image,
            'position',
            ru."position"
          )
        ) as jsonb_agg
      from
        recruiter_user ru
      where
        (
          ru.user_id in (
            select
              intmodrel.user_id
            from
              interview_module_relation intmodrel
            where
              intmodrel.module_id = intmod.id
              and intmodrel.is_archived = false
          )
        )
    ),
    '[]'::jsonb
  ) as users,
  (
    (
      select
        count(*) as count
      from
        interview_meeting intm
        join interview_session inses on inses.meeting_id = intm.id
      where
        intm.status = 'confirmed'::interview_schedule_status
        and inses.module_id = intmod.id
    )
  )::integer as upcoming_meeting_count,
  (
    (
      select
        count(*) as count
      from
        interview_meeting intm
        join interview_session inses on inses.meeting_id = intm.id
      where
        intm.status = 'completed'::interview_schedule_status
        and inses.module_id = intmod.id
    )
  )::integer as completed_meeting_count,
  (
    (
      select
        count(*) as count
      from
        interview_meeting intm
        join interview_session inses on inses.meeting_id = intm.id
      where
        intm.status = 'cancelled'::interview_schedule_status
        and inses.module_id = intmod.id
    )
  )::integer as canceled_meeting_count,
  (
    (
      select
        count(*) as count
      from
        interview_meeting intm
        join interview_session inses on inses.meeting_id = intm.id
      where
        intm.status = 'confirmed'::interview_schedule_status
        and inses.module_id = intmod.id
        and intm.start_time >= date_trunc(
          'month'::text,
          current_date::timestamp with time zone
        )
        and intm.start_time < (
          date_trunc(
            'month'::text,
            current_date::timestamp with time zone
          ) + '1 mon'::interval
        )
    )
  )::integer as this_month_confirmed_meeting_count,
  (
    (
      select
        count(*) as count
      from
        interview_meeting intm
        join interview_session inses on inses.meeting_id = intm.id
      where
        intm.status = 'completed'::interview_schedule_status
        and inses.module_id = intmod.id
        and intm.start_time >= date_trunc(
          'month'::text,
          current_date::timestamp with time zone
        )
        and intm.start_time < (
          date_trunc(
            'month'::text,
            current_date::timestamp with time zone
          ) + '1 mon'::interval
        )
    )
  )::integer as this_month_completed_meeting_count,
  (
    (
      select
        count(*) as count
      from
        interview_meeting intm
        join interview_session inses on inses.meeting_id = intm.id
      where
        intm.status = 'cancelled'::interview_schedule_status
        and inses.module_id = intmod.id
        and intm.start_time >= date_trunc(
          'month'::text,
          current_date::timestamp with time zone
        )
        and intm.start_time < (
          date_trunc(
            'month'::text,
            current_date::timestamp with time zone
          ) + '1 mon'::interval
        )
    )
  )::integer as this_month_cancelled_meeting_count,
  (
    select
      coalesce(
        avg(
          extract(
            epoch
            from
              intm.end_time - intm.start_time
          ) / 60::numeric
        )::integer,
        0
      ) as avg_duration_minutes
    from
      interview_meeting intm
      join interview_session inses on inses.meeting_id = intm.id
    where
      intm.status = 'completed'::interview_schedule_status
      and inses.module_id = intmod.id
      and intm.start_time >= date_trunc(
        'month'::text,
        current_date::timestamp with time zone
      )
      and intm.start_time < (
        date_trunc(
          'month'::text,
          current_date::timestamp with time zone
        ) + '1 mon'::interval
      )
  ) as avg_meeting_duration,
  (
    select
      coalesce(
        array_agg(distinct public_jobs.job_title),
        array[]::text[]
      ) as "coalesce"
    from
      interview_meeting
      left join interview_session on interview_session.meeting_id = interview_meeting.id
      left join applications on applications.id = interview_meeting.application_id
      left join public_jobs on public_jobs.id = applications.job_id
    where
      interview_session.module_id = intmod.id
      and public_jobs.status = 'published'::public_job_status
  ) as job_names
from
  interview_module intmod
  left join departments on departments.id = intmod.department_id
order by
  intmod.created_at desc;

create or replace view
  public.job_view with (security_invoker=true) as
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
      public_jobs.remote_sync_time,
      public_jobs.is_pinned,
      public_jobs.draft_jd_json,
      case
        when public_jobs.posted_by = 'Ashby'::text
        and integrations.ashby_key is not null then true
        when public_jobs.posted_by = 'Lever'::text
        and integrations.lever_key is not null then true
        when public_jobs.posted_by = 'Greenhouse'::text
        and integrations.greenhouse_key is not null then true
        else false
      end as syncable
    from
      public_jobs
      left join departments on departments.id = public_jobs.department_id
      left join office_locations on office_locations.id = public_jobs.location_id
      left join integrations on integrations.recruiter_id = public_jobs.recruiter_id
  ),
  status_count_default_cte as (
    select
      job_cte_1.id,
      defaults.status
    from
      (
        select
          'new'::text as status
        union
        select
          'interview'::text as status
        union
        select
          'qualified'::text as status
        union
        select
          'disqualified'::text as status
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
  ),
  job_interview_plan_cte as (
    select
      job_cte_1.id,
      coalesce(count(interview_plan.id), 0::bigint) as interview_plan_count
    from
      job_cte job_cte_1
      left join interview_plan on interview_plan.job_id = job_cte_1.id
    group by
      job_cte_1.id
  )
select
  job_cte.created_at,
  job_cte.department_id,
  job_cte.department,
  job_cte.description,
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
  job_cte.remote_sync_time,
  job_cte.is_pinned,
  job_cte.syncable,
  job_cte.draft_jd_json,
  job_section_count_cte.section_count,
  job_processing_count_cte.processing_count,
  job_application_match_cte.application_match,
  job_interview_plan_cte.interview_plan_count
from
  job_cte
  left join job_section_count_cte on job_section_count_cte.id = job_cte.id
  left join job_processing_count_cte on job_processing_count_cte.id = job_cte.id
  left join job_application_match_cte on job_application_match_cte.id = job_cte.id
  left join job_interview_plan_cte on job_interview_plan_cte.id = job_cte.id;

create or replace view
  public.meeting_details with (security_invoker=true) as
select
  interview_meeting.id,
  interview_meeting.created_at,
  interview_meeting.meeting_json,
  interview_meeting.status,
  interview_meeting.instructions,
  interview_meeting.meeting_link,
  interview_meeting.confirmed_date,
  interview_meeting.start_time,
  interview_meeting.end_time,
  interview_meeting.cal_event_id,
  interview_meeting.candidate_feedback,
  interview_meeting.organizer_id,
  interview_session.id as session_id,
  interview_session.name as session_name,
  interview_session.break_duration,
  interview_session.session_order,
  interview_session.session_duration,
  interview_session.session_type,
  interview_session.schedule_type,
  interview_meeting.application_id,
  interview_meeting.meeting_flow,
  applications.job_id,
  public_jobs.recruiter_id,
  interview_session.module_id,
  (
    select
      array_agg(
        case
          when interview_session.session_type = 'debrief'::session_type then debrief_user.user_id
          else recruiter_user.user_id
        end
      ) as array_agg
    from
      interview_session_relation
      left join interview_module_relation on interview_session_relation.interview_module_relation_id = interview_module_relation.id
      left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
      left join recruiter_user debrief_user on debrief_user.user_id = interview_session_relation.user_id
    where
      interview_session_relation.session_id = interview_session.id
      and interview_session_relation.is_confirmed = true
  ) as confirmed_user_ids,
  (
    select
      array_agg(interview_module_relation.id) as array_agg
    from
      interview_session_relation
      left join interview_module_relation on interview_session_relation.interview_module_relation_id = interview_module_relation.id
    where
      interview_session_relation.session_id = interview_session.id
      and interview_session_relation.is_confirmed = true
  ) as confirmed_module_relation_ids,
  interview_session.parent_session_id,
  interview_meeting.schedule_request_id,
  interview_meeting.confirmed_candidate_tz
from
  interview_meeting
  left join interview_session on interview_meeting.id = interview_session.meeting_id
  left join applications on applications.id = interview_meeting.application_id
  left join public_jobs on applications.job_id = public_jobs.id;

create or replace view
  public.meeting_interviewers with (security_invoker=true) as
with
  interview_data as (
    select
      interview_session_relation.id as session_relation_id,
      interview_session_relation.interviewer_type,
      interview_session_relation.training_type,
      interview_session_relation.is_confirmed,
      interview_session.meeting_id,
      interview_session.id as session_id,
      interview_session.session_type,
      interview_meeting.end_time,
      interview_meeting.start_time,
      interview_meeting.status,
      interview_session.session_duration,
      coalesce(
        debrief_user.first_name,
        recruiter_user.first_name
      ) as first_name,
      coalesce(debrief_user.last_name, recruiter_user.last_name) as last_name,
      coalesce(
        debrief_user.profile_image,
        recruiter_user.profile_image
      ) as profile_image,
      coalesce(debrief_user.email, recruiter_user.email) as email,
      coalesce(debrief_user.user_id, recruiter_user.user_id) as user_id,
      coalesce(
        (
          debrief_user.scheduling_settings -> 'timeZone'::text
        ) ->> 'tzCode'::text,
        (
          recruiter_user.scheduling_settings -> 'timeZone'::text
        ) ->> 'tzCode'::text
      ) as tz_code,
      coalesce(
        debrief_user."position",
        recruiter_user."position"
      ) as "position",
      interview_session_relation.accepted_status,
      (
        select
          json_agg(row_to_json(interview_session_cancel.*)) as json_agg
        from
          interview_session_cancel
        where
          interview_session_cancel.session_relation_id = interview_session_relation.id
      ) as cancel_reasons,
      interview_session_relation.interview_module_relation_id,
      interview_module_relation.module_id,
      case
        when interview_session.interview_plan_id is not null then interview_plan.job_id
        else applications.job_id
      end as job_id,
      coalesce(
        debrief_user.schedule_auth,
        recruiter_user.schedule_auth
      ) as schedule_auth,
      coalesce(
        debrief_user.scheduling_settings,
        recruiter_user.scheduling_settings
      ) as scheduling_settings
    from
      interview_session_relation
      left join interview_module_relation on interview_session_relation.interview_module_relation_id = interview_module_relation.id
      left join interview_session on interview_session.id = interview_session_relation.session_id
      left join interview_meeting on interview_meeting.id = interview_session.meeting_id
      left join interview_plan on interview_plan.id = interview_session.interview_plan_id
      left join applications on applications.id = interview_meeting.application_id
      left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
      left join recruiter_user debrief_user on debrief_user.user_id = interview_session_relation.user_id
  ),
  time_boundaries as (
    select
      current_date as today_start,
      current_date + '1 day'::interval - '00:00:01'::interval as today_end,
      date_trunc(
        'week'::text,
        current_date::timestamp with time zone
      ) + '1 day'::interval as week_start,
      date_trunc(
        'week'::text,
        current_date::timestamp with time zone
      ) + '7 days'::interval - '00:00:01'::interval as week_end
  )
select
  interview_data.session_relation_id,
  interview_data.interviewer_type,
  interview_data.training_type,
  interview_data.is_confirmed,
  interview_data.meeting_id,
  interview_data.session_id,
  interview_data.session_type,
  interview_data.first_name,
  interview_data.last_name,
  interview_data.profile_image,
  interview_data.email,
  interview_data.user_id,
  interview_data.tz_code,
  interview_data."position",
  (
    select
      count(*) as count
    from
      interview_data id2,
      time_boundaries tb
    where
      id2.user_id = interview_data.user_id
      and id2.end_time >= tb.today_start
      and id2.end_time <= tb.today_end
      and id2.is_confirmed = true
      and (
        id2.status = 'confirmed'::interview_schedule_status
        or id2.status = 'completed'::interview_schedule_status
      )
  ) as totalinterviewstoday,
  (
    select
      count(*) as count
    from
      interview_data id3,
      time_boundaries tb
    where
      id3.user_id = interview_data.user_id
      and id3.start_time >= tb.week_start
      and id3.end_time <= tb.week_end
      and id3.is_confirmed = true
      and (
        id3.status = 'confirmed'::interview_schedule_status
        or id3.status = 'completed'::interview_schedule_status
      )
  ) as totalinterviewsthisweek,
  (
    select
      coalesce(sum(id4.session_duration), 0::numeric) / 60.0
    from
      interview_data id4,
      time_boundaries tb
    where
      id4.user_id = interview_data.user_id
      and id4.end_time >= tb.today_start
      and id4.end_time <= tb.today_end
      and id4.is_confirmed = true
      and (
        id4.status = 'confirmed'::interview_schedule_status
        or id4.status = 'completed'::interview_schedule_status
      )
  ) as totalhourstoday,
  (
    select
      coalesce(sum(id5.session_duration), 0::numeric) / 60.0
    from
      interview_data id5,
      time_boundaries tb
    where
      id5.user_id = interview_data.user_id
      and id5.start_time >= tb.week_start
      and id5.end_time <= tb.week_end
      and id5.is_confirmed = true
      and (
        id5.status = 'confirmed'::interview_schedule_status
        or id5.status = 'completed'::interview_schedule_status
      )
  ) as totalhoursthisweek,
  interview_data.accepted_status,
  interview_data.cancel_reasons,
  interview_data.interview_module_relation_id,
  interview_data.module_id,
  interview_data.job_id,
  interview_data.schedule_auth,
  interview_data.scheduling_settings
from
  interview_data;


create or replace view 
  public.module_relations_view with (security_invoker=true) as
with
  interview_data as (
    select
      interview_module_relation.id,
      interview_module_relation.pause_json,
      interview_module_relation.training_status as module_training_status,
      interview_module_relation.user_id,
      interview_module_relation.module_id,
      interview_module_relation.number_of_shadow,
      interview_module_relation.number_of_reverse_shadow,
      interview_module_relation.is_archived,
      recruiter_user.first_name,
      recruiter_user."position",
      recruiter_user.profile_image,
      recruiter_user.scheduling_settings,
      recruiter_user.phone,
      interview_module.name as module_name,
      interview_module.description as module_description,
      (
        select
          json_agg(
            json_build_object(
              'interview_session',
              row_to_json(interview_session.*),
              'interview_meeting',
              row_to_json(interview_meeting.*),
              'interview_session_relation',
              row_to_json(interview_session_relation.*)
            )
          ) as json_agg
        from
          interview_session_relation
          left join interview_session on interview_session.id = interview_session_relation.session_id
          left join interview_meeting on interview_meeting.id = interview_session.meeting_id
          left join interview_module interview_module_1 on interview_module_1.id = interview_session.module_id
        where
          interview_session_relation.interview_module_relation_id = interview_module_relation.id
          and (
            interview_meeting.status = 'completed'::interview_schedule_status
            or interview_meeting.status = 'confirmed'::interview_schedule_status
          )
          and interview_session_relation.is_confirmed = true
      ) as meetings
    from
      interview_module_relation
      left join interview_module on interview_module.id = interview_module_relation.module_id
      left join recruiter_user on interview_module_relation.user_id = recruiter_user.user_id
  )
select
  interview_data.id,
  interview_data.pause_json,
  interview_data.module_training_status,
  interview_data.user_id,
  interview_data.module_id,
  interview_data.number_of_shadow,
  interview_data.number_of_reverse_shadow,
  interview_data.first_name,
  interview_data."position",
  interview_data.profile_image,
  interview_data.scheduling_settings,
  interview_data.phone,
  interview_data.meetings,
  interview_data.module_name,
  interview_data.module_description,
  interview_data.is_archived,
  (
    select
      count(*) as count
    from
      lateral json_array_elements(interview_data.meetings) meeting_elements (value)
    where
      (
        (
          meeting_elements.value -> 'interview_meeting'::text
        ) ->> 'status'::text
      ) = 'completed'::text
  ) as completed_meeting_count,
  (
    select
      count(*) as count
    from
      lateral json_array_elements(interview_data.meetings) meeting_elements (value)
    where
      (
        (
          meeting_elements.value -> 'interview_meeting'::text
        ) ->> 'status'::text
      ) = 'completed'::text
  ) as cancelled_meeting_count,
  (
    select
      count(*) as count
    from
      lateral json_array_elements(interview_data.meetings) meeting_elements (value)
    where
      (
        (
          meeting_elements.value -> 'interview_meeting'::text
        ) ->> 'status'::text
      ) = 'completed'::text
  ) as confirmed_meeting_count,
  (
    select
      count(*) as count
    from
      lateral json_array_elements(interview_data.meetings) meeting_elements (value)
    where
      (
        (
          meeting_elements.value -> 'interview_meeting'::text
        ) ->> 'status'::text
      ) = 'completed'::text
      and (
        (
          meeting_elements.value -> 'interview_session_relation'::text
        ) ->> 'training_type'::text
      ) = 'shadow'::text
  ) as shadow_completed_count,
  (
    select
      count(*) as count
    from
      lateral json_array_elements(interview_data.meetings) meeting_elements (value)
    where
      (
        (
          meeting_elements.value -> 'interview_meeting'::text
        ) ->> 'status'::text
      ) = 'completed'::text
      and (
        (
          meeting_elements.value -> 'interview_session_relation'::text
        ) ->> 'training_type'::text
      ) = 'reverse_shadow'::text
  ) as reverse_shadow_completed_count,
  (
    select
      count(*) as count
    from
      lateral json_array_elements(interview_data.meetings) meeting_elements (value)
    where
      (
        (
          meeting_elements.value -> 'interview_meeting'::text
        ) ->> 'status'::text
      ) = 'confirmed'::text
      and (
        (
          meeting_elements.value -> 'interview_session_relation'::text
        ) ->> 'training_type'::text
      ) = 'reverse_shadow'::text
  ) as reverse_shadow_confirmed_count,
  (
    select
      count(*) as count
    from
      lateral json_array_elements(interview_data.meetings) meeting_elements (value)
    where
      (
        (
          meeting_elements.value -> 'interview_meeting'::text
        ) ->> 'status'::text
      ) = 'confirmed'::text
      and (
        (
          meeting_elements.value -> 'interview_session_relation'::text
        ) ->> 'training_type'::text
      ) = 'shadow'::text
  ) as shadow_confirmed_count,
  (
    select
      sum(
        (
          (
            meeting_elements.value -> 'interview_session'::text
          ) ->> 'session_duration'::text
        )::numeric
      ) as sum
    from
      lateral json_array_elements(interview_data.meetings) meeting_elements (value)
    where
      (
        (
          meeting_elements.value -> 'interview_meeting'::text
        ) ->> 'status'::text
      ) = 'completed'::text
  ) as completed_meeting_duration
from
  interview_data;


create or replace view
  public.tasks_view with (security_invoker=true) as
with
  interview_session_cte as (
    select
      interview_session.id,
      interview_session.session_type,
      interview_session.name,
      interview_session.session_order,
      case
        when interview_meeting.id is not null then json_build_object(
          'id',
          interview_meeting.id,
          'start_time',
          interview_meeting.start_time,
          'end_time',
          interview_meeting.end_time,
          'meeting_link',
          interview_meeting.meeting_link
        )
        else null::json
      end as interview_meeting
    from
      interview_session
      left join interview_meeting on interview_meeting.id = interview_session.meeting_id
  ),
  session_interviewers_cte as (
    select
      interview_session_cte.id,
      json_agg(
        case
          when meeting_interviewers.session_id is not null then json_build_object(
            'email',
            meeting_interviewers.email,
            'user_id',
            meeting_interviewers.user_id,
            'last_name',
            meeting_interviewers.last_name,
            'first_name',
            meeting_interviewers.first_name,
            'profile_image',
            meeting_interviewers.profile_image,
            'training_type',
            meeting_interviewers.training_type,
            'interviewer_type',
            meeting_interviewers.interviewer_type,
            'is_confirmed',
            meeting_interviewers.is_confirmed
          )
          else null::json
        end
      ) as users
    from
      interview_session_cte
      left join meeting_interviewers on meeting_interviewers.session_id = interview_session_cte.id
    where
      meeting_interviewers.is_confirmed = true
    group by
      interview_session_cte.id
  ),
  session_ids as (
    select
      interview_session_cte.id,
      interview_session_cte.session_type,
      interview_session_cte.name,
      interview_session_cte.session_order,
      interview_session_cte.interview_meeting,
      coalesce(session_interviewers_cte.users, '[]'::json) as users
    from
      interview_session_cte
      left join session_interviewers_cte on session_interviewers_cte.id = interview_session_cte.id
  ),
  task_session_ids_cte as (
    select
      task_session_relation.task_id,
      coalesce(
        json_agg(session_ids.*) filter (
          where
            session_ids.id is not null
        ),
        '[]'::json
      ) as session_ids
    from
      task_session_relation
      left join session_ids on session_ids.id = task_session_relation.session_id
    group by
      task_session_relation.task_id
  ),
  task_progress_cte as (
    select distinct
      on (new_tasks_progress.task_id) new_tasks_progress.task_id,
      json_build_object(
        'id',
        new_tasks_progress.id,
        'progress_type',
        new_tasks_progress.progress_type,
        'created_at',
        new_tasks_progress.created_at,
        'created_by',
        new_tasks_progress.created_by,
        'jsonb_data',
        new_tasks_progress.jsonb_data,
        'title_meta',
        new_tasks_progress.title_meta
      ) as latest_progress,
      new_tasks_progress.created_at
    from
      new_tasks_progress
    order by
      new_tasks_progress.task_id,
      new_tasks_progress.created_at desc
  )
select
  new_tasks.id,
  new_tasks.created_at,
  new_tasks.name,
  new_tasks.due_date,
  new_tasks.assignee,
  new_tasks.start_date,
  new_tasks.application_id,
  new_tasks.recruiter_id,
  new_tasks.schedule_date_range,
  new_tasks.created_by,
  new_tasks.type,
  new_tasks.status,
  new_tasks.agent,
  new_tasks.filter_id,
  new_tasks.priority,
  new_tasks.task_owner,
  new_tasks.trigger_count,
  new_tasks.task_action,
  new_tasks.request_availability_id,
  coalesce(task_session_ids_cte.session_ids, '[]'::json) as session_ids,
  task_progress_cte.latest_progress
from
  new_tasks
  left join task_session_ids_cte on task_session_ids_cte.task_id = new_tasks.id
  left join task_progress_cte on task_progress_cte.task_id = new_tasks.id;

create or replace view
  public.workflow_view with (security_invoker=true) as
with
  job_cte as (
    select
      workflow_job_relation.workflow_id,
      array_agg(
        json_build_object(
          'id',
          workflow_job_relation.job_id,
          'job_title',
          public_jobs.job_title,
          'department',
          departments.name,
          'location',
          row_to_json(office_locations.*),
          'status',
          public_jobs.status
        )
      ) as jobs
    from
      workflow_job_relation
      left join public_jobs on workflow_job_relation.job_id = public_jobs.id
      left join departments on departments.id = public_jobs.department_id
      left join office_locations on office_locations.id = public_jobs.location_id
    where
      public_jobs.status <> 'closed'::public_job_status
    group by
      workflow_job_relation.workflow_id
  ),
  action_cte as (
    select
      workflow_action.workflow_id,
      coalesce(
        array_agg(
          distinct case
            when workflow_action.action_type = 'end_point'::text
            or workflow_action.action_type = 'agent_instruction'::text then 'company'::text
            else workflow_action.action_type
          end
        ),
        array[]::text[]
      ) as tags
    from
      workflow_action
    group by
      workflow_action.workflow_id
  )
select
  workflow.id,
  workflow.created_at,
  workflow.trigger,
  workflow.phase,
  workflow."interval",
  workflow.title,
  workflow.recruiter_id,
  workflow.auto_connect,
  workflow.description,
  coalesce(job_cte.jobs, array[]::json[]) as jobs,
  workflow.workflow_type,
  workflow.is_active as is_paused,
  array_append(action_cte.tags, workflow.trigger::text) as tags,
  workflow.request_id
from
  workflow
  left join job_cte on job_cte.workflow_id = workflow.id
  left join action_cte on action_cte.workflow_id = workflow.id;