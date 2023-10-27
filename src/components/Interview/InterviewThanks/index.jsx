import { Stack } from '@mui/material';

import { InterviewCompleted } from '@/devlink';
import { useInterviewDetailsContext } from '@/src/context/InterviewDetails';

import CompleteLottie from './CompletedLottie';
import InCompleteLottie from './IncompleteLottie';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';

function InterviewThanks() {
  const { jobDetails, candidateDetails, initialLoading } =
    useInterviewDetailsContext();
  return (
    <>
      {initialLoading ? (
        <>
          <Stack width={'100%'} height={'100vh'}>
            <Loader />
          </Stack>
        </>
      ) : (
        <InterviewCompleted
          textDescription={
            candidateDetails?.feedback?.length
              ? `Thank you for taking your time to take this interview. We will be in touch with you soon.If you have any questions please `
              : `It appears that you haven't completed the interview. We hope you'll return to take the interview again. If you need any assistance, please don't hesitate to `
          }
          propsTextColor={{
            style: {
              color: candidateDetails?.feedback?.length ? 'green' : '#F79A3E',
            },
          }}
          textTitle={
            candidateDetails?.feedback?.length
              ? 'Completed Interview Successfully'
              : 'Oops. Your interview is incomplete.'
          }
          slotCompanyLogo={
            jobDetails?.logo ? (
              <MuiAvatar
                width={'60px'}
                height={'60px'}
                src={jobDetails?.logo}
              />
            ) : null
          }
          slotLottie={
            candidateDetails?.feedback?.length ? (
              <CompleteLottie />
            ) : (
              <InCompleteLottie />
            )
          }
          onClickSupport={{
            onClick: () => {
              window.open(
                `https://recruiter.aglinthq.com/support/create?id=${candidateDetails?.application_id}`,
              );
            },
          }}
          // textDescription={}
        />
      )}
    </>
  );
}

export default InterviewThanks;
