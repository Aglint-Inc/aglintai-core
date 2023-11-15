/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  let payload = req.body;

  if (payload.application_id && payload.resume) {
    // Supabase credentials

    const { data: job } = await supabase
      .from('job_applications')
      .select()
      .eq('application_id', payload.application_id);

    let fileUrl = req.body.resume;
    let bucketName = 'resume-job-post';

    if (
      fileUrl.includes('pdf') ||
      fileUrl.includes('doc') ||
      fileUrl.includes('txt')
    ) {
      try {
        const response = await axios.get(fileUrl, {
          responseType: 'arraybuffer', // Request binary data
        });

        const { data, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(
            `public/${job[0].candidate_id}/${
              job[0].job_id +
              (fileUrl.includes('pdf')
                ? '.pdf'
                : fileUrl.includes('doc')
                ? '.docx'
                : fileUrl.includes('txt')
                ? '.txt'
                : '.pdf')
            }`,
            response.data,
            {
              contentType: fileUrl.includes('pdf')
                ? 'application/pdf'
                : fileUrl.includes('doc')
                ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                : fileUrl.includes('txt')
                ? 'text/plain'
                : 'application/pdf',
              cacheControl: '3600',
              upsert: true,
            },
          );
        const fileLink = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${data.path}`;
        if (!uploadError) {
          console.log(fileLink);
          const { data: app, error: errorApp } = await supabase
            .from('job_applications')
            .update({ resume: fileLink })
            .eq('application_id', payload.application_id)
            .select();

          if (errorApp) {
            await supabase
              .from('greenhouse_reference')
              .update({ resume_saved: true })
              .eq('application_id', payload.application_id)
              .select();
            res.status(200).json(errorApp);
          } else {
            res.status(200).json(app[0]);
          }
        } else {
          console.log(uploadError);
          res.status(200).json(uploadError);
        }

        // Fetch the file from the URL
      } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
    }
  } else {
    console.log('opportunity_id is missing');
    res.status(400).json('opportunity_id or application_id is missing');
  }
}
