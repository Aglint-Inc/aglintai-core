/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type GreenhouseApplicationRemoteData } from '@/api/sync/greenhouse/applications/type';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

import { type SaveResumeAPI } from './saveResume';

const baseUrl = process.env.NEXT_PUBLIC_HOST_NAME;
if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_HOST_NAME not set');
}
const url = `${baseUrl}/api/greenhouse/saveResume`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { recruiter_id } = req.body as {
      recruiter_id: string;
    };
    if (!recruiter_id) {
      console.log('required recruiter id is missing');
      return res.status(400).json('required payload is missing');
    }

    const applications = (
      await supabaseAdmin
        .from('applications')
        .select('application_id:id,remote_data, candidate_id')
        .eq('is_resume_fetching', true)
        .not('remote_data', 'is', null)
        .eq('source', 'greenhouse')
        .eq('recruiter_id', recruiter_id)
        .order('created_at', {
          ascending: true,
        })
        .limit(50)
        .throwOnError()
    ).data as {
      application_id: string;
      remote_data: GreenhouseApplicationRemoteData;
      candidate_id: string;
    }[];
    if (applications.length) {
      await Promise.all(
        applications.map(async (ref) => {
          try {
            const resume = ref.remote_data?.resume;
            if (resume) {
              const bodyParams: SaveResumeAPI['request'] = {
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
