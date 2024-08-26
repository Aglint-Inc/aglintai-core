set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_completed_interviews(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type text DEFAULT 'month'::text)
 RETURNS TABLE(date date, count bigint)
 LANGUAGE plpgsql
AS $function$
DECLARE
  trunc_field text;
  interval_field text;
  series_field text;
  group_field text;
BEGIN
  trunc_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then 'month'
      when scheduling_analytics_completed_interviews.type = 'quarter' then 'week'
      else 'day'
    end
  );
  interval_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then '12 months'
      when scheduling_analytics_completed_interviews.type = 'quarter' then '12 weeks'
      else '30 days'
    end
  );
  series_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then '11 months'
      when scheduling_analytics_completed_interviews.type = 'quarter' then '11 weeks'
      else '29 days'
    end
  );
  group_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then '1 month'
      when scheduling_analytics_completed_interviews.type = 'quarter' then '1 week'
      else '1 day'
    end
  );
   RETURN QUERY
    with
      interviews as (
        select
          interview_meeting.status,
          interview_meeting.end_time::date as end_time,
          applications.job_id,
          public_jobs.recruiter_id
        from
          interview_meeting
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_interviews as (
        select
          date_trunc(trunc_field, interviews.end_time)::date as end_time
        from
          interviews
        where
          interviews.recruiter_id = scheduling_analytics_completed_interviews.recruiter_id
          and interviews.status = 'completed'
          and date_trunc(trunc_field, interviews.end_time)::date <= date_trunc(trunc_field, now()::date)::date
          and date_trunc(trunc_field, interviews.end_time)::date >= date_trunc(trunc_field, now()::date)::date - (interval_field)::interval
          and interviews.job_id IN (
            SELECT
              *
            FROM
              get_filtered_job_ids (
                scheduling_analytics_completed_interviews.recruiter_id,
                scheduling_analytics_completed_interviews.departments,
                scheduling_analytics_completed_interviews.jobs
              )
          )
      ),
      valid_dates as (
        select
          filtered_interviews.end_time,
          count(*)
        from
          filtered_interviews
        group by
          filtered_interviews.end_time
      ),
      date_series as (
        select
          generate_series(
            (
              greatest(
                (
                  date_trunc(trunc_field, now()::date)::date - (series_field)::interval
                ),
                (
                  select
                    coalesce(
                      (
                        select
                          min(valid_dates.end_time)
                        from
                          valid_dates
                      ),
                      date_trunc(trunc_field, now()::date)::date
                    )
                )
              )
            )::date,
            date_trunc(trunc_field, now()::date)::date,
            (group_field)::interval
          ) as end_time
      )
    select
      (date_series.end_time)::date as date,
      coalesce(valid_dates.count, 0)::bigint as count
    from
      date_series
      left join valid_dates on valid_dates.end_time = date_series.end_time;
END;
$function$
;


