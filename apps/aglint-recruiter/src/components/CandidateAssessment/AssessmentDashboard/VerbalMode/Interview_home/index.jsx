/* eslint-disable no-console */
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { DisconnectInterviewModal } from '@/devlink/DisconnectInterviewModal';
import { NewInterviewScreen } from '@/devlink/NewInterviewScreen';
import CompleteLoaderLottie from '@/src/components/Common/Lotties/CompleteLoaderLottie';
import { useCandidateAssessment } from '@/src/context/CandidateAssessment';
import { useInterviewContext } from '@/src/context/InterviewContext';

import MuiAvatar from '../../../../Common/MuiAvatar';
import MuiPopup from '../../../../Common/MuiPopup';
import SidePanelDrawer from '../../../../Common/SidePanelDrawer';
import CandidatePanel from './CandidatePanel';
import VideoCandidatePanel from './CandidatePanel/VideoCandidatePanel';
import InterviewerPanel from './InterviewerPanel';
import VideoInterviewerPanel from './InterviewerPanel/VideoInterviewerPanel';
import Transcript from './Transcript';

function Interview_home() {
  const [openSidePanelDrawer, setOpenPanelDrawer] = useState(false);
  const router = useRouter();
  const {
    conversations,
    getFeedback,
    totalNumberOfQuestions,
    questionIndex,
    openThanksPage,
    setOpenThanksPage,
    openEndInterview,
    setOpenEndInterview,
    disconnecting,
    videoAssessment,
  } = useInterviewContext();
  const { assessmentDetails } = useCandidateAssessment();

  return (
    <Stack>
      <SidePanelDrawer
        openSidePanelDrawer={openSidePanelDrawer}
        setOpenPanelDrawer={setOpenPanelDrawer}
      >
        <Stack width={'400px'}>
          <Transcript
            conversations={conversations}
            setOpenPanelDrawer={setOpenPanelDrawer}
            interviewerImage={'/'}
            candidateImage={'/'}
          />
        </Stack>
      </SidePanelDrawer>
      <MuiPopup
        props={{
          open: openEndInterview,
          onClose: () => {
            !openThanksPage && setOpenEndInterview(false);
          },
        }}
      >
        <Stack width={'507px'}>
          <DisconnectInterviewModal
            slotLoaderLottie={<CompleteLoaderLottie />}
            isLoadingVisible={openThanksPage}
            isDisconnectVisible={!openThanksPage}
            onClickDisconnect={{
              onClick: () => {
                disconnecting();
                setOpenThanksPage(true);
              },
            }}
            onClickClose={{
              onClick: () => {
                setOpenEndInterview(false);
              },
            }}
            onClickCancel={{
              onClick: () => {
                setOpenEndInterview(false);
              },
            }}
          />
        </Stack>
      </MuiPopup>
      <NewInterviewScreen
        slotInterviewLogo={
          <MuiAvatar
            src={assessmentDetails?.public_jobs?.logo}
            fontSize={'var(--space-5)'}
            variant={'rounded-medium'}
          />
        }
        onClickEndInterview={{
          onClick: () => {
            if (totalNumberOfQuestions.length === questionIndex + 1) {
              setOpenEndInterview(true);
              setOpenThanksPage(true);
              getFeedback();
            } else {
              setOpenEndInterview(true);
            }
          },
        }}
        onClickSupport={{
          onClick: () => {
            window.open(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${router.query?.application_id}`,
            );
          },
        }}
        onClickTransscript={{
          onClick: () => {
            console.log('Transcript');
            setOpenPanelDrawer(true);
          },
        }}
        slotInterviewRight={
          videoAssessment ? <VideoInterviewerPanel /> : <InterviewerPanel />
        }
        slotInterviewLeft={
          videoAssessment ? <VideoCandidatePanel /> : <CandidatePanel />
        }
      />
    </Stack>
  );
}

export default Interview_home;