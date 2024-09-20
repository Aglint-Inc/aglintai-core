export function searchJobs(jobs: any[], searchString: string) {
  const search = searchString.toLowerCase();
  if (search) {
    const filteredData = jobs.filter((item) => {
      const jobTitle = item.job_title.toLowerCase();
      return jobTitle.includes(search);
    });
    return filteredData;
  } else {
    return jobs;
  }
}
