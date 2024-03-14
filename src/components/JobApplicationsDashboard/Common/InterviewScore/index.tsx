import { Stack, Tooltip } from '@mui/material';

import { AssessmentScore, ScreeningStatus } from '@/devlink2';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';
import { useJobDetails } from '@/src/context/JobDashboard';
import { getSafeAssessmentResult } from '@/src/pages/api/job/jobApplications/candidateEmail/utils';
import { Assessment } from '@/src/queries/assessment/types';

import { FetchingEmail, InavlidEmail } from '../../ApplicationCard';
import { InvitedIcon } from '../../ApplicationCard/Icons/invited';
import { UninvitedIcon } from '../../ApplicationCard/Icons/uninvited';
import { getAssessmentStatus } from '../../utils';

const InterviewScore = ({ application }: { application: JobApplication }) => {
  const {
    assessments: {
      data: { jobAssessments: assessments }
    }
  } = useJobDetails();
  const { views } = useJobApplications();
  const {
    emailValidity: { isFetching, isValidEmail }
  } = application;
  const { result, isNotInvited, isPending, timeInfo, assessmentStatus } =
    getAssessmentStatus(
      application.status_emails_sent,
      getSafeAssessmentResult(application?.assessment_results)
    );
  if (!views.assessment) return <></>;

  if (isFetching) return <FetchingEmail />;
  if (!isValidEmail) return <InavlidEmail />;
  if (!assessments || !Array.isArray(assessments) || assessments.length === 0)
    return (
      <Tooltip title='No assessments connected' placement='right' arrow={true}>
        <Stack>
          <AssessmentScore
            textScore={null}
            textDuration={null}
            isScoreVisible={false}
            isError={true}
            props={{ style: { color: 'grey', borderColor: 'grey' } }}
          />
        </Stack>
      </Tooltip>
    );
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
      <Tooltip title='Unfinished assessments' placement='right' arrow={true}>
        <Stack>
          <AssessmentScore
            textScore={null}
            textDuration={null}
            isError={true}
            props={{ style: { color: 'grey', borderColor: 'grey' } }}
          />
        </Stack>
      </Tooltip>
    );
  const res = getInterviewScores(application, assessments);
  const overallScore = getOverallInterviewScore(res);
  const color = getColor(overallScore);
  return (
    <AssessmentScore
      textScore={overallScore}
      props={{ style: { color: color, borderColor: color } }}
      isDurationVisible={true}
      textDuration={timeInfo}
    />
  );
};

export const getOverallInterviewScore = (
  result: ReturnType<typeof getInterviewScores>
) => {
  return Math.trunc(
    result.reduce((acc, { score: { percentage } }) => {
      acc += percentage ?? 0;
      return acc;
    }, 0) / result.length
  );
};

export const getInterviewScores = (
  application: JobApplication,
  assessments: Assessment[]
) => {
  if (
    !application.assessment_results ||
    !Array.isArray(application.assessment_results) ||
    application.assessment_results.length === 0
  )
    return null;
  return assessments.reduce(
    (acc, assessment) => {
      const assessment_result = application.assessment_results.find(
        ({ assessment_id }) => assessment_id === assessment.id
      );
      if (assessment_result) {
        if (assessment_result.responses)
          acc.push({
            name: assessment.title,
            score: sumAssessmentRatings(assessment_result)
          });
        else
          acc.push({
            name: assessment.title,
            score: { candidateTotal: 0, percentage: 0, total: 0 }
          });
      } else
        acc.push({
          name: assessment.title,
          score: { candidateTotal: null, percentage: null, total: null }
        });
      return acc;
    },
    [] as { name: string; score: ReturnType<typeof sumAssessmentRatings> }[]
  );
};

const sumAssessmentRatings = (
  assessment_result: JobApplication['assessment_results'][number]
) => {
  const total = (assessment_result?.responses ?? []).reduce((acc) => {
    acc += 10;
    return acc;
  }, 0);
  const candidateTotal = (assessment_result?.result ?? []).reduce(
    (acc, curr) => {
      if (curr?.rating && typeof curr.rating === 'number') acc += curr.rating;
      return acc;
    },
    0
  );
  return {
    total,
    candidateTotal,
    percentage: Math.trunc((candidateTotal / total) * 100)
  };
};

const getColor = (interviewScore: number) => {
  if (interviewScore >= 66) return 'rgba(3, 129, 83, 1)';
  else if (interviewScore >= 33) return 'rgba(237, 143, 28, 1)';
  else return 'rgba(204, 51, 64, 1)';
};

export default InterviewScore;
