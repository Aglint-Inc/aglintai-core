import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { ApiLogState, intactConditionFilter } from '../utils';

export const applicationValidity = (application: JobApplication) => {
  return (
    intactConditionFilter(application) !== ApiLogState.PROCESSING &&
    application.candidate_files.resume_json &&
    application.score_json
  );
};
