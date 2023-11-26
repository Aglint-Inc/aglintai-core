DROP FUNCTION IF EXISTS GetJobApplicationCountForCandidates;

CREATE OR REPLACE FUNCTION GetJobApplicationCountForCandidates(candidate_ids uuid[])
RETURNS TABLE (candidate_id uuid, job_titles text[]) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        ja.candidate_id,
        ARRAY_AGG(pj.job_title) AS job_titles
    FROM
        job_applications AS ja
    JOIN
        public_jobs AS pj ON ja.job_id = pj.id
    WHERE
        ja.candidate_id = ANY(candidate_ids)
    GROUP BY
        ja.candidate_id;
END;
$$ LANGUAGE plpgsql;


-- SELECT * FROM GetJobApplicationCountForCandidates('{cd4771c1-df11-4f61-8816-be4460e491dd}');