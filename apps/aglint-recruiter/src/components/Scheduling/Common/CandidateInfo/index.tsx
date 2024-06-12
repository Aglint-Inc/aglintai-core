import { Stack } from '@mui/material';

import { Application } from '@/src/context/ApplicationContext';

function CandidateInfo({ applications, candidate, file }) {
  if (applications && candidate && file)
    return (
      <Stack spacing={'var(--space-4)'} padding={'var(--space-4)'}>
        <Application
          application_id={applications.id}
          job_id={applications.job_id}
        >
          <Application.Body.Meta />
          <Application.Body.Details />
        </Application>
      </Stack>
    );
}

export default CandidateInfo;
