import { Stack } from '@mui/material';

import { CandidateBasicInfo } from '@/devlink/CandidateBasicInfo';
import { useApplication } from '@/src/context/ApplicationContext';

const Meta = () => {
  const {
    application: { data, status },
  } = useApplication();
  if (status === 'pending') return <Stack>Loading...</Stack>;
  return (
    <CandidateBasicInfo
      textLocation={data.candidates?.city ?? '---'}
      textMail={data.candidates?.email ?? '---'}
      textPhone={data.candidates?.phone ?? '---'}
      textRole={data.candidates?.current_job_title ?? '---'}
    />
  );
};

export { Meta };
