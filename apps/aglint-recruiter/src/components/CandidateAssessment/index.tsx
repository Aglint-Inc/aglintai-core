import { Avatar, Stack } from '@mui/material';
import axios from 'axios';
import { marked } from 'marked';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CandidateAssesmentCard } from '@/devlink2/CandidateAssesmentCard';
import { CandidateLanding } from '@/devlink2/CandidateLanding';
import { useCandidateAssessment } from '@/src/context/CandidateAssessment';
import { AssessmentDetailsType } from '@/src/context/CandidateAssessment/types';

import Loader from '../Common/Loader';
import TypeIcon from '../NewAssessment/Common/icons/types';
const openFullscreen = () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
    window.open('', '_parent', '');
    //@ts-ignore
  } else if (elem.mozRequestFullScreen) {
    //@ts-ignore
    elem.mozRequestFullScreen();
    //@ts-ignore
  } else if (elem.webkitRequestFullscreen) {
    //@ts-ignore
    elem.webkitRequestFullscreen();
    //@ts-ignore
  } else if (elem.msRequestFullscreen) {
    //@ts-ignore

    elem.msRequestFullscreen();
  }
};
function CandidateAssessment() {
  const [submittedAssessment, setSubmittedAssessment] = useState([]);
  const router = useRouter();
  const { fetching, assessmentDetails } = useCandidateAssessment();
  const about_company = '';
  type AssessmentListType =
    AssessmentDetailsType['public_jobs']['assessment_job_relation'];
  const assessmentsList = assessmentDetails?.public_jobs
    ?.assessment_job_relation as AssessmentListType;

  async function handleClick(item) {
    const { application_id, job_id } = router.query;
    if (application_id) {
      const { data: results } = await axios.post(
        '/api/candidate-assessment/assessment-result-details',
        {
          assessment_id: item.assessment.id,
          application_id: application_id,
        },
      );
      if (!results) {
        await axios.post('/api/candidate-assessment/assessment-result-create', {
          assessment_id: item.assessment.id,
          application_id: application_id,
        });
      }
      router.push(
        `/candidate-assessment/${assessmentDetails.id}/${item.assessment.id}`,
      );
    }
    if (job_id) {
      router.push(`/preview-assessment/${job_id}/${item.assessment.id}`);
    }
    openFullscreen();
  }

  async function checkSubmits(item) {
    const { application_id } = router.query;

    const { data: results } = await axios.post(
      '/api/candidate-assessment/assessment-result-details',
      {
        assessment_id: item.assessment.id,
        application_id: application_id,
      },
    );
    if (results) {
      setSubmittedAssessment((pre) => [
        ...pre,
        { submitted: results.is_submitted, assessment_id: item.assessment.id },
      ]);
    } else {
      setSubmittedAssessment((pre) => [
        ...pre,
        { submitted: results, assessment_id: item.assessment.id },
      ]);
    }
  }
  useEffect(() => {
    assessmentsList &&
      assessmentsList.map((item) => {
        checkSubmits(item);
      });
  }, [assessmentsList]);

  if (fetching) {
    return (
      <Stack width={'100%'} height={'100vh'}>
        <Loader />
      </Stack>
    );
  }

  return (
    <div>
      <CandidateLanding
        textAssessmentCount={`(${assessmentsList?.length})`}
        slotLogo={
          <>
            <Avatar
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: 'transparent',

                p: 2,
                '& img': {
                  borderRadius: 'var(--radius-4)',
                  backgroundBlendMode: 'color-burn',
                },
              }}
              variant='rounded'
              src={''}
            />
          </>
        }
        textTime={
          assessmentsList &&
          assessmentsList.length &&
          assessmentsList
            .map((item) => {
              const init = 0;
              const duration =
                item.assessment?.assessment_question.length > 0 &&
                item.assessment?.assessment_question.reduce(
                  (a, sum) => a + sum.duration,
                  init,
                );
              return duration;
            })
            .reduce((a, b) => a + b) + ' Minutes'
        }
        slotInstructions={
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: '',
              }}
            ></div>
          </>
        }
        isAboutCompnay={false}
        textAboutCompany={
          <div
            dangerouslySetInnerHTML={{
              __html: marked(about_company || ''),
            }}
          ></div>
        }
        onClickAbout={{
          onClick: () => {
            window.open(`/job-post/${assessmentDetails?.public_jobs?.id}`);
          },
        }}
        // textCompanyName={assessmentDetails?.public_jobs.company}
        textTitle={assessmentDetails?.public_jobs.job_title}
        slotCandidateAssesmentCard={
          assessmentsList &&
          assessmentsList.map((item, i) => {
            const init = 0;
            const duration =
              item.assessment?.assessment_question.length > 0 &&
              item.assessment?.assessment_question.reduce(
                (a, sum) => a + sum.duration,
                init,
              );
            if (duration)
              return (
                <CandidateAssesmentCard
                  onClickStart={{
                    onClick: () => handleClick(item),
                  }}
                  isSubmittedVisible={
                    submittedAssessment.filter(
                      (ele) => ele.assessment_id === item.assessment.id,
                    )[0]?.submitted
                  }
                  isStartButtonVisible={
                    !submittedAssessment.filter(
                      (ele) => ele.assessment_id === item.assessment.id,
                    )[0]?.submitted
                  }
                  key={i}
                  textHeader={item.assessment.title}
                  textDuration={(duration || 0) + ' Minutes'}
                  textQuestionCount={item.assessment.assessment_question.length}
                  slotLogo={<TypeIcon type={item.assessment.type} />}
                />
              );
          })
        }
      />
    </div>
  );
}

export default CandidateAssessment;
