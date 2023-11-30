import { Stack, Tooltip } from '@mui/material';

import { ScoreErrorIcon } from '@/devlink2';
import Calculating from '@/src/components/Common/Calculating';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { ResumeScoreTag } from '../../ResumeScoreTag';
import { ApiLogState, intactConditionFilter } from '../../utils';

const ResumeScore = ({ application }: { application: JobApplication }) => {
  return application.json_resume || application.resume ? (
    intactConditionFilter(application) !== ApiLogState.PROCESSING ? (
      application.jd_score ? (
        <ResumeScoreTag score={application.resume_score} />
      ) : (
        <Tooltip
          title="Oops! It looks like we're having trouble reading the resume. This could be because the PDF file contains an image instead of text. Please make sure the file is in a supported format and try again."
          placement='right'
          arrow={true}
        >
          <Stack>
            <ScoreErrorIcon />
          </Stack>
        </Tooltip>
      )
    ) : (
      <Tooltip title='Ongoing scoring' placement='right' arrow={true}>
        <Stack style={{ scale: '0.3' }}>
          <Calculating />
        </Stack>
      </Tooltip>
    )
  ) : (
    <Tooltip title='No resume available.' placement='right' arrow={true}>
      <Stack>---</Stack>
    </Tooltip>
  );
};

export default ResumeScore;
