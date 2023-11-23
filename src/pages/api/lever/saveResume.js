/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const apiKey = 'wjISASRrEo75ixrodaAS5eT8iV4Bv2T2RhNZ3iIUziYsIAC8';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  let payload = req.body;

  if (payload.opportunity_id && payload.application_id) {
    // Supabase credentials

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
          //run only if we get resume url
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

            let extension = responseUrl.headers['content-type'];
            // Upload the file to Supabase Storage
            const { data: application, error: errorApp } = await supabase
              .from('job_applications')
              .select()
              .eq('application_id', payload.application_id);
            if (errorApp) {
              console.log('no application found');
              res.status(400).send('no application found');
              return;
            }
            const { data: cand } = await supabase
              .from('candidates')
              .select()
              .eq('id', application[0].candidate_id);
            const { data, error: uploadError } = await supabase.storage
              .from(bucketName)
              .upload(
                `public/${cand[0].id}/${
                  application[0].job_id + response.data.data[0].file.ext
                }`,
                responseUrl.data,
                {
                  contentType: extension,
                  cacheControl: '3600',
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
                .update({
                  resume: fileLink,
                })
                .eq('application_id', payload.application_id);

              //first we save previous and then go for openai calls. if there are work experience in resume then only generate resume skills overview etc and add to json_resume
            }
            return res.status(200).json({
              resume: fileLink,
            });
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
    res.status(400).json('opportunity_id or application_id is missing');
  }
}
