/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type GreenhouseApplication } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/GreenhouseModal/types';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import type { saveResumeAPI } from './saveResume';

const baseUrl = process.env.NEXT_PUBLIC_HOST_NAME;
if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_HOST_NAME not set');
}
const url = `${baseUrl}/api/greenhouse/saveResume`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const applications = (
      await supabaseAdmin
        .from('applications')
        .select('application_id:id,remote_data, candidate_id')
        .eq('is_resume_fetching', true)
        .order('created_at', {
          ascending: true,
        })
        .limit(50)
        .throwOnError()
    ).data as {
      application_id: string;
      remote_data: GreenhouseApplication;
      candidate_id: string;
    }[];
    if (applications.length) {
      await Promise.all(
        applications.map(async (ref) => {
          try {
            const resume = ref.remote_data?.attachments?.find(
              (item) => item.type == 'resume',
            )?.url;
            if (resume) {
              const bodyParams: saveResumeAPI['request'] = {
                application_id: ref.application_id,
                resume: resume,
                candidate_id: ref.candidate_id,
              };
              await axios.post(`${url}`, bodyParams);
              console.log(
                'Request successful for application:',
                ref.application_id,
              );
            } else {
              await supabaseAdmin
                .from('applications')
                .update({
                  is_resume_fetching: false,
                  processing_status: 'failed',
                  retry: 2,
                })
                .eq('id', ref.application_id)
                .throwOnError();
            }
          } catch (error) {
            console.error(
              'Error for application:',
              ref.application_id,
              String(error),
            );
          }
        }),
      );
      return res.status(200).send('success');
    } else {
      console.log('no applications');
      return res.status(200).send('no applications');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
