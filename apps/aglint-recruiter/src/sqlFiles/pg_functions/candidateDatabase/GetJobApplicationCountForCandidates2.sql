DROP FUNCTION IF EXISTS GetJobApplicationCountForCandidates2;

CREATE OR REPLACE FUNCTION GetJobApplicationCountForCandidates2(candidate_ids uuid[])
RETURNS TABLE (candidate_id uuid, job_ids uuid[], job_titles text[]) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        j_app.candidate_id ,
        ARRAY_AGG(pj.id) as job_ids,
        ARRAY_AGG(pj.job_title) AS job_titles
    FROM
        applications AS j_app
    JOIN
        public_jobs AS pj ON j_app.job_id = pj.id
    WHERE
        j_app.candidate_id = ANY(candidate_ids)
    GROUP BY
        j_app.candidate_id;
END;
$$ LANGUAGE plpgsql;


SELECT * FROM GetJobApplicationCountForCandidates2('{cd4771c1-df11-4f61-8816-be4460e491dd}');