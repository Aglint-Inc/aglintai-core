/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { AshbyApplication } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/Ashby/types';

export const maxDuration = 300;

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
