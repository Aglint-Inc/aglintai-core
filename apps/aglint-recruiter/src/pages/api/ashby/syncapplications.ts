/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { DatabaseTableInsert, DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { AshbyApplication } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/Ashby/types';

export const maxDuration = 300;

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const syncToken = req.body.synctoken;
    const apiKey = req.body.apikey;
    const recruiter_id = req.body.recruiter_id;
    // if (!syncToken) {
    //   return res.status(200).send('no sync token');
    // }
    if (!apiKey) {
      return res.status(200).send('no api key');
    }
    if (!recruiter_id) {
      return res.status(200).send('no recruiter id');
    }

    const fetchedApplications = await fetchAllCandidates(apiKey, syncToken);

    console.log('fetchedApplications no', fetchedApplications.length);

    if (!fetchedApplications || fetchedApplications.length === 0) {
      return res.status(200).send('no new applications');
    }

    await updateOrInsertApplications(fetchedApplications, recruiter_id);

    return res
      .status(200)
      .send(`Successfully updated ${fetchedApplications.length} applications`);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;

export const fetchAllCandidates = async (
  apiKey: string,
  syncToken?: string,
): Promise<AshbyApplication[]> => {
  let allCandidates = [];
  let hasMore = true;
  let page;

  while (hasMore) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/ashby/getCandidates`,
        {
          page: page,
          apiKey: apiKey,
          synctoken: syncToken,
        },
      );

      if (response.data && response.data.success) {
        allCandidates = allCandidates.concat(response.data.results);
        if (response.data.moreDataAvailable) {
          hasMore = true;
          page = response.data.nextCursor;
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

const updateOrInsertApplications = async (
  fetchedApplications: AshbyApplication[],
  recruiter_id,
) => {
  // const applicationsToUpdate = [];
  // const applicationsToInsert = [];

  // for (const application of fetchedApplications) {
  //   const { data, error } = await supabase
  //     .from('application_reference')
  //     .select()
  //     .eq('ats_json->>id', application.id)
  //     .eq('recruiter_id', recruiter_id);

  //   if (!error) {
  //     if (data && data.length > 0) {
  //       applicationsToUpdate.push(application);
  //     } else {
  //       applicationsToInsert.push(application);
  //     }
  //   }
  // }

  // if (fetchedApplications.length > 0) {
  //   const updatePromises = fetchedApplications.map((application) =>
  //     supabase
  //       .from('application_reference')
  //       .update({ ats_json: application })
  //       .eq('ats_json->>id', application.id)
  //       .eq('recruiter_id', recruiter_id),
  //   );
  //   await Promise.all(updatePromises);
  // }

  if (fetchedApplications.length > 0) {
    const upsertApplicationReference: DatabaseTableInsert['application_reference'][] =
      fetchedApplications.map((app) => ({
        ats_json: app,
        recruiter_id: recruiter_id,
      }));

    await supabase
      .from('application_reference')
      .upsert(upsertApplicationReference);
  }
};
