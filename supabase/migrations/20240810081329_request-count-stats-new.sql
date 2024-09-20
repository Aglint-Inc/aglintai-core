alter table "public"."request" add column "completed_at" timestamp with time zone;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_request_count_stats_new(assigner_id uuid)
 RETURNS TABLE(date date, counts json)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  with
    init_cte as (
      select
        (
          case
            when request.status = 'completed' then 'completed'
            else 'created'
          end
        ) as custom_status,
        request.completed_at::date as cte_completed_at,
        request.created_at::date as cte_created_at,
        request.type,
        request.priority,
        count(*) as count
      from
        request
      where
        request.assigner_id = get_request_count_stats_new.assigner_id or
        request.assignee_id = get_request_count_stats_new.assigner_id
      group by
        custom_status,
        cte_completed_at,
        cte_created_at,
        request.type,
        request.priority
    ),
    count_cte as (
      select
        a.custom_status as status,
        (
          case
            when a.custom_status = 'completed' then a.cte_completed_at
            else a.cte_created_at
          end
        ) as date,
        a.type,
        a.priority,
        a.count + (coalesce(b.count, 0)) as count
      from
        init_cte as a
        left join init_cte as b on b.custom_status = 'completed'
        and a.custom_status = 'created'
        and b.cte_created_at = a.cte_created_at
        and b.type = a.type
        and b.priority = a.priority
    ),
    date_series as (
      select
        generate_series(
          greatest(
            (now() - '9 days'::interval)::date,
            (
              SELECT
                min(count_cte.date)
              FROM
                count_cte
            )
          ),
          now()::date,
          '1 day'::interval
        )::date as date
    ),
    status_cte as (
      select
        'created' as placeholder_status
      union
      select
        'completed' as placeholder_status
    ),
    type_cte as (
      select
        'schedule_request' as placeholder_type
      union
      select
        'cancel_schedule_request' as placeholder_type
      union
      select
        'reschedule_request' as placeholder_type
      union
      select
        'decline_request' as placeholder_type
    ),
    priority_cte as (
      select
        'standard' as placeholder_priority
      union
      select
        'urgent' as placeholder_priority
    ),
    expanded_cte as (
      select
        date_series.date,
        type_cte.placeholder_type as
      type,
      status_cte.placeholder_status as status,
      priority_cte.placeholder_priority as priority,
      coalesce(count_cte.count, 0) as count
      from
        date_series
        cross join status_cte
        cross join type_cte
        cross join priority_cte
        left join count_cte on date_series.date = count_cte.date
        and status_cte.placeholder_status = count_cte.status
        and type_cte.placeholder_type = count_cte.type
        and priority_cte.placeholder_priority = count_cte.priority
    ),
    priority_aggregate_cte as (
      select
        expanded_cte.date,
        expanded_cte.status,
        expanded_cte.type,
        json_object_agg(expanded_cte.priority, expanded_cte.count) as priority_count
      from
        expanded_cte
      group by
        expanded_cte.date,
        expanded_cte.status,
        expanded_cte.type
    ),
    type_aggregate_cte as (
      select
        priority_aggregate_cte.date,
        priority_aggregate_cte.status,
        json_object_agg(
          priority_aggregate_cte.type,
          priority_aggregate_cte.priority_count
        ) as type_count
      from
        priority_aggregate_cte
      group by
        priority_aggregate_cte.date,
        priority_aggregate_cte.status
    )
  select
    type_aggregate_cte.date,
    json_object_agg(
      type_aggregate_cte.status,
      type_aggregate_cte.type_count
    ) as counts
  from
    type_aggregate_cte
  group by
    type_aggregate_cte.date
  order by
    type_aggregate_cte.date;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_completion()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET completed_at = (
    CASE 
      WHEN NEW.status = 'completed' THEN now()
      ELSE null
    END
  )
  WHERE id = NEW.id;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER request_completion AFTER UPDATE OF status ON public.request FOR EACH ROW WHEN ((((new.status = 'completed'::text) AND (new.completed_at IS NULL)) OR ((new.status <> 'completed'::text) AND (new.completed_at IS NOT NULL)))) EXECUTE FUNCTION trigger_request_completion();

DO $$
BEGIN
  UPDATE request
  SET completed_at = now()
  WHERE status = 'completed';
END
$$