import { UploadCandidateAPi } from '../uploadCandidates';
import { supabase } from '../../invite_user';
import { selectJobApplicationQuery } from '../../JobApplicationsApi/utils';

export const getExisitingCandidates = async (
  emails: UploadCandidateAPi['request']['candidates'][0]['email'][],
) => {
  return await supabase.from('candidates').select().in('email', emails);
};

export const getExisitingJobApplications = async (
  candidateIds: UploadCandidateAPi['request']['candidates'][0]['id'][],
  jobId: string,
) => {
  return await supabase
    .from('job_applications')
    .select(`${selectJobApplicationQuery},candidates(*)`)
    .eq('job_id', jobId)
    .in('candidate_id', candidateIds);
};
