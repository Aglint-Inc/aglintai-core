UPDATE public_jobs
SET draft = new_public_jobs.draft
FROM (
  SELECT 
    id,
    (draft - 'department') || '{"department_id": null}'::jsonb as draft
  FROM
    public_jobs
) as new_public_jobs
WHERE public_jobs.id = new_public_jobs.id;
