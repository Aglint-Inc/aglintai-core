import { Stack, Tooltip } from '@mui/material';

import { ScoreErrorIcon } from '@/devlink2';
import { SmallCircularScore } from '@/src/components/Common/SmallCircularScore';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { getInterviewScore } from '../../utils';

const InterviewScore = ({ application }: { application: JobApplication }) => {
  const interviewScore = application?.feedback
    ? getInterviewScore(application.feedback)
    : 0;
  return application?.feedback ? (
    <SmallCircularScore score={interviewScore} scale={0.5} showScore={true} />
  ) : (
    <Tooltip title='Yet to be assessed' placement='right' arrow={true}>
      <Stack>
        <ScoreErrorIcon />
      </Stack>
    </Tooltip>
  );
};

export default InterviewScore;
