drop trigger if exists "application_score_log" on "public"."applications";

drop trigger if exists "application_score_log2" on "public"."public_jobs";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  score numeric;
BEGIN
  SELECT INTO score 
    score_application(applications.score_json -> 'scores', public_jobs.parameter_weights)
  FROM
    applications
  INNER JOIN
    public_jobs ON
      public_jobs.id = applications.job_id
  WHERE
    applications.id = NEW.id;
  IF score IS NOT NULL AND score >= 0 THEN
    INSERT INTO 
      application_logs (application_id, logged_by, module, title)
    VALUES
      (
        NEW.id,
        'system',
        'jobs',
        'Application was scored ' || score || '% by AglintAI'
      );
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log2()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  WITH scores AS (
    SELECT
      applications.id as application_id,
      score_application(applications.score_json -> 'scores', NEW.parameter_weights) as new_score,
      score_application(applications.score_json -> 'scores', OLD.parameter_weights) as old_score
    FROM
      applications
    WHERE
      applications.job_id = NEW.id
  )
  INSERT INTO 
    application_logs (application_id, logged_by, module, title)
  SELECT
    scores.application_id,
    'system',
    'jobs',
    'Application was scored ' || scores.new_score || '% due to updated score weights'
  FROM
    scores
  WHERE
    scores.new_score <> scores.old_score AND
    scores.new_score IS NOT NULL AND
    scores.new_score >= 0;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER application_score_log AFTER UPDATE OF processing_status ON public.applications FOR EACH ROW WHEN (((new.processing_status = 'success'::application_processing_status) AND ((new.score_json -> 'scores'::text) IS NOT NULL))) EXECUTE FUNCTION trigger_application_score_log();

CREATE TRIGGER application_score_log2 AFTER UPDATE OF parameter_weights ON public.public_jobs FOR EACH ROW WHEN ((new.parameter_weights <> old.parameter_weights)) EXECUTE FUNCTION trigger_application_score_log2();


