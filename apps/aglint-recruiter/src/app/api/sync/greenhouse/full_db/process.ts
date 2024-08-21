import axios from "axios";

import { GreenHouseJobsSyncAPI } from "../jobs/type";
import { GreenHouseUserSyncAPI } from "../user/type";

const baseUrl = process.env.NEXT_PUBLIC_HOST_NAME;
if (baseUrl) {
  new Error('NEXT_PUBLIC_HOST_NAME is not defined');
}
export async function syncGreenhouseUsers(
  recruiter_id: string,
  key: string,
  last_sync?: string,
) {
  const res = await axios.post<GreenHouseUserSyncAPI>(
    `${baseUrl}/api/sync/greenhouse/user`,
    {
      recruiter_id,
      key,
      last_sync,
    },
  );
  if (res.status !== 200) {
    // @ts-ignore
    throw new Error(res.data.message || 'Greenhouse users sync api failed!');
  }
  return res.data;
}

export async function syncGreenhouseJobs(
  recruiter_id: string,
  key: string,
  last_sync?: string,
) {
  const res = await axios.post<GreenHouseJobsSyncAPI>(
    `${baseUrl}/api/sync/greenhouse/jobs`,
    {
      recruiter_id,
      key,
      last_sync,
    },
  );
  if (res.status !== 200) {
    // @ts-ignore
    throw new Error(res.data.message || 'Greenhouse users sync api failed!');
  }
  return res.data;
}
