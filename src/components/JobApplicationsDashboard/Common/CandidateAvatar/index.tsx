import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { getCandidateName } from '../../utils';

const CandidateAvatar = ({
  application,
  fontSize = 28,
}: {
  application: JobApplication;
  fontSize?: number;
}) => {
  return (
    <MuiAvatar
      level={getCandidateName(
        application.candidates.first_name,
        application.candidates.last_name,
      )}
      src={application.candidates.profile_image}
      variant={'rounded'}
      width={'100%'}
      height={'100%'}
      fontSize={`${fontSize}px`}
    />
  );
};

export default CandidateAvatar;
