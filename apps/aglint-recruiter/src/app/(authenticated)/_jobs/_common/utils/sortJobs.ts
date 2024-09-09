export function sortJobs(jobs) {
  return jobs.sort((a, b) => {
    const statusOrder = {
      published: 1,
      draft: 2,
      closed: 3,
    };

    const orderA = statusOrder[a.status] || 0;
    const orderB = statusOrder[b.status] || 0;

    return orderA - orderB;
  });
}
