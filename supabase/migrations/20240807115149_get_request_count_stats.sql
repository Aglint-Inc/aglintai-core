alter table "public"."request" drop constraint "request_type_check";

alter table "public"."request" add constraint "request_type_check" CHECK ((type = ANY (ARRAY['schedule_request'::text, 'cancel_schedule_request'::text, 'reschedule_request'::text, 'decline_request'::text]))) not valid;

alter table "public"."request" validate constraint "request_type_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_request_count_stats(assigner_id uuid)
 RETURNS TABLE(date date, counts json)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  with count_cte as (
    select 
      request.created_at::date as count_date,
      request.type,
      request.status,
      count(*) as count
    from
      request
    where 
      request.assigner_id = get_request_count_stats.assigner_id
    group by
      count_date, request.type, request.status
  ), placeholder_cte as (
    select 'schedule_request' as placeholder_type
    union
    select 'cancel_schedule_request' as placeholder_type
    union
    select 'reschedule_request' as placeholder_type
    union
    select 'decline_request' as placeholder_type
  ), status_cte as (
    select 'to_do' as placeholder_status
    union
    select 'in_progress' as placeholder_status
    union
    select 'blocked' as placeholder_status
    union
    select 'completed' as placeholder_status
  ), date_series as (
      select 
        generate_series(
          greatest((now() - '30 days'::interval)::date, (SELECT min(count_date) FROM count_cte)),
          now()::date, 
          '1 day'::interval
        )::date as date
  ), expanded_cte as (
    select 
      date_series.date,
      status_cte.placeholder_status as status,
      placeholder_cte.placeholder_type as type,
      coalesce(count_cte.count, 0) as count
    from 
      date_series
    cross join 
      status_cte
    cross join 
      placeholder_cte
    left join 
      count_cte on date_series.date = count_cte.count_date and status_cte.placeholder_status = count_cte.status and placeholder_cte.placeholder_type = count_cte.type
  ), status_aggregates as (
    select 
      expanded_cte.date,
      expanded_cte.status,
      json_object_agg(
        expanded_cte.type,
        expanded_cte.count
      ) as counts_by_type
    from 
      expanded_cte
    group by 
      expanded_cte.date, expanded_cte.status
  )
  select 
    status_aggregates.date,
    json_object_agg(
      status_aggregates.status,
      status_aggregates.counts_by_type
    ) as counts
  from 
    status_aggregates
  group by 
    status_aggregates.date
  order by 
    status_aggregates.date;
END;
$function$
;


