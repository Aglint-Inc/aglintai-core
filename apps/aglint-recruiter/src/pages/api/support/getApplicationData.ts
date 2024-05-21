import { CandidateType, JobApplicationType } from '@aglint/shared-types';
// import axios from 'axios';
import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient<DB>(supabaseUrl, supabaseAnonKey);
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { application_id } = req.body;
      if (!application_id)
        return res.status(400).json({ error: 'Bad Request!' });
      const result = await getApplication(application_id);
      return res.status(200).json({ data: result, error: null });
      //   const access_token = req.cookies['access_token'];
      //   const {
      //     data: { user },
      //   } = await supabaseAdmin.auth.getUser(access_token);
    } catch (e: any) {
      return res
        .status(e.statusCode || 500)
        .json({ message: e.raw?.message || 'Server error!' });
    }
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
};
export default handler;
const getApplication = async (id: any) => {
  try {
    const applicationData = await supabase
      .from('applications')
      .select()
      .eq('id', id)
      .single()
      .then(({ error, data }) => {
        if (error) throw new Error(error.message);
        return data;
      })
      // @ts-ignore
      .catch(() => {
        throw new Error('Application data not found.');
      });
    // console.log(applicationData);
    const candidate = await supabase
      .from('candidates')
      .select()
      .eq('id', applicationData.candidate_id)
      .single()
      .then(({ data, error }) => {
        if (error) throw new Error(error.message);
        if (data) return data;
      });
    const tempData = candidate
      ? { ...applicationData, ...candidate }
      : applicationData;
    // @ts-ignore
    tempData.jobDetails = await getJobTitle(tempData.job_id);
    // @ts-ignore
    if (tempData.jobDetails?.recruiter_id) {
      // @ts-ignore
      tempData.companyDetails = await getCompanyDetails(
        // @ts-ignore
        tempData.jobDetails.recruiter_id,
      );
    }
    return tempData as unknown as JobApplicationType &
      CandidateType & {
        jobDetails: {
          company: string;
          job_title: string;
          recruiter_id: string;
        };
        companyDetails: {
          name: string;
          logo: string;
        };
      };
  } catch (e) {
    throw new Error(e.message);
  }
};
const getCompanyDetails = async (id: string) => {
  const { data, error } = await supabase
    .from('recruiter')
    .select('name,logo')
    .eq('id', id);
  if (!error && data.length) {
    return data[0] as {
      name: string;
      logo: string;
    };
  }
  return null;
};
const getJobTitle = async (jobId: string) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select(' job_title, company, recruiter_id ')
    .eq('id', jobId);
  if (!error && data.length) {
    return data[0] as {
      company: string;
      job_title: string;
      recruiter_id: string;
    };
  }

  return null;
};
