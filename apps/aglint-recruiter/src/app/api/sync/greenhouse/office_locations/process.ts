import { DatabaseTableInsert } from '@aglint/shared-types';

import { searchExactLocation } from '@/src/utils/externalApi/google/geoLocation';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export async function syncOfficeLocations(
  recruiter_id: string,
  decryptKey: string,
) {
  const office_locations = await getGreenhouseOfficeLocations(decryptKey);
  return await saveOfficeLocations(office_locations, recruiter_id);
}

// eslint-disable-next-line no-unused-vars
export async function getGreenhouseOfficeLocations(key: string) {
  // const res = await axios.get<GreenhouseOfficesAPI>('', {
  //   auth: {
  //     username: key,
  //     password: '',
  //   },
  // });
  // if (res.status !== 200) {
  //   throw new Error(
  //     // @ts-ignore
  //     res.data.message || 'Greenhouse Office Location API Failed!',
  //   );
  // }
  // return res.data;
  return dummyData;
}

export type GreenhouseOfficesAPI = {
  id: number;
  name: string;
  location: Location;
  primary_contact_user_id: number;
  parent_id: number;
  parent_office_external_id: string;
  child_ids: number[];
  child_office_external_ids: string[];
  external_id: string;
}[];

type Location = {
  name: string;
};

const dummyData: GreenhouseOfficesAPI = [
  {
    id: 50891,
    name: 'Utica',
    location: {
      name: 'Utica, New York, United States',
    },
    primary_contact_user_id: 336474,
    parent_id: 47012,
    parent_office_external_id: 'parent-1',
    child_ids: [],
    child_office_external_ids: [],
    external_id: '45647',
  },
  {
    id: 47012,
    name: 'New York',
    location: {
      name: 'New York, United States',
    },
    primary_contact_user_id: 485538,
    parent_id: 50849,
    parent_office_external_id: 'parent-2',
    child_ids: [50891, 50852],
    child_office_external_ids: ['child-office-1', ''],
    external_id: '12345',
  },
  {
    id: 50852,
    name: 'New York City',
    location: {
      name: 'New York, New York, United States',
    },
    primary_contact_user_id: 676259,
    parent_id: 47012,
    parent_office_external_id: 'parent-1',
    child_ids: [],
    child_office_external_ids: [],
    external_id: '67890',
  },
];
export async function saveOfficeLocations(
  office_locations: Awaited<ReturnType<typeof getGreenhouseOfficeLocations>>,
  recruiter_id: string,
) {
  const temp_OfficeLocation: DatabaseTableInsert['office_locations'][] = [];
  for (let office_location of office_locations) {
    const geoLocation = await searchExactLocation(
      office_locations[0].location.name,
      { timeZone: true },
    );
    temp_OfficeLocation.push({
      name: office_location.name,
      line1: office_location.location.name,
      recruiter_id,
      city: geoLocation.city,
      country: geoLocation.country,
      is_headquarter: false,
      timezone: geoLocation.timeZone,
      region: geoLocation.state,
      zipcode: '',
      remote_id: String(office_location.id),
    });
  }
  return (
    await supabaseAdmin
      .from('office_locations')
      .upsert(temp_OfficeLocation, { onConflict: 'remote_id' })
      .select()
      .throwOnError()
  ).data;
}

export async function getOfficeLocations(recruiter_id: string) {
  return (
    await supabaseAdmin
      .from('office_locations')
      .select('id,remote_id')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data.reduce(
    (acc, curr) => {
      acc[curr.remote_id] = curr.id;
      return acc;
    },
    {} as { [key: string]: number },
  );
}
