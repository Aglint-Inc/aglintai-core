import {
  GreenhouseRefDbType,
  GreenhouseType,
  RecruiterDB,
} from '@aglint/shared-types';
import axios from 'axios';

import { hashCode } from '@/src/context/JobDashboard/hooks';
import { JobInsert } from '@/src/queries/job/types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { POSTED_BY } from '../utils';
import { AshbyApplication, ExtendedJobAshby, JobAshby } from './types';

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
): Promise<JobInsert[]> => {
  const dbJobs = selectedPostings.map((post) => {
    return {
      draft: {
        jd_json: {
          educations: [],
          level: 'Mid-level',
          rolesResponsibilities: [],
          skills: [],
          title: post.title,
        },
        location: post.location,
        job_title: post.title,
        description: post.description,
        department: recruiter?.departments?.[0] ?? null,
        job_type: post.employmentType == 'Contract' ? 'contract' : 'full time',
        workplace_type: 'on site',
        company: recruiter.name,
      },
      description_hash: hashCode(post?.description ?? ''),
      location: post.location,
      job_title: post.title,
      recruiter_id: recruiter.id,
      posted_by: POSTED_BY.ASHBY,
      status: 'draft',
      id: post.public_job_id,
      description: post.description,
      department: recruiter?.departments?.[0] ?? null,
      email_template: recruiter.email_template,
      job_type: post.employmentType == 'Contract' ? 'contract' : 'full time',
      workplace_type: 'on site',
      company: recruiter.name,
      scoring_criteria_loading: true,
      skills: [],
      parameter_weights: {
        skills: 0,
        education: 0,
        experience: 0,
      },
      video_assessment: false,
    } as JobInsert;
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
