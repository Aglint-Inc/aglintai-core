import { type DatabaseTable } from '@aglint/shared-types';
export const onInsertPublicJobs = async ({
  new_data,
}: {
  new_data: DatabaseTable['public_jobs'];
}) => {
  // Clone workflows
  cloneWorkflows(new_data.id, new_data.recruiter_id);
};

const cloneWorkflows = async (job_id: string, company_id: string) => {
  try {
    cloneWorkflows(job_id, company_id);
  } catch (e) {
    console.error('Error cloning workflows', e);
  }
};
