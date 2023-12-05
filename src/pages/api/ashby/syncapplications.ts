/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { AshbyApplication } from '@/src/components/JobsDashboard/AddJobWithIntegrations/Ashby/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const syncToken = req.body.synctoken;
    const apiKey = req.body.apikey;
    if (!syncToken) {
      return res.status(200).send('no sync token');
    }
    if (!apiKey) {
      return res.status(200).send('no api key');
    }

    const fetchedApplications = await fetchAllCandidates(apiKey, syncToken);

    if (!fetchedApplications || fetchedApplications.length === 0) {
      return res.status(200).send('no new applications');
    }

    await Promise.all(
      fetchedApplications.map(async (application) => {
        const { data, error } = await supabase
          .from('application_reference')
          .select()
          .eq('ats_json->>id', application.id);
        if (!error) {
          if (data && data.length > 0) {
            await supabase
              .from('application_reference')
              .update({ ats_json: application })
              .eq('ats_json->>id', application.id);
            console.log('application already existed', application.id);
          } else {
            await supabase
              .from('application_reference')
              .insert({ ats_json: application });
            console.log('application new', application.id);
          }
        }
      }),
    );

    return res.status(200).send(fetchedApplications);
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
