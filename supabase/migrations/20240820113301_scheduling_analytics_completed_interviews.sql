drop function if exists "public"."scheduling_analytics_completed_interviews"(recruiter_id uuid, type text, jobs uuid[]);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_completed_interviews(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type text DEFAULT 'day'::text)
 RETURNS TABLE(date date, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
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
          date_trunc(
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                else 'day'
              end
            ),
            interviews.end_time
          )::date as end_time
        from
          interviews
        where
          interviews.recruiter_id = scheduling_analytics_completed_interviews.recruiter_id
          and interviews.status = 'completed'
          and date_trunc(
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                else 'day'
              end
            ),
            interviews.end_time
          )::date <= date_trunc(
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                else 'day'
              end
            ),
            now()::date
          )::date
          and date_trunc(
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                else 'day'
              end
            ),
            interviews.end_time
          )::date >= date_trunc(
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                else 'day'
              end
            ),
            now()::date
          )::date - (
            case
              when scheduling_analytics_completed_interviews.type = 'month' then '12 months'
              else '30 days'
            end
          )::interval
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
                  date_trunc(
                    (
                      case
                        when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                        else 'day'
                      end
                    ),
                    now()::date
                  )::date - (
                    case
                      when scheduling_analytics_completed_interviews.type = 'month' then '11 months'
                      else '29 days'
                    end
                  )::interval
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
                      date_trunc(
                        (
                          case
                            when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                            else 'day'
                          end
                        ),
                        now()::date
                      )::date
                    )
                )
              )
            )::date,
            date_trunc(
              (
                case
                  when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                  else 'day'
                end
              ),
              now()::date
            )::date,
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then '1 month'
                else '1 day'
              end
            )::interval
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


