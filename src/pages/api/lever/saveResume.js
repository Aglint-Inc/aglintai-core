/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import OpenAI from 'openai';

import { splitFullName } from '@/src/components/JobsDashboard/AddJobWithIntegrations/utils';

const apiKey = 'wjISASRrEo75ixrodaAS5eT8iV4Bv2T2RhNZ3iIUziYsIAC8';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const TIMEOUT_MS = 30000; //timeout for openai calls
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

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

              //first we save previous and then go for openai calls. if there are work experience in resume then only generate resume skills overview etc and add to json_resume
              if (jsonResume?.work?.length > 0) {
                const { data: job, error: errorJob } = await supabase
                  .from('public_jobs')
                  .select()
                  .eq('id', application[0].job_id);

                if (!errorJob) {
                  const jd_json = {
                    job_title: job[0].job_title,
                    description: job[0].description,
                    skills: job[0].skills,
                  };

                  try {
                    const responsePromise = generateResume(jsonResume, jd_json);
                    const response = await Promise.race([
                      responsePromise,
                      new Promise((_, reject) =>
                        setTimeout(() => reject('Timeout'), TIMEOUT_MS),
                      ),
                    ]);
                    if (response && response !== 'Timeout') {
                      // Update json_resume with the response by spreading
                      await supabase
                        .from('job_applications')
                        .update({
                          json_resume: { ...jsonResume, ...response },
                          resume: fileLink,
                          resume_text:
                            jsonResume?.work?.length > 0 ? 'Lever' : null,
                        })
                        .eq('application_id', payload.application_id);

                      return res.status(200).json({
                        resume: fileLink,
                        json_resume: { ...jsonResume, ...response },
                      });
                    } else {
                      //update json_resume with only resume_json if openai call fails
                      await updatedJobApplication(
                        {
                          resume: fileLink,
                          json_resume:
                            jsonResume?.work?.length > 0 ? jsonResume : null,
                          resume_text:
                            jsonResume?.work?.length > 0 ? 'Lever' : null,
                        },
                        payload.application_id,
                      );
                    }
                  } catch (error) {
                    //update json_resume with only resume_json if any error in openai call
                    await updatedJobApplication(
                      {
                        resume: fileLink,
                        json_resume:
                          jsonResume?.work?.length > 0 ? jsonResume : null,
                        resume_text:
                          jsonResume?.work?.length > 0 ? 'Lever' : null,
                      },
                      payload.application_id,
                    );
                  }
                  //we need to update json_resume with response by spreading
                }
              }
            }
            return res.status(200).json({
              resume: fileLink,
              json_resume: jsonResume?.work?.length > 0 ? jsonResume : null,
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

const updatedJobApplication = async (payload, application_id) => {
  const { data, error } = await supabase
    .from('job_applications')
    .update(payload)
    .eq('application_id', application_id);
  if (!error) {
    return { data: data, error: null };
  } else {
    return { data: null, error: error };
  }
};

async function transformers(jsonData, opportunity_id) {
  // Initialize the output structure
  const outputData = {
    positions: [],
    basics: {
      email: '',
      currentJobtitle: '',
      phone: '',
      lastName: '',
      location: '',
      social: [],
      firstName: '',
      currentCompany: '',
    },
    schools: [],
  };

  // Transform work experience data
  outputData.work = jsonData?.positions?.map((position) => ({
    end: {
      year: position?.end?.year || null,
      month: position?.end?.month || null,
    },
    org: position.org,
    start: {
      year: position.start.year || null,
      month: position.start.month || null,
    },
    title: position.title,
    summary: position.summary,
    location: position.location,
  }));

  outputData.schools = jsonData?.schools?.map((school) => ({
    institution: school?.org,
    end: {
      year: school?.end?.year || null,
      month: school?.end?.month || null,
    },
    gpa: school?.gpa,
    field: school?.field,
    start: {
      year: school?.start?.year || null,
      month: school?.start?.month || null,
    },
    degree: school?.degree,
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
    currentJobTitle: jsonData?.positions[0]?.title,
    email: basics?.emails[0],
    phone: basics?.phones[0].value || '',
    lastName: splitFullName(basics?.name).lastName,
    currentCompany: basics.headline || '',
    location: basics.location || '',
    social: [],
    firstName: splitFullName(basics?.name).firstName,
  };

  // Output the transformed data
  return outputData;
}

const generateResume = async (resume, jd_json) => {
  const response = openai.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    messages: [
      {
        role: 'system',
        content: `your a resume and job describtion analyzer and generate result in given format :
          {
            "skills": string[] ("analyse only resume_json and extract skills from his previous work experience in resume_json),
            "overview": string ("generate a 2 line overview by analysing the resume_json"),
            "strength": string ("compare resume_json and job_description_json and generate strengths for the resume provided assuming resume_json applied for the job provided."),
            "weakness": string ("compare the resume_json and job_description_json and generate weaknesses for the resume provided assuming resume_json applied for the job provided."),
          }
          dont add any placeholder data in result`,
      },
      {
        role: 'user',
        content: `here's the resume_json: ${JSON.stringify(
          resume,
        )} and job_description_json: ${JSON.stringify(jd_json)}`,
      },
    ],
    temperature: 0.8,
    top_p: 1,
    seed: 87654321,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: 'json_object',
    },
  });
  const responseB = await response;

  const result = JSON.parse(responseB.choices[0].message.content || '{}');

  return result;
};
