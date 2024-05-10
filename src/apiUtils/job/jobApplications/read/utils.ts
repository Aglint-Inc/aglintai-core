/* eslint-disable security/detect-object-injection */
import { createServerClient } from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import axios from 'axios';

import {
  candidateEmailValidity,
  FilterParameter,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { Database } from '@/src/types/schema';

import { ReadJobApplicationApi } from '../../../../pages/api/job/jobApplications/read';

export const selectJobApplicationQuery =
  '*, candidates(*), assessment_results(*), candidate_files(id, created_at, candidate_id, file_url, resume_text, resume_json, type, overall_interview_score)';

export const handleRead = async (
  sections: ReadJobApplicationApi['request']['sections'],
  job_id: ReadJobApplicationApi['request']['job_id'],
  supabase: ReturnType<typeof createServerClient<Database>>,
  ranges?: ReadJobApplicationApi['request']['ranges'],
  sort?: ReadJobApplicationApi['request']['sort'],
  filter?: ReadJobApplicationApi['request']['filter'],
  search?: ReadJobApplicationApi['request']['search'],
) => {
  const safeSections = [...new Set(sections.filter((s) => s))];
  const promises = await createMultiPromise(
    safeSections,
    job_id,
    supabase,
    ranges ?? null,
    sort ?? null,
    filter ?? null,
    search ?? null,
  );
  const responses = await Promise.allSettled([...promises]);
  const result = await handleMultiPromiseValidation(responses, safeSections);
  return result;
};

const createMultiPromise = (
  sections: ReadJobApplicationApi['request']['sections'],
  job_id: ReadJobApplicationApi['request']['job_id'],
  supabase: any,
  ranges?: ReadJobApplicationApi['request']['ranges'],
  sort?: ReadJobApplicationApi['request']['sort'],
  filter?: ReadJobApplicationApi['request']['filter'],
  search?: ReadJobApplicationApi['request']['search'],
) => {
  return sections.map((section) =>
    newReadNewJobApplicationDbAction(
      job_id,
      supabase,
      section,
      sort,
      ranges[section] ?? null,
      search,
      filter,
    ),
  );
};

const handleSinglePromiseValidation = (
  // eslint-disable-next-line no-undef
  responses: PromiseSettledResult<{
    data: JobApplication[];
    error: PostgrestError;
    filteredCount: number;
    unFilteredCount: number;
  }>,
  status: JobApplicationSections,
) => {
  if (responses.status === 'fulfilled')
    return {
      data: { [status]: responses.value.data },
      error: null,
      filteredCount: { [status]: responses.value.filteredCount },
      unFilteredCount: { [status]: responses.value.unFilteredCount },
    };
  return {
    data: null,
    error: { [status]: responses.reason.message },
    filteredCount: null,
    unFilteredCount: null,
  };
};

const handleMultiPromiseValidation = (
  // eslint-disable-next-line no-undef
  responses: PromiseSettledResult<{
    data: JobApplication[];
    error: PostgrestError;
    filteredCount: number;
    unFilteredCount: number;
  }>[],
  sections: ReadJobApplicationApi['request']['sections'],
) => {
  const response = sections.reduce(
    (acc, curr, i) => {
      const { data, error, filteredCount, unFilteredCount } =
        handleSinglePromiseValidation(
          responses[i],
          curr as JobApplicationSections,
        );
      if (data && !error)
        return {
          ...acc,
          data: {
            ...acc.data,
            ...data,
          },
          filteredCount: {
            ...acc.filteredCount,
            ...filteredCount,
          },
          unFilteredCount: {
            ...acc.unFilteredCount,
            ...unFilteredCount,
          },
        };
      return {
        ...acc,
        error: {
          ...acc.error,
          ...(error || { message: 'Data returned is null' }),
        },
      };
    },
    {
      data: null,
      error: null,
      filteredCount: null,
      unFilteredCount: null,
    },
  ) as {
    data: {
      // eslint-disable-next-line no-unused-vars
      [key in JobApplicationSections]: JobApplication[];
    };
    error: PostgrestError;
    filteredCount: {
      // eslint-disable-next-line no-unused-vars
      [key in JobApplicationSections]: number;
    };
    unFilteredCount: {
      // eslint-disable-next-line no-unused-vars
      [key in JobApplicationSections]: number;
    };
  };
  if (response.error !== null) response.data = null;
  return response;
};

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
  const response = await Promise.allSettled([
    readNewJobApplicationDbAction(
      job_id,
      supabase,
      status,
      sort,
      range,
      search,
      filter,
    ),
    supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('job_id', job_id)
      .eq('status', status),
  ]);
  if (response[0].status === 'rejected') {
    throw new Error(response[0].reason);
  }
  if (response[1].status === 'rejected') {
    throw new Error(response[1].reason);
  }
  if (response[1].value.error || response[1].value.count === null) {
    throw new Error('Count function failure');
  }
  const safeData = response[0].value;
  return {
    data: safeData.data,
    error: null,
    filteredCount: safeData.filteredCount,
    unFilteredCount: response[1].value.count,
  };
};

export const readNewJobApplicationDbAction = async (
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
  );
  // console.log(searchFormatter(search));
  const { data, error } = await supabase
    .rpc('job_application_filter_sort', {
      jb_id: job_id,
      j_status: status,
      sort_column_text: sort.parameter,
      is_sort_desc: !sort.ascending,
      min_interview_score:
        status !== JobApplicationSections.NEW ? filter.interview_score.min : 0,
      max_interview_score:
        status !== JobApplicationSections.NEW
          ? filter.interview_score.max
          : 100,
      min_resume_score:
        filter.overall_score.min === 0 ? -1 : filter.overall_score.min,
      max_resume_score: filter.overall_score.max,
      text_search_qry: searchFormatter(search),
      is_locat_filter_on: locationValidity(filter?.location?.name ?? null),
      max_lat: coordinates?.latitude?.max ?? null,
      min_lat: coordinates?.latitude?.min ?? null,
      max_long: coordinates?.longitude?.max ?? null,
      min_long: coordinates?.longitude?.min ?? null,
      from_rec_num: range?.start ?? null,
      end_rec_num: range?.end + 1 ?? null,
    })
    .abortSignal(controller.signal);
  if (error) throw new Error(`RPC function failure : ${error.message}`);
  const safeData = rpcDataFormatter(data);
  return {
    data: safeData.data,
    filteredCount: safeData.filteredCount,
  };
};

const rpcDataFormatter = (
  unsafeData: Database['public']['Functions']['job_application_filter_sort']['Returns'],
) => {
  const data = unsafeData.reduce((acc, curr) => {
    (curr.job_app as unknown as JobApplication).interview_session_meetings =
      curr.interview_session_meetings as unknown as JobApplication['interview_session_meetings'];
    (curr.job_app as unknown as JobApplication).schedule =
      curr.schedule as unknown as JobApplication['schedule'];
    (curr.job_app as unknown as JobApplication).candidates =
      curr.cand as JobApplication['candidates'];
    (curr.job_app as unknown as JobApplication).assessment_results =
      curr.assres as JobApplication['assessment_results'];
    (curr.job_app as unknown as JobApplication).candidate_files =
      curr.candfiles as JobApplication['candidate_files'];
    (curr.job_app as unknown as JobApplication).emailValidity =
      candidateEmailValidity(
        (curr.cand as unknown as JobApplication['candidates']).email,
        (curr.cand as unknown as JobApplication['candidates']).id,
      );
    acc.push(curr.job_app as unknown as JobApplication);
    return acc;
  }, [] as JobApplication[]);
  const filteredCount =
    unsafeData.length !== 0 ? unsafeData[0]?.fil_res || 0 : 0;
  return { data, filteredCount };
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
const locationValidity = (name: string) => {
  if (name && name.trim() !== '') return true;
  return false;
};
const searchFormatter = (search: string) => {
  if (search && search.trim() !== '')
    return search.trim().replace(/ +/g, ' | ');
  return '';
};
export const getBoundingBox = async (name: string, range: number) => {
  if (!locationValidity(name))
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

export const upsertNewJobApplicationDbAction = async (
  inputData: Partial<JobApplication>[],
  supabase: ReturnType<typeof createServerClient<Database>>,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { error } = await supabase
    .from('applications')
    .upsert(inputData as JobApplication[])
    .abortSignal(controller.signal);
  if (error) throw new Error(error.message);
};
