import axios from 'axios';

import { JobGreenhouse } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/GreenhouseModal/types';
import { decrypt } from '@/src/pages/api/decryptApiKey';
import { SupabaseClientType } from '@/src/utils/supabase/supabaseAdmin';

import { JobStageData } from './dummy.data';
import { GreenhouseCandidateAPI, GreenhouseJobStagesAPI } from './types';

const decryptKey = process.env.ENCRYPTION_KEY!;
if (!decryptKey) {
  throw new Error('ENCRYPTION_KEY is not defined');
}
export function getDecryptKey(key: string) {
  return decrypt(key, decryptKey);
}

export async function getGreenhouseKey(
  supabaseAdmin: SupabaseClientType,
  recruiter_id: string,
) {
  return (
    await supabaseAdmin
      .from('integrations')
      .select('greenhouse_key')
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data.greenhouse_key;
}

export async function getLastSync(
  supabaseAdmin: SupabaseClientType,
  recruiter_id: string,
) {
  const last_sync =
    (
      await supabaseAdmin
        .from('integrations')
        .select('greenhouse_metadata')
        .eq('recruiter_id', recruiter_id)
        .single()
        .throwOnError()
    ).data?.greenhouse_metadata?.last_sync || {};
  return last_sync;
}

export async function setLastSync(
  supabaseAdmin: SupabaseClientType,
  recruiter_id: string,
  lastSync: Record<string, string>,
) {
  const temp_meta = (
    await supabaseAdmin
      .from('integrations')
      .select('greenhouse_metadata')
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data?.greenhouse_metadata || { last_sync: null, options: null };
  temp_meta.last_sync = { ...temp_meta.last_sync, ...lastSync };
  await supabaseAdmin
    .from('integrations')
    .update({ greenhouse_metadata: temp_meta })
    .eq('recruiter_id', recruiter_id)
    .throwOnError();
  return temp_meta.last_sync;
}

export async function getGreenhouseJobs(key: string, last_sync?: string) {
  let url =
    'https://harvest.greenhouse.io/v1/job_posts?per_page=2&page=1&live=true&active=true';
  if (last_sync) {
    url += `?created_after=${last_sync}`;
  }
  const res = await axios.get<JobGreenhouse[]>(url, {
    auth: {
      username: key,
      password: '',
    },
  });
  if (res.status !== 200) {
    // @ts-ignore
    throw new Error(res.data?.message || 'Greenhouse API Failed!');
  }
  return res.data;
  // return [];
}

export async function getGreenhouseJobPlan(key: string, job_id: number) {
  key;
  job_id;
  // const res = await axios.get<GreenhouseJobStagesAPI>(
  //   `https://harvest.greenhouse.io/v1/jobs/${job_id}/stages`,
  //   {
  //     auth: {
  //       username: key,
  //       password: '',
  //     },
  //   },
  // );

  // if (res.status === 200) {
  //   return res.data;
  // }
  // // @ts-ignore
  // throw new Error(res.data?.message || 'Greenhouse API Failed!');
  const data = JobStageData;
  return data
    .map((item) => {
      item.interviews = item.interviews.filter(
        (interview) => interview.schedulable,
      );
      return item;
    })
    .filter((item) => item.interviews.length) as GreenhouseJobStagesAPI;
}

export async function getGreenhouseCandidates(
  key: string,
  data: { ats_job_id: number; page: number; last_sync?: string },
) {
  const temp_url = `https://harvest.greenhouse.io/v1/candidates?job_id=${data.ats_job_id}&per_page=500&page=${data.page}`;
  let url = temp_url;
  if (data.last_sync) {
    url = temp_url + `?created_after=${data.last_sync}`;
  }
  const data1 = await getGreenhouseCandidatesAPI(key, url);
  let data2 = [] as typeof data1;
  if (data.last_sync) {
    url = temp_url + `?updated_after=${data.last_sync}`;
    data2 = await getGreenhouseCandidatesAPI(key, url);
  }
  return [...data1, ...data2];
}

async function getGreenhouseCandidatesAPI(key: string, url: string) {
  const res = await axios.get<GreenhouseCandidateAPI[]>(url, {
    auth: {
      username: key,
      password: '',
    },
  });
  if (res.status !== 200) {
    // @ts-ignore
    throw new Error(res.data?.message || 'Greenhouse Candidate API Failed!');
  }

  return res.data;
}

/**
 * Splits an array into smaller chunks of a specified size.
 *
 * @param {Array<T extends unknown>[]} flatArray - The array to be chunked.
 * @param {number} i - The size of each chunk.
 * @throws {Error} If the chunk size is less than or equal to 0.
 * @return {Array<Array<T extends unknown>>[][]} An array of smaller arrays, each with a size of `i`.
 * @example
 * chunkArray([1, 2, 3, 4, 5], 2) // returns [[1, 2], [3, 4], [5]]
 */
export function chunkArray<T extends unknown>(flatArray: T[], i: number) {
  if (i < 1) throw new Error('Chunk size must be greater than 0');

  let result = [] as T[][];
  for (let j = 0; j < flatArray.length; j += i) {
    result.push(flatArray.slice(j, j + i));
  }
  return result;
}
