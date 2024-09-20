set check_function_bodies = off;

CREATE
OR REPLACE FUNCTION public.get_request_count_stats (assigner_id uuid) RETURNS TABLE (date date, counts json) LANGUAGE plpgsql AS $function$
BEGIN
  RETURN QUERY
  with count_cte as (
    select 
      request.created_at::date as count_date,
      request.type,
      request.status,
      request.priority,
      count(*) as count
    from
      request
    where 
      request.assigner_id = get_request_count_stats.assigner_id
    group by
      count_date, request.type, request.status, request.priority
  ), date_series as (
      select 
        generate_series(
          greatest((now() - '30 days'::interval)::date, (SELECT min(count_date) FROM count_cte)),
          now()::date, 
          '1 day'::interval
        )::date as date
  ), status_cte as (
    select 'to_do' as placeholder_status
    union
    select 'in_progress' as placeholder_status
    union
    select 'blocked' as placeholder_status
    union
    select 'completed' as placeholder_status
  ), type_cte as (
    select 'schedule_request' as placeholder_type
    union
    select 'cancel_schedule_request' as placeholder_type
    union
    select 'reschedule_request' as placeholder_type
    union
    select 'decline_request' as placeholder_type
  ), priority_cte as (
    select 'standard' as placeholder_priority
    union
    select 'urgent' as placeholder_priority
  ), expanded_cte as (
    select 
      date_series.date,
      type_cte.placeholder_type as type,
      status_cte.placeholder_status as status,
      priority_cte.placeholder_priority as priority,
      coalesce(count_cte.count, 0) as count
    from 
      date_series
    cross join 
      status_cte
    cross join 
      type_cte
    cross join
      priority_cte
    left join 
      count_cte on 
        date_series.date = count_cte.count_date and 
        status_cte.placeholder_status = count_cte.status and 
        type_cte.placeholder_type = count_cte.type and
        priority_cte.placeholder_priority = count_cte.priority
  ), priority_aggregate_cte as (
    select 
      expanded_cte.date, 
      expanded_cte.status,
      expanded_cte.type, 
      json_object_agg(
        expanded_cte.priority,
        expanded_cte.count
      ) as priority_count
    from
      expanded_cte
    group by
      expanded_cte.date, expanded_cte.status, expanded_cte.type
  ), type_aggregate_cte as (
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
      priority_aggregate_cte.date, priority_aggregate_cte.status
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
$function$;