import axios from 'axios';

import { type LeverJob } from './types/job';

export const fetchAllJobs = async (apiKey) => {
  let allJobs = [];
  let hasMore = true;
  let next = 0;

  while (hasMore) {
    try {
      const response = await axios.post('/api/lever/getPostings', {
        offset: next,
        apiKey: apiKey,
        isInitial: false,
      });

      if (response.data && response.data.data) {
        allJobs = allJobs.concat(response.data.data);
        hasMore = response.data.hasNext;
      } else {
        next = response.data.next;
        hasMore = false; // Exit the loop if there are no more records
      }
    } catch (error) {
      hasMore = false; // Exit the loop in case of an error
    }
  }
  return allJobs as LeverJob[];
};

export function getLeverStatusColor(state) {
  return state == 'published'
    ? '#228F67'
    : state == 'closed'
      ? '#D93F4C'
      : state == 'internal'
        ? '#ED8F1C'
        : '#d93f4c';
}
