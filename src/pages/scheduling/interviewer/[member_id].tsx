import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Breadcrum, PageLayout } from '@/devlink2';
import { InterviewerDetailTopRight } from '@/devlink3';
import Interviewer from '@/src/components/CompanyDetailComp/Interviewers/Interviewer';
import {
  InterviewerContextProvider,
  useInterviewerContext
} from '@/src/context/InterviewerContext/InterviewerContext';

function InterviewerPage() {
  const { interviewerMembers, selectedInterviewer, handelSelectInterviewer } =
    useInterviewerContext();

  const router = useRouter();
  useEffect(() => {
    if (router.isReady && interviewerMembers.length) {
      const { member_id } = router.query;
      member_id && handelSelectInterviewer(member_id as string);
    }
  }, [router.isReady, interviewerMembers]);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };
  return (
    <PageLayout
      onClickBack={{
        onClick: () => {
          router.back();
        }
      }}
      isBackButton={true}
      slotTopbarLeft={
        <>
          <Breadcrum
            textName={`${selectedInterviewer?.first_name} ${selectedInterviewer?.last_name || ''}`}
          />
        </>
      }
      slotTopbarRight={
        <InterviewerDetailTopRight
          onClickSettings={{
            onClick: () => {
              toggleDrawer();
            }
          }}
        />
      }
      slotBody={
        <Interviewer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      }
    />
  );
}

InterviewerPage.getProvider = function getProvider(page) {
  return <InterviewerContextProvider>{page}</InterviewerContextProvider>;
};

export default InterviewerPage;
