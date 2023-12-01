import { Stack, Tooltip } from '@mui/material';

import { AssessmentScore } from '@/devlink2';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { getInterviewScore } from '../../utils';

const InterviewScore = ({ application }: { application: JobApplication }) => {
  const interviewScore = application?.feedback
    ? getInterviewScore(application.feedback)
    : 0;
  const color = getColor(interviewScore);
  return application?.feedback ? (
    <AssessmentScore
      textScore={interviewScore}
      props={{ style: { color: color, borderColor: color } }}
    />
  ) : (
    <Tooltip title='Yet to be assessed' placement='right' arrow={true}>
      <Stack>
        <AssessmentScore
          textScore={'--'}
          props={{ style: { color: 'grey', borderColor: 'grey' } }}
        />
      </Stack>
    </Tooltip>
  );
};

const getColor = (interviewScore: number) => {
  if (interviewScore >= 66) return 'rgba(3, 129, 83, 1)';
  else if (interviewScore >= 33) return 'rgba(237, 143, 28, 1)';
  else return 'rgba(204, 51, 64, 1)';
};

export default InterviewScore;
