import { DatabaseTableInsert, DB } from '@aglint/shared-types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import axios from 'axios';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';
import { searchExactLocation } from '@/src/utils/externalApi/google/geoLocation';

import { getGreenhouseKey } from '../../utils';
import { GreenhouseOfficeLocationsAPI } from './type';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);
export function GET(request: NextRequest) {
  const method = routeHandlerFactory<GreenhouseOfficeLocationsAPI>(
    'GET',
    request,
  );
  return method(async ({ requesterDetails }) => {
    const { recruiter_id } = requesterDetails;
    const key = await getGreenhouseKey(supabase, recruiter_id);
    const office_locations = await getGreenhouseOfficeLocations(key);
    return await saveOfficeLocations(supabase, office_locations, recruiter_id);
  }, []);
}

// eslint-disable-next-line no-unused-vars
async function getGreenhouseOfficeLocations(key: string) {
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
async function saveOfficeLocations(
  supabase: SupabaseClient<DB>,
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
    await supabase
      .from('office_locations')
      .insert(temp_OfficeLocation)
      .select()
      .throwOnError()
  ).data;
}
