import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import Papa from "papaparse";

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
  const [message, setMessage] = useState<string[]>([]);
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
    const {
      data: departments,
      error: departmentError,
    }: { data: { id: number }[]; error: any } = await supabase
      .from("departments")
      .select("id");

    if (departmentError) {
      setMessage((pre) => [
        ...pre,
        `department fetching error ${departmentError.message}`,
      ]);
    }
    const {
      data: locations,
      error: locationError,
    }: { data: { id: number }[]; error: any } = await supabase
      .from("office_locations")
      .select("id");

    if (locationError) {
      setMessage((pre) => [
        ...pre,
        `location fetching error ${locationError.message}`,
      ]);
    }

    const locationsIds = locations.map((loc) => loc.id);
    const departmentIds = departments.map((dep) => dep.id);

    const jobsToAdd = jobs
      .filter((job) => selectedJobsSlug.includes(job.slug))
      .map((job) => {
        const dep_id = randomPickEle(departmentIds);
        const loc_id = randomPickEle(locationsIds);
        return {
          ...job,
          job_type: "full time",
          workplace_type: "on site",
          recruiter_id: recruiterId,
          status: "published",
          department_id: dep_id,
          location_id: loc_id,
          jd_json: {
            level: "Senior-level",
            title: job.job_title,
            skills: [],
            educations: [],
            rolesResponsibilities: [],
          },
          draft: {
            jd_json: {
              level: "Senior-level",
              title: job.job_title,
              skills: [],
              educations: [],
              rolesResponsibilities: [],
            },
            job_type: "full time",
            job_title: job.job_title,
            description: job.description,
            location_id: loc_id,
            department_id: dep_id,
            workplace_type: "on site",
          },
        };
      });

    const {
      data: jobsData,
      error: jobAddError,
    }: { data: { id: string; slug: string }[]; error: any } = await supabase
      .from("public_jobs")
      .insert(jobsToAdd)
      .select("id,slug");

    if (jobAddError) {
      setMessage((pre) => [...pre, `Job adding failed`]);
      return;
    } else {
      setMessage((pre) => [...pre, `Job added succuessfully`]);
    }

    jobsData.map(async (job) => {
      const url = `https://aglintai-seed-data.vercel.app/jobs/${job.slug}/candidate.csv`;
      // const url = `https://aglintai-seed-data.vercel.app/jobs/senior-software-engineer-full-stack/candidate.csv`;

      await fetch(url)
        .then((response) => response.text())
        .then((data) => {
          Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              const candidates = results.data as uploadCsv["candidates"];
              handleUpdate(
                {
                  candidates: candidates,
                  job_id: job.id,
                  recruiter_id: recruiterId,
                },
                setMessage
              );
            },
          });
        })
        .catch((e) => {
          setMessage((pre) => [...pre, `candidate upload error ${e.message}`]);
        });
    });
    await fetchJobs();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          minWidth: "500px",
        }}
      >
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
      {message?.length ? (
        <div
          style={{
            marginLeft: "20px",
            paddingLeft: "20px",
            borderLeft: "1px solid grey",
          }}
        >
          <div>
            <h5>Console</h5>
            {message.map((mes) => (
              <p>{mes}</p>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Jobs;

const randomPickEle = (array: number[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

type uploadCsv = {
  candidates: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    linkedin: string;
    file_url: string;
  }[];
  recruiter_id: string;
  job_id: string;
};

const handleUpdate = async (
  data: uploadCsv,
  setMessage: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const { status } = await axios.post("api/job/candidateUpload/csvUpload", {
      ...data,
    });

    if (status != 200) throw new Error("failed to update");
    setMessage((pre) => [...pre, "candidates added successfully"]);
  } catch (error) {
    setMessage((pre) => [...pre, "candidates adding failed"]);
  } finally {
  }
};
