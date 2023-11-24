/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/src/utils/supabaseClient';

const url = `https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/process_resume_and_jd_v1`;

interface BatchCalcResumeJDScoreResponse {
  data: Array<Record<string, unknown>>; // Adjust this based on the actual structure of the returned JSONB objects
  error?: any; // Adjust this based on the expected error structure
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data: applications, error } = (await supabase.rpc(
      'batchcalcresumejdscore',
    )) as BatchCalcResumeJDScoreResponse;
    if (error) {
      throw new Error(error.message);
    } else {
      if (applications?.length > 0) {
        await Promise.all(
          applications.map(async (application) => {
            try {
              await axios.post(`${url}`, {
                application,
              });
              console.log(
                'Request successful for application:',
                application.application_id,
              );
            } catch (error) {
              console.error(
                'Error for application:',
                application.application_id,
                error.message,
              );
              // You might want to handle errors here
            }
          }),
        );
        return res.status(200).send('success');
      } else {
        return res.status(200).send('no applications');
      }
    }
  } catch (error) {
    console.log(error, req.body.application_id);
    return res.status(500).send(error.message);
  }
};

export default handler;
