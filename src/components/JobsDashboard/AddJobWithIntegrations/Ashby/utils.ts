import axios from 'axios';

import {
  GreenhouseRefDbType,
  GreenhouseType,
  RecruiterDB,
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { AshbyApplication, ExtendedJobAshby, JobAshby } from './types';
import { POSTED_BY } from '../utils';
import { JobType } from '../../types';

export const fetchAllCandidates = async (
  apiKey: string,
): Promise<AshbyApplication[]> => {
  let allCandidates = [];
  let hasMore = true;
  let page;

  while (hasMore) {
    try {
      const response = await axios.post('/api/ashby/getCandidates', {
        page: page,
        apiKey: apiKey,
      });

      if (response.data && response.data.success) {
        allCandidates = allCandidates.concat(response.data.results);
        if (response.data.moreDataAvailable) {
          hasMore = true;
          page = response.data.nextCursor;
        } else {
          hasMore = false;
        }
      } else {
        hasMore = false; // Exit the loop if there are no more records
      }
    } catch (error) {
      hasMore = false; // Exit the loop in case of an error
    }
  }

  return allCandidates;
};

export const fetchAllJobs = async (apiKey: string): Promise<JobAshby[]> => {
  //pagination need to done
  let allJobs = [];

  try {
    const response = await axios.post('/api/ashby/getPostings', {
      apiKey: apiKey,
      isInitial: false,
    });

    if (response.status == 200 && response.data?.results?.length > 0) {
      allJobs = allJobs.concat(response.data?.results);
    }
  } catch (error) {
    //
  }

  return allJobs;
};

export const createJobObject = async (
  selectedPostings: ExtendedJobAshby[],
  recruiter: RecruiterDB,
): Promise<Partial<JobType> & { recruiter_id: string }[]> => {
  const dbJobs = selectedPostings.map((post) => {
    return {
      draft: {
        id: post.public_job_id,
        location: post.location,
        job_title: post.title,
        description: post.description,
        department: post.departmentName,
        email_template: recruiter.email_template,
        recruiter_id: recruiter.id,
        posted_by: POSTED_BY.ASHBY,
        job_type: post.employmentType == 'Contract' ? 'contract' : 'fulltime',
        workplace_type: 'onsite',
        company: recruiter.name,
        skills: [],
        status: 'draft',
        parameter_weights: {
          skills: 0,
          education: 0,
          experience: 0,
        },
        video_assessment: false,
      },
      location: post.location,
      job_title: post.title,
      recruiter_id: recruiter.id,
      posted_by: POSTED_BY.ASHBY,
      status: 'draft',
      id: post.public_job_id,
    };
  });
  return dbJobs;
};

export function getLeverStatusColor(state: string): string {
  return state == 'published'
    ? '#228F67'
    : state == 'closed'
      ? '#D93F4C'
      : state == 'internal'
        ? '#ED8F1C'
        : '#d93f4c';
}

export const createReference = async (
  reference: GreenhouseType[],
): Promise<GreenhouseRefDbType[] | undefined> => {
  const { data, error } = await supabase
    .from('greenhouse_reference')
    .insert(reference)
    .select();

  if (error) {
    toast.error(
      'Sorry unable to import. Please try again later or contact support.',
    );
    return undefined;
  } else {
    return data;
  }
};
