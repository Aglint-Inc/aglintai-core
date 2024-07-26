import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { Application } from '@/src/context/ApplicationContext';
import { supabase } from '@/src/utils/supabase/client';

function CandidateInfo({ application_id }) {
  const [jobId, setJobId] = useState(null);
  useEffect(() => {
    supabase
      .from('applications')
      .select('job_id')
      .eq('id', application_id)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        setJobId(data[0].job_id);
      });
  }, [application_id]);

  return (
    <Stack spacing={'var(--space-4)'} padding={'var(--space-4)'}>
      <Application application_id={application_id} job_id={jobId}>
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
