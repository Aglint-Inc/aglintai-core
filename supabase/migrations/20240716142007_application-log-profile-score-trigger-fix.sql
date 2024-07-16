set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log2()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  score numeric;
  title TEXT;
BEGIN
  with scores as (
    select 
      application_status_view.id,
      application_status_view.resume_score,
      coalesce(logs.logs, 0) as logs
    from
      application_status_view
    left join (
      select
        application_id as id,
        count(*) as logs
      from
        application_logs
      where
        application_logs.title similar to 'Application was scored %'
      group by
        id
    ) as logs on
      logs.id = application_status_view.id
    where
      application_status_view.job_id = NEW.id and
      application_status_view.resume_score >= 0 
  )
  insert into application_logs(application_id, title, logged_by, module)
  select 
    scores.id,
    'Application was '|| (
      case
        when scores.logs = 0 then 'scored'
        else 'rescored'
      end
    ) || ' ' || scores.resume_score || '%',
    'system',
    'jobs'
  from
    scores;
  RETURN NEW;
END;
$function$
;


