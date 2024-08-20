import { Stack } from '@mui/material';

import { Application } from '@/src/context/ApplicationContext';

function CandidateInfo({ application_id, job_id }) {
  return (
    <Stack spacing={'var(--space-4)'} padding={'var(--space-4)'}>
      <Application application_id={application_id} job_id={job_id}>
        <Application.Body.TopBar>
          <Application.Body.TopBar.Info />
        </Application.Body.TopBar>
        <Application.Body.Meta />
        <Application.Body.Details />
      </Application>
    </Stack>
  );
}

export default CandidateInfo;
