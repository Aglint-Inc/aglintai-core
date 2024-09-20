/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/ashby/createapplication`;

interface BatchSaveResponse {
  data: Array<Record<string, unknown>>; // Adjust this based on the actual structure of the returned JSONB objects
  error?: any; // Adjust this based on the expected error structure
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data: applications, error } = (await supabase.rpc(
      'ashbyjobreference',
      { rec_id: req.body.recruiter_id },
    )) as BatchSaveResponse;

    if (error) {
      throw new Error(error.message);
    } else {
      if (applications?.length > 0) {
        await Promise.all(
          applications.map(async (application) => {
            try {
              await axios.post(`${url}`, {
                ...application,
              });
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
        console.log('no applications');
        return res.status(200).send('no applications');
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
