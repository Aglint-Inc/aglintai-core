import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { getCandidateDetails } from '../../utils';

const CandidateAvatar = ({
  application,
  fontSize = 28,
}: {
  application: JobApplication;
  fontSize?: number;
}) => {
  return (
    <MuiAvatar
      level={getCandidateDetails(application, 'name').value}
      src={application.candidates.avatar}
      variant={'circular'}
      width={'100%'}
      height={'100%'}
      fontSize={`${fontSize}px`}
    />
  );
};

export default CandidateAvatar;
