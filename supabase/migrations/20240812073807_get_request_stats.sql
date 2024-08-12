set check_function_bodies = off;

CREATE OR REPLACE FUNCTION get_request_stats (assigner_id uuid) RETURNS TABLE (date text, created bigint, completed bigint, on_going bigint) AS $$
BEGIN
  RETURN QUERY 
  WITH count_cte AS (
    SELECT 
      date_series.date,
      COUNT(*) FILTER (WHERE date_series.date = request.created_at::date) as created,
      COUNT(*) FILTER (WHERE date_series.date = request.completed_at::date) as completed,
      COUNT(*) FILTER (WHERE date_series.date = request.created_at::date AND (status = 'in_progress' OR status = 'blocked')) as on_going
    FROM
      (
        SELECT  
          *
        FROM (
          SELECT DISTINCT created_at::date as date FROM request WHERE created_at IS NOT NULL
          UNION
          SELECT DISTINCT completed_at::date as date FROM request WHERE completed_at IS NOT NULL
        ) as temp
        ORDER BY 
          date DESC
        LIMIT 10
      ) as date_series
    LEFT JOIN 
      request ON
        request.created_at::date = date_series.date OR
        request.completed_at::date = date_series.date
    WHERE
      request.assignee_id = get_request_stats.assigner_id OR
      request.assigner_id = get_request_stats.assigner_id
    GROUP BY
      date_series.date
    ORDER BY 
      date_series.date DESC
  ), final_count_cte AS (
    SELECT 
    count_cte.*,
    (SUM(count_cte.on_going) OVER ())::bigint as sum,
    ROW_NUMBER() OVER()
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