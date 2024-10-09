import { type DatabaseTableInsert } from '@aglint/shared-types';
import axios from 'axios';

import { POSTED_BY } from '../utils';
import {
  type AshbyApplication,
  type ExtendedJobAshby,
  type JobAshby,
} from './types';

export const fetchAllCandidates = async (
  apiKey: string,
): Promise<AshbyApplication[]> => {
  let allCandidates: AshbyApplication[] = [];
  let hasMore = true;
  let page;

  while (hasMore) {
    try {
      const response: any = await axios.post('/api/ashby/getCandidates', {
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
  let allJobs: JobAshby[] = [];

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
  recruiter_id: string,
) => {
  const dbJobs: DatabaseTableInsert['public_jobs'][] = selectedPostings.map(
    (post) => {
      return {
        draft: {
          job_title: post.title,
          description: post.description,
          job_type:
            post.employmentType == 'Contract' ? 'contract' : 'full time',
          workplace_type: 'on site',
        },
        job_title: post.title,
        recruiter_id: recruiter_id,
        posted_by: POSTED_BY.ASHBY,
        status: 'draft',
        id: post.public_job_id,
        description: post.description,
        job_type: post.employmentType == 'Contract' ? 'contract' : 'full time',
        workplace_type: 'on site',
        scoring_criteria_loading: true,
        parameter_weights: {
          skills: 0,
          education: 0,
          experience: 0,
        },
      } as DatabaseTableInsert['public_jobs'];
    },
  );
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
