import axios from 'axios';
import { supabase, supabaseWrap } from '../config/supabase';
import { JobApplicationDbtype } from '../schema/db/tables';
import { logJobApplicationStatus } from './logApi';
const jd_score_url =
  'https://us-central1-aglint-cloud-381414.cloudfunctions.net/resume-score-gen';

export const sendEmailToCandidates = async (job_id: string) => {
  const qualifiedCandidates = supabaseWrap(
    await supabase
      .from('job_applications')
      .select()
      .eq('job_id', job_id)
      .eq('status', 'new')
  ) as JobApplicationDbtype[];
  logJobApplicationStatus(
    `got applications ${qualifiedCandidates.length} for job_id`,
    job_id
  );
  const batch = 10;
  logJobApplicationStatus(`runing batch size ${batch}`);
  for (let i = 0; i < qualifiedCandidates.length; i += batch) {
    const candidatesBatch = qualifiedCandidates.slice(i, i + batch);
    const jdScorePromises = candidatesBatch.map((cand) =>
      callJdScoreApi(cand.application_id)
    );
    await Promise.allSettled(jdScorePromises);
  }

  return qualifiedCandidates;
};

const callJdScoreApi = async (application_id: string) => {
  try {
    logJobApplicationStatus(`running score for ${application_id}`);
    const { status } = await axios.post(jd_score_url, {
      application_id,
    });
    return status;
  } catch (err) {
  } finally {
    logJobApplicationStatus(`finished for application ${application_id}`);
  }
};
