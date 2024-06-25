DROP VIEW IF EXISTS tasks_view;
CREATE VIEW tasks_view AS WITH latest_progress_cte AS (
  SELECT DISTINCT ON (task_id) task_id,
    json_build_object(
      'id',
      new_tasks_progress.id,
      'progress_type',
      new_tasks_progress.progress_type,
      'created_at',
      new_tasks_progress.created_at,
      'created_by',
      new_tasks_progress.created_by,
      'jsonb_data',
      new_tasks_progress.jsonb_data,
      'title_meta',
      new_tasks_progress.title_meta
    ) AS latest_progress,
    created_at
  FROM new_tasks_progress
  ORDER BY task_id,
    CASE
      WHEN new_tasks_progress.progress_type = 'interview_schedule' THEN 0
      ELSE 1
    END,
    created_at DESC
)
SELECT new_tasks.*,
  latest_progress_cte.latest_progress
FROM new_tasks
  LEFT JOIN latest_progress_cte ON latest_progress_cte.task_id = new_tasks.id;
-- new_tasks.id;