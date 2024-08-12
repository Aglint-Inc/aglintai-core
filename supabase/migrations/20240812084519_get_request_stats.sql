set check_function_bodies = off;

DROP FUNCTION IF EXISTS public.get_request_stats;

CREATE OR REPLACE FUNCTION public.get_request_stats(assigner_id uuid, curr_date date DEFAULT NOW()::date) RETURNS TABLE (date text, created bigint, completed bigint, on_going bigint) AS $$
BEGIN
  RETURN QUERY 
  WITH
  request_cte AS (
    SELECT
      request.created_at,
      request.completed_at,
      request.status
    FROM
      request
    WHERE
      request.assignee_id = get_request_stats.assigner_id
      OR request.assigner_id = get_request_stats.assigner_id
  ),
  date_cte AS (
    SELECT DISTINCT
      request_cte.created_at::date as date
    FROM
      request_cte
    WHERE
      request_cte.created_at IS NOT NULL
    UNION
    SELECT DISTINCT
      request_cte.completed_at::date as date
    FROM
      request_cte
    WHERE
      request_cte.completed_at IS NOT NULL
  ),
  date_series AS (
    SELECT
      GENERATE_SERIES(
        GREATEST(
          (get_request_stats.curr_date::date - '9 days'::interval)::date,
          (
            SELECT
              MIN(date_cte.date)
            FROM
              date_cte
          )
        ),
        get_request_stats.curr_date::date,
        '1 day'::interval
      )::date as date
  ),
  count_cte AS (
    SELECT
      date_series.date,
      COUNT(*) FILTER (
        WHERE
          date_series.date = request_cte.created_at::date
      ) as created,
      COUNT(*) FILTER (
        WHERE
          date_series.date = request_cte.completed_at::date
      ) as completed,
      COUNT(*) FILTER (
        WHERE
          date_series.date = request_cte.created_at::date
          AND status = 'in_progress'
      ) as on_going
    FROM
      date_series
      LEFT JOIN request_cte ON request_cte.created_at::date = date_series.date
      OR request_cte.completed_at::date = date_series.date
    GROUP BY
      date_series.date
    ORDER BY
      date_series.date DESC
  ),
  final_count_cte AS (
    SELECT
      count_cte.*,
      (SUM(count_cte.on_going) OVER ())::bigint as sum,
      ROW_NUMBER() OVER ()
    FROM
      count_cte
  )
  SELECT
    final_count_cte.date::text,
    final_count_cte.created::bigint,
    final_count_cte.completed::bigint,
    (
      CASE
        WHEN final_count_cte.row_number = 1 THEN final_count_cte.sum
        ELSE 0
      END
    )::bigint as on_going
  FROM
    final_count_cte
  ORDER BY
    final_count_cte.date ASC;
END;
$$
LANGUAGE PLPGSQL;