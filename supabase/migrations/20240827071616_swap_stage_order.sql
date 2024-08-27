set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.swap_stage_order(plan_id_1 uuid, plan_id_2 uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  job_id_1 uuid;
  plan_order_1 numeric;
  job_id_2 uuid;
  plan_order_2 numeric;
BEGIN
  SELECT job_id, plan_order INTO job_id_1, plan_order_1
  FROM interview_plan
  WHERE id = plan_id_1;

  SELECT job_id, plan_order INTO job_id_2, plan_order_2
  FROM interview_plan
  WHERE id = plan_id_2;

  IF job_id_1 = job_id_2 THEN
    UPDATE interview_plan
    SET plan_order = plan_order_2
    WHERE id = plan_id_1;
    UPDATE interview_plan
    SET plan_order = plan_order_1
    WHERE id = plan_id_2;
  END IF;
END;
$function$
;