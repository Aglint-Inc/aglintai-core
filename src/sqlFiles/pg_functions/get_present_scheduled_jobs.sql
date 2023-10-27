create or replace function get_present_scheduled_jobs () returns setof json as $$
BEGIN
  RETURN QUERY
    SELECT
      json_build_object(
        'job_id', id::uuid,
        'job_title', job_title::text,
        'time_stamp', TO_TIMESTAMP(active_status -> 'interviewing' ->> 'timeStamp', 'YYYY-MM-DD')::timestamp,
        'current_date', current_date::timestamp
      )
    FROM
      public.public_jobs
    WHERE
    active_status -> 'closed' ->> 'isActive' = 'false' AND
      active_status -> 'interviewing' ->> 'timeStamp' IS NOT NULL
      AND to_timestamp(
        active_status -> 'interviewing' ->> 'timeStamp',
        'YYYY-MM-DD'
      ) = current_date;
END;
$$ language plpgsql;