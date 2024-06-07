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
      textLocation={data.candidate?.city ?? '---'}
      textMail={data.candidate?.email ?? '---'}
      textPhone={data.candidate?.phone ?? '---'}
      textRole={data.candidate?.current_job_title ?? '---'}
    />
  );
};

export { Meta };
