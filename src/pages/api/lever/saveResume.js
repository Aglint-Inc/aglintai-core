/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

export default async function handler(req, res) {
  const apiKey = 'wjISASRrEo75ixrodaAS5eT8iV4Bv2T2RhNZ3iIUziYsIAC8';
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  let payload = req.body;

  if (payload.opportunity_id) {
    // Supabase credentials
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    let url = `https://api.lever.co/v1/opportunities/${payload.opportunity_id}/resumes`;
    let fileUrl;
    let bucketName = 'resume-job-post';

    try {
      axios
        .get(url, {
          auth: {
            username: apiKey,
            password: '',
          },
        })
        .then(async (response) => {
          fileUrl = response?.data?.data[0]?.file?.downloadUrl;
          if (fileUrl) {
            const responseUrl = await axios.get(fileUrl, {
              responseType: 'arraybuffer', // Request binary data
              auth: {
                username: apiKey,
                password: '',
              },
            });

            if (responseUrl.status !== 200) {
              throw new Error(
                `Failed to fetch file from URL: ${responseUrl.statusText}`,
              );
            }

            // Upload the file to Supabase Storage
            const { data, error: uploadError } = await supabase.storage
              .from(bucketName)
              .upload(
                `public/${
                  payload.application_id + response.data.data[0].file.ext
                }`,
                responseUrl.data,
                {
                  contentType: response.data.data[0].file.ext,
                  cacheControl: '3600',
                  // Overwrite file if it exist
                  upsert: true,
                },
              );

            if (uploadError) {
              throw uploadError;
            }
            const fileLink = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${data.path}`;
            if (!uploadError) {
              // Get the link to the uploaded file
              await supabase
                .from('job_applications')
                .update({ resume: fileLink })
                .eq('application_id', payload.application_id);
            }

            return res.status(200).json({ fileLink });
          } else {
            console.log('no resume url from lever');
            res.status(400).send('no resume url from lever');
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
      // Fetch the file from the URL
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  } else {
    console.log('opportunity_id is missing');
    res.status(400).json('opportunity_id is missing');
  }
}
