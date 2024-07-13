/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { DatabaseTable } from '@aglint/shared-types';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/greenhouse/saveResume`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data: applications, error } = await supabaseAdmin
      .from('greenhouse_reference')
      .select()
      .eq('resume_saved', false)
      .not('resume', 'is', null)
      .order('created_at', {
        ascending: true,
      })
      .limit(50);

    if (error) {
      throw new Error(error.message);
    } else {
      if (applications?.length > 0) {
        await Promise.all(
          applications.map(async (ref) => {
            try {
              const bodyParams: DatabaseTable['greenhouse_reference'] = ref;
              await axios.post(`${url}`, bodyParams);
              console.log(
                'Request successful for application:',
                ref.application_id,
              );
            } catch (error) {
              console.error(
                'Error for application:',
                ref.application_id,
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
