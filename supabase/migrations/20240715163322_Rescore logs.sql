set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  score numeric;
  log_count numeric;
BEGIN
  IF NEW.processing_status = 'success' AND NEW.score_json -> 'scores' IS NOT NULL THEN
    select into score, log_count
      score_application(
        applications.score_json -> 'scores',
        public_jobs.parameter_weights
      ),
      coalesce(logs.logs, 0)
    from
      applications
    left join (
      select
        application_id as id,
        coalesce(count(*)) as logs
      from
        application_logs
      where
        title similar to 'Application was scored %'
      group by
        id
    ) as logs on
      logs.id = applications.id
    inner join
      public_jobs on
        public_jobs.id = applications.job_id
    where
      applications.id = NEW.id;
    IF score IS NOT NULL AND score >= 0 THEN
      INSERT INTO application_logs(application_id, title, logged_by, module)
      VALUES (NEW.id, 
      'Application was '|| (
        case
          when log_count = 0 then 'scored'
          else 'rescored'
        end
      ) || ' ' || score || '%',
      'system', 'jobs');
    END IF;
  END IF;
  RETURN NEW;
END;
$function$
;

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
      logs.logs
    from
      application_status_view
    left join (
      select
        application_id as id,
        coalesce(count(*)) as logs
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


