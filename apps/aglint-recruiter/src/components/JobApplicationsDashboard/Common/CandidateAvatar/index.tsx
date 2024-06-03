import { Stack } from '@mui/material';

import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { getCandidateDetails } from '../../utils';

const CandidateAvatar = ({ application }: { application: JobApplication }) => {
  return (
    <Stack width={'100%'} sx={{ aspectRatio: 1 }}>
      <MuiAvatar
        level={getCandidateDetails(application, 'name').value}
        src={`${application.candidates.avatar}?d=404`}
        variant={'rounded-small'}
      />
    </Stack>
  );
};

export default CandidateAvatar;
