import LoggerV2 from "./logger";

import { callFetchCandidates, supabase } from "./client";

export const ashbySync = async (
  ashby_key: string,
  logger: LoggerV2,
  recruiter_id: string
) => {
  logger.createLog({
    message: `${{ ashby_key }}`,
    subProcess: "ashbySync",
  });
  const fetchedApplications = await fetchAllCandidates(ashby_key, logger);
  const dbApp = fetchedApplications.map((app) => {
    return { ats_json: app, recruiter_id };
  });
  await supabase.from("application_reference").insert(dbApp);
};

export const fetchAllCandidates = async (
  apiKey: string,
  logger: LoggerV2
): Promise<any[]> => {
  let allCandidates: any = [];
  let hasMore = true;
  let page;

  logger.createLog({
    message: `fetching all candidates.`,
    subProcess: "ashbySync",
  });

  while (hasMore) {
    try {
      const data = await callFetchCandidates({ apiKey, page });

      if (data && data.success) {
        allCandidates = allCandidates.concat(data.results);
        if (data.moreDataAvailable) {
          hasMore = true;
          page = data.nextCursor;
        } else {
          hasMore = false;
        }
      } else {
        hasMore = false; // Exit the loop if there are no more records
      }
    } catch (error) {
      hasMore = false; // Exit the loop in case of an error
    }
  }

  return allCandidates;
};
