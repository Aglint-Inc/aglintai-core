/* eslint-disable security/detect-object-injection */
import { createServerClient } from '@supabase/ssr';
import axios from 'axios';

import {
  FilterParameter,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { Database } from '@/src/types/schema';

export const selectJobApplicationQuery = '*, candidates(*), assessment_results(*), candidate_files(id, created_at, candidate_id, file_url, resume_text, resume_json, type)';

export const deleteNewJobApplicationDbAction = async (
  application_id: string,
  supabase: ReturnType<typeof createServerClient<Database>>,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('application_id', application_id)
    .abortSignal(controller.signal);
  return { data: error ? false : true, error };
};

export const newReadNewJobApplicationDbAction = async (
  job_id: string,
  supabase: ReturnType<typeof createServerClient<Database>>,
  status: JobApplicationSections,
  sort: SortParameter,
  range?: {
    start: number;
    end: number;
  } | null,
  search?: string,
  filter?: FilterParameter,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const coordinates = await getBoundingBox(
    filter.location.name,
    filter.location.value,
    filter.location.active,
  );
  const { data, error } = await supabase
    .rpc('job_application_filter_sort', {
      jb_id: job_id,
      j_status: status,

      sort_column_text: sort.parameter,
      is_sort_desc: !sort.ascending,

      min_interview_score:
        status !== JobApplicationSections.NEW && filter.interview_score.active
          ? filter.interview_score.min
          : 0,
      max_interview_score:
        status !== JobApplicationSections.NEW && filter.interview_score.active
          ? filter.interview_score.max
          : 100,
      min_resume_score: filter.resume_score.active
        ? filter.resume_score.min
        : 0,
      max_resume_score: filter.resume_score.active
        ? filter.resume_score.max
        : 100,

      text_search_qry: search || '',

      is_locat_filter_on: filter.location.active,
      max_lat: coordinates?.latitude?.max || null,
      min_lat: coordinates?.latitude?.min || null,
      max_long: coordinates?.longitude?.max || null,
      min_long: coordinates?.longitude?.min || null,
      from_rec_num: range.start,
      end_rec_num: range.end + 1,
    })
    .abortSignal(controller.signal);
  if (error) throw new Error(error.message);
  const safeData = rpcDataFormatter(data);
  return { data: safeData.data, error: null, count: safeData.count };
};

const rpcDataFormatter = (
  unsafeData: Database['public']['Functions']['job_application_filter_sort']['Returns'],
) => {
  const data = unsafeData.reduce((acc, curr) => {
    (curr.job_app as unknown as JobApplication).candidates =
      curr.cand as JobApplication['candidates'];
    acc.push(curr.job_app as unknown as JobApplication);
    return acc;
  }, [] as JobApplication[]);
  const count = unsafeData.length !== 0 ? unsafeData[0]?.total_results || 0 : 0;
  return { data, count };
};

const deg2rad = (degrees: number) => {
  return (Math.PI * degrees) / 180;
};

const rad2deg = (radians: number) => {
  return (180 * radians) / Math.PI;
};

const WGS84EarthRadius = (lat: number) => {
  const WGS84_a = 6378137.0;
  const WGS84_b = 6356752.3;
  const An = WGS84_a * WGS84_a * Math.cos(lat);
  const Bn = WGS84_b * WGS84_b * Math.sin(lat);
  const Ad = WGS84_a * Math.cos(lat);
  const Bd = WGS84_b * Math.sin(lat);
  return Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd));
};

const getLocation = async (address: string) => {
  const locationData = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${
      address?.trim() || ''
    }&key=AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI`,
  );
  const result = (locationData as any)?.data?.results[0];
  if (result?.geometry?.location.lng && result?.geometry?.location.lat)
    return {
      lat: result?.geometry?.location?.lat,
      long: result?.geometry?.location?.lng,
    };
  return { lat: null, long: null };
};
export const getBoundingBox = async (
  name: string,
  range: number,
  active: boolean,
) => {
  if (!active)
    return {
      latitude: {
        min: null,
        max: null,
      },
      longitude: {
        min: null,
        max: null,
      },
    };
  const { lat: latitudeInDegrees, long: longitudeInDegrees } =
    await getLocation(name);
  const halfSideInKm: number = range;
  const lat = deg2rad(latitudeInDegrees);
  const lon = deg2rad(longitudeInDegrees);
  const halfSide = 1000 * halfSideInKm * 0.621371;
  const radius = WGS84EarthRadius(lat);
  const pradius = radius * Math.cos(lat);
  const latMin = lat - halfSide / radius;
  const latMax = lat + halfSide / radius;
  const lonMin = lon - halfSide / pradius;
  const lonMax = lon + halfSide / pradius;
  return {
    latitude: {
      min: rad2deg(latMin),
      max: rad2deg(latMax),
    },
    longitude: {
      min: rad2deg(lonMin),
      max: rad2deg(lonMax),
    },
  };
};

// export const getFilteredQuery = (
//   query: any,
//   filter: FilterParameter[],
//   status: JobApplicationSections,
// ) => {
//   return filter.reduce((acc, curr) => {
//     if (
//       !(
//         curr.parameter === 'interview_score' &&
//         status === JobApplicationSections.NEW
//       )
//     )
//       switch (curr.type) {
//         case 'number':
//           {
//             switch (curr.condition) {
//               case '=':
//                 {
//                   acc = acc.eq(curr.parameter, curr.value);
//                 }
//                 break;
//               case '<>':
//                 {
//                   acc = acc.neq(curr.parameter, curr.value);
//                 }
//                 break;
//               case '>':
//                 {
//                   acc = acc.gt(curr.parameter, curr.value);
//                 }
//                 break;
//               case '>=':
//                 {
//                   acc = acc.gte(curr.parameter, curr.value);
//                 }
//                 break;
//               case '<':
//                 {
//                   acc = acc.lt(curr.parameter, curr.value);
//                 }
//                 break;
//               case '<=':
//                 {
//                   acc = acc.lte(curr.parameter, curr.value);
//                 }
//                 break;
//             }
//           }
//           break;
//         // case 'string':
//         //   {
//         //     switch (curr.parameter) {
//         //       case 'location':
//         //         {
//         //           acc = acc.or(
//         //             `json_resume->basics->location->>city.ilike.%${curr.value}%,or(json_resume->basics->location->>state.ilike.%${curr.value}%),or(json_resume->basics->location->>country.ilike.%${curr.value}%)`,
//         //           );
//         //         }
//         //         break;
//         //     }
//         //   }
//         //   break;
//       }
//     return acc;
//   }, query);
// };

export const upsertNewJobApplicationDbAction = async (
  inputData: Partial<JobApplication>[],
  supabase: ReturnType<typeof createServerClient<Database>>,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { data, error } = await supabase
    .from('job_applications')
    .upsert(inputData as JobApplication[])
    .select(`${selectJobApplicationQuery}`)
    .abortSignal(controller.signal);
  return { data, error };
};
