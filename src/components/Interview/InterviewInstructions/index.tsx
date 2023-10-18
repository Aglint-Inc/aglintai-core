import { Avatar, Stack } from '@mui/material';

import { InterviewWelcome } from '@/devlink';
import { useInterviewContext } from '@/src/context/InterviewContext';
import { useInterviewDetailsContext } from '@/src/context/InterviewDetails';

import Loader from '../../Common/Loader';

function InterviewInstructions() {
  const { initialLoading, jobDetails, candidateDetails } =
    useInterviewDetailsContext();
  const { startInterview } = useInterviewContext();
  return (
    <div>
      {initialLoading ? (
        <Stack width={'100%'} height={'100vh'}>
          <Loader />
        </Stack>
      ) : (
        <InterviewWelcome
          onClickSupport={{
            onClick: () => {
              window.open(
                `https://recruiter.aglinthq.com/support?id=${candidateDetails.application_id}`,
              );
            },
          }}
          onClickAboutCompany={{
            onClick: () => {
              window.open(
                `https://recruiter.aglinthq.com/job-post/${jobDetails?.id}`,
              );
            },
          }}
          slotLogo={
            <Avatar
              variant='circular'
              src={jobDetails?.logo}
              sx={{
                width: '50px',
                height: '50px',
              }}
            />
          }
          textCompany={jobDetails?.company}
          textRole={jobDetails?.job_title}
          // textCompanyDiscription={jobDetails?.company_details}
          onClickStart={{
            onClick: () => {
              startInterview();
            },
          }}
        />
      )}
    </div>
  );
}

export default InterviewInstructions;
