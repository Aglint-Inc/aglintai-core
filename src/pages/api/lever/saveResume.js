/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

import { splitFullName } from '@/src/components/JobsDashboard/AddJobWithIntegrations/utils';

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
    let jsonResume = null;

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

            // if resume is processed then only transform it
            if (response?.data?.data[0]?.file?.status == 'processed') {
              jsonResume = await transformers(
                response?.data?.data[0]?.parsedData,
                payload.opportunity_id,
              );
            }

            let extension = responseUrl.headers['content-type'];
            // Upload the file to Supabase Storage
            const { data, error: uploadError } = await supabase.storage
              .from(bucketName)
              .upload(
                `public/${
                  payload.application_id + response.data.data[0].file.ext
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
              const { data: application, error } = await supabase
                .from('job_applications')
                .select()
                .eq('application_id', payload.application_id);

              if (!error) {
                await supabase
                  .from('candidates')
                  .update({ resume: fileLink, json_resume: jsonResume })
                  .eq('id', application[0].candidate_id);
              } else {
                console.log('error while updating candidate');
                res.status(400).send('error while updating candidate');
              }
            }

            return res
              .status(200)
              .json({ resume: fileLink, json_resume: jsonResume });
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

async function transformers(jsonData, opportunity_id) {
  // Initialize the output structure
  const outputData = {
    work: [],
    basics: {
      url: '',
      email: '',
      image: '',
      label: '',
      phone: '',
      summary: '',
      lastName: '',
      location: {
        city: '',
        region: '',
        address: '',
        country: '',
        postalCode: '',
      },
      profiles: [],
      firstName: '',
    },
    education: [],
  };

  // Transform work experience data
  outputData.work = jsonData?.positions?.map((position) => ({
    url: '',
    name: position.org,
    skills: [],
    endDate: position?.end
      ? `${getMonthName(position?.end?.month)} ${position?.end?.year}`
      : 'Present',
    description: position.summary,
    position: position.title,
    startDate: position?.start
      ? `${getMonthName(position.start.month)} ${position.start.year}`
      : '',
    highlights: [],
  }));

  outputData.education = jsonData?.schools?.map((school) => ({
    url: '',
    area: school?.field,
    score: '',
    courses: [],
    endDate: '',
    startDate: '',
    studyType: school?.degree,
    institution: school?.org,
  }));

  //get candidate basic details from lever api
  let url = `https://api.lever.co/v1/opportunities/${opportunity_id}`;

  const basicResponse = await axios.get(url, {
    auth: {
      username: apiKey,
      password: '',
    },
  });

  let basics = basicResponse.data.data;

  outputData.basics = {
    url: '',
    email: basics?.emails[0],
    image: '',
    label: '',
    phone: basics?.phones[0].value || '',
    summary: '',
    lastName: splitFullName(basics?.name).lastName,
    currentCompany: basics.headline || '',
    fulllocation: basics.location || '',
    location: {
      city: '',
      region: '',
      address: '',
      country: '',
      postalCode: '',
    },
    profiles: [],
    firstName: splitFullName(basics?.name).firstName,
  };

  // Output the transformed data
  return outputData;
}

function getMonthName(monthNumber) {
  if (monthNumber) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthNumber - 1];
  } else {
    return '';
  }
}
