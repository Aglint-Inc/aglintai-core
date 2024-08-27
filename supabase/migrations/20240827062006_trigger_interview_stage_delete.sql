set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_interview_stage_delete()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  WITH ordered_stages AS (
    select
      interview_plan.id,
      row_number() over(order by interview_plan.plan_order, interview_plan.name, interview_plan.id) as plan_order
    from
      interview_plan
    where
      interview_plan.job_id = OLD.job_id
  )
  UPDATE interview_plan
  SET plan_order = ordered_stages.plan_order
  FROM ordered_stages
  WHERE interview_plan.id = ordered_stages.id;
  RETURN NULL;
END;
$function$
;

CREATE TRIGGER interview_stage_delete AFTER DELETE ON public.interview_plan FOR EACH ROW EXECUTE FUNCTION trigger_interview_stage_delete();


