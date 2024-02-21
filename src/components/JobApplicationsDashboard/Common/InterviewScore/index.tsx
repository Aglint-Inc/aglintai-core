import { Stack, Tooltip } from '@mui/material';
import { useMemo } from 'react';

import { AssessmentScore, ScreeningStatus } from '@/devlink2';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { FetchingEmail, InavlidEmail } from '../../ApplicationCard';
import { InvitedIcon } from '../../ApplicationCard/Icons/invited';
import { UninvitedIcon } from '../../ApplicationCard/Icons/uninvited';
import { getAssessmentStatus } from '../../utils';

const InterviewScore = ({ application }: { application: JobApplication }) => {
  const { views } = useJobApplications();
  const {
    emailValidity: { isFetching, isValidEmail },
  } = application;
  const { result, isNotInvited, isPending, timeInfo, assessmentStatus } =
    useMemo(
      () =>
        getAssessmentStatus(application.status_emails_sent, {
          result: application.assessment_results?.result ?? null,
          created_at: application?.assessment_results?.created_at ?? null,
        }),
      [],
    );
  if (!views.assessment) return <></>;

  if (isFetching) return <FetchingEmail />;
  if (!isValidEmail) return <InavlidEmail />;
  if (isNotInvited)
    return (
      <ScreeningStatus
        slotIcon={<UninvitedIcon />}
        isDurationVisible={false}
        textStatus={
          <Stack style={{ color: '#68737D' }}>{assessmentStatus}</Stack>
        }
      />
    );
  if (isPending)
    return (
      <ScreeningStatus
        slotIcon={<InvitedIcon />}
        isDurationVisible={true}
        textStatus={assessmentStatus}
        textDuration={timeInfo}
      />
    );
  if (!result)
    return (
      <Tooltip title='Unfinished interview' placement='right' arrow={true}>
        <Stack>
          <AssessmentScore
            textScore={null}
            isError={true}
            props={{ style: { color: 'grey', borderColor: 'grey' } }}
          />
        </Stack>
      </Tooltip>
    );
  const color = getColor(application.overall_interview_score);
  return (
    <AssessmentScore
      textScore={application.overall_interview_score}
      props={{ style: { color: color, borderColor: color } }}
      isDurationVisible={true}
      textDuration={timeInfo}
    />
  );
};

const getColor = (interviewScore: number) => {
  if (interviewScore >= 66) return 'rgba(3, 129, 83, 1)';
  else if (interviewScore >= 33) return 'rgba(237, 143, 28, 1)';
  else return 'rgba(204, 51, 64, 1)';
};

export default InterviewScore;
