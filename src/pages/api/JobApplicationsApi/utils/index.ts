/* eslint-disable security/detect-object-injection */
import {
  ApiLogState,
  FilterParameter,
  SortParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { supabase } from '@/src/utils/supabaseClient';

export const deleteNewJobApplicationDbAction = async (
  application_id: string,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { error } = await supabase
    .from('job_applications')
    .delete()
    .eq('application_id', application_id)
    .abortSignal(controller.signal);
  return { data: error ? false : true, error };
};

const getApiStatus = (apiStatus: ApiLogState) => {
  switch (apiStatus) {
    case ApiLogState.SUCCESS:
      return ['success'];
    case ApiLogState.FAILED:
      return ['Failed'];
    case ApiLogState.PROCESSING:
      return ['calculating', 'not started'];
  }
};

export const readNewJobApplicationDbAction = async (
  job_id: string,
  status: JobApplicationSections,
  apiStatus?: ApiLogState,
  range?: {
    start: number;
    end: number;
  } | null,
  sort?: SortParameter,
  filter?: FilterParameter[],
  search?: string,
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);

  let query = supabase
    .from('job_applications')
    .select('*,candidates!inner(*)')
    .eq('job_id', job_id)
    .eq('status', status);

  if (apiStatus) {
    getApiStatus(apiStatus).map((status) => {
      query = query.eq('api_status', status);
    });
  }

  if (sort) {
    const params = {
      ascending: sort.ascending,
      nullsFirst: false,
    };
    if (sort.parameter === 'first_name' || sort.parameter === 'email') {
      query = query
        .order(`candidates(${sort.parameter})`, params)
        .order('application_id', { ascending: true, nullsFirst: false });
    } else {
      query = query
        .order(
          status === JobApplicationSections.NEW
            ? 'resume_score'
            : sort.parameter,
          params,
        )
        .order('application_id', { ascending: true, nullsFirst: false });
    }
  }

  if (filter && filter.length > 0) {
    query = getFilteredQuery(query, filter);
  }

  if (search) {
    query = query.or(
      `email.ilike.%${search}%,or(first_name.ilike.%${search}%),or(last_name.ilike.%${search}%)`,
      { foreignTable: 'candidates' },
    );
  }

  if (range) {
    query = query.range(range.start, range.end);
  }

  query = query.abortSignal(controller.signal);

  const { data, error } = await query;

  return { data, error };
};

const getFilteredQuery = (query: any, filter: FilterParameter[]) => {
  return filter.reduce((acc, curr) => {
    switch (curr.condition) {
      case 'eq':
        {
          acc = acc.eq(curr.parameter, curr.count);
        }
        break;
      case 'neq':
        {
          acc = acc.neq(curr.parameter, curr.count);
        }
        break;
      case 'gt':
        {
          acc = acc.gt(curr.parameter, curr.count);
        }
        break;
      case 'gte':
        {
          acc = acc.gte(curr.parameter, curr.count);
        }
        break;
      case 'lt':
        {
          acc = acc.lt(curr.parameter, curr.count);
        }
        break;
      case 'lte':
        {
          acc = acc.lte(curr.parameter, curr.count);
        }
        break;
    }
    return acc;
  }, query);
};

export const upsertNewJobApplicationDbAction = async (
  inputData: Partial<JobApplication>[],
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 60000);
  const { data, error } = await supabase
    .from('job_applications')
    .upsert(inputData as JobApplication[])
    .select()
    .abortSignal(controller.signal);
  return { data, error };
};
