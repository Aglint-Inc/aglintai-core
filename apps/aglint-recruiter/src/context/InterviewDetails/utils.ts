import axios from 'axios';
export const getCandidateDetails = async (
  application_id: string | string[],
) => {
  try {
    const { data } = await axios.post('/api/assessment/access_applications', {
      application_id: application_id,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getJobDetails = async (job_id: string | string[]) => {
  try {
    const { data } = await axios.post('/api/assessment/access_public_jobs', {
      job_id: job_id,
    });
    return data;
  } catch (error) {
    return error;
  }
};
