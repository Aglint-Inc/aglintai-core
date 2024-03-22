/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Database } from '@/src/types/schema';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  let payload = req.body;

  if (payload.application_id) {
    if (!payload.resume) {
      await supabase
        .from('applications')
        .update({ processing_status: 'failed', retry: 2 })
        .eq('application_id', payload.application_id);
      return res.status(400).json('Resume URL is missing');
    }

    console.log(payload.application_id, 'payload.application_id');

    // Supabase credentials

    const { data: job } = await supabase
      .from('applications')
      .select()
      .eq('id', payload.application_id);

    if (job.length === 0) {
      await supabase
        .from('greenhouse_reference')
        .update({ resume_saved: true })
        .eq('application_id', payload.application_id)
        .select();
      console.log('No application found');
      return res.status(200).json('No application found');
    }

    let fileUrl = payload.resume.toLowerCase();
    let bucketName = 'resume-job-post';
    let fileId = uuidv4();

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
            `public/${fileId}${
              fileUrl.includes('pdf')
                ? '.pdf'
                : fileUrl.includes('doc')
                  ? '.docx'
                  : fileUrl.includes('txt')
                    ? '.txt'
                    : '.pdf'
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

          const { error: errorCandFiles } = await supabase
            .from('candidate_files')
            .insert({
              candidate_id: job[0].candidate_id,
              file_url: fileLink,
              id: fileId,
              type: 'resume',
            })
            .select();

          console.log(errorCandFiles, 'errorCandFiles');

          const { data: app, error: errorApp } = await supabase
            .from('applications')
            .update({ is_resume_fetching: false, candidate_file_id: fileId })
            .eq('id', payload.application_id)
            .select();

          if (!errorApp) {
            await supabase
              .from('greenhouse_reference')
              .update({ resume_saved: true })
              .eq('application_id', payload.application_id)
              .select();
            res.status(200).json(app[0]);
          } else {
            console.log(errorApp);
            res.status(200).json(errorApp);
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
    } else {
      await supabase
        .from('applications')
        .update({ processing_status: 'failed', retry: 2 })
        .eq('application_id', payload.application_id);
      await supabase
        .from('greenhouse_reference')
        .update({ resume_saved: true })
        .eq('application_id', payload.application_id)
        .select();
      return res.status(200).json('Invalid file format');
    }
  } else {
    await supabase
      .from('greenhouse_reference')
      .update({ resume_saved: true })
      .eq('application_id', payload.application_id)
      .select();
    return res.status(400).json('opportunity_id or application_id is missing');
  }
}
