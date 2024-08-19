import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

type job = {
  slug: string;
  job_title: string;
  description: string;
};

function Jobs() {
  const [jobs, setJobs] = useState<job[]>([]);
  const [selectedJobsSlug, setSelectedJobsSlug] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { recruiterId } = useAppContext();
  const supabase = window.supabase;

  const fetchJobs = async () => {
    try {
      const response = await fetch(
        "https://aglintai-seed-data.vercel.app/company/jobs.json"
      );
      const data: job[] = await response.json();

      const { data: currentJobsSlug }: { data: { slug: string }[] } =
        await supabase.from("public_jobs").select("slug");

      const newJobs = currentJobsSlug.map((d) => d.slug);

      const newJobsAva = data.filter(
        (newJobSlug) => !newJobs.includes(newJobSlug.slug)
      );
      setJobs(newJobsAva);
    } catch (error) {
      console.error("error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSelectJobs = (newSlug: string) => {
    setSelectedJobsSlug((pre) =>
      pre.includes(newSlug)
        ? pre.filter((slug) => slug !== newSlug)
        : [...pre, newSlug]
    );
  };

  const addJobs = async () => {
    setLoading(true);
    const jobsToAdd = jobs
      .filter((job) => selectedJobsSlug.includes(job.slug))
      .map((job) => ({
        ...job,
        job_type: "full time",
        workplace_type: "on site",
        recruiter_id: recruiterId,
        status: "published",
      }));

    const { data, error } = await supabase
      .from("public_jobs")
      .insert(jobsToAdd)
      .select("id,slug");

    if (error) {
      console.error("adding job", error);
    } else {
      console.log("job added");
      await fetchJobs();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h5>Jobs to add</h5>
      {jobs.length ? (
        <>
          {jobs.map((job) => (
            <div
              key={job.slug}
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => handleSelectJobs(job.slug)}
            >
              <input
                type="checkbox"
                checked={selectedJobsSlug.includes(job.slug)}
              />
              {job.job_title}
            </div>
          ))}
          <button style={{ marginTop: "10px" }} onClick={addJobs}>
            Add jobs
          </button>
        </>
      ) : (
        <p>no jobs found to add</p>
      )}
    </div>
  );
}

export default Jobs;
