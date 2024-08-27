import { GreenHouseApplicationsAPI } from '../app/api/sync/greenhouse/applications/type';
import { GreenHouseJobsSyncAPI } from '../app/api/sync/greenhouse/jobs/type';
import axios from '../client/axios';
import { supabase } from './supabase/client';

async function syncGreenhouseJob(job_id: string, recruiter_id: string) {
  const tempJobP = supabase
    .from('public_jobs')
    .select('remote_id,remote_sync_time')
    .eq('id', job_id)
    .single()
    .throwOnError();
  const tempKeyP = supabase
    .from('integrations')
    .select('greenhouse_key')
    .eq('recruiter_id', recruiter_id)
    .single()
    .throwOnError();
  const [{ data: job }, { data: key }] = await Promise.all([
    tempJobP,
    tempKeyP,
  ]);
  return axios.call<GreenHouseApplicationsAPI>(
    'GET',
    '/api/sync/greenhouse/applications',
    {
      job_id: job_id,
      recruiter_id: recruiter_id,
      remote_id: Number(job.remote_id),
      key: key.greenhouse_key,
      last_sync: job.remote_sync_time,
    },
  );
}

async function syncGreenhouseJobs(recruiter_id: string) {
  const { greenhouse_key, greenhouse_metadata } = (
    await supabase
      .from('integrations')
      .select('greenhouse_key, greenhouse_metadata')
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data;
  return axios.call<GreenHouseJobsSyncAPI>('GET', '/api/sync/greenhouse/jobs', {
    recruiter_id: recruiter_id,
    key: greenhouse_key,
    last_sync: greenhouse_metadata.last_sync['jobs'] || null,
  });
}
