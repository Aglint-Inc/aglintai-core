import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Breadcrum, PageLayout } from '@/devlink2';
import Interviewer from '@/src/components/CompanyDetailComp/Interviewers/Interviewer';
import {
  InterviewerContextProvider,
  useInterviewerContext
} from '@/src/context/InterviewerContext/InterviewerContext';
import { pageRoutes } from '@/src/utils/pageRouting';

function InterviewerPage() {
  const { interviewerMembers, selectedInterviewer, handelSelectInterviewer } =
    useInterviewerContext();
  const [selectedInterviewEvent, setSelectedInterviewEvent] = useState<
    any | null
  >(null);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady && interviewerMembers.length) {
      const { member_id } = router.query;
      member_id && handelSelectInterviewer(member_id as string);
    }
  }, [router.isReady, interviewerMembers]);
  return (
    <PageLayout
      onClickBack={{
        onClick: () => {
          selectedInterviewEvent
            ? setSelectedInterviewEvent(null)
            : router.push(`${pageRoutes.SCHEDULING}?tab=allInterviewers`);
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
      slotBody={
        <Interviewer
          selectedInterviewEvent={selectedInterviewEvent}
          setSelectedInterviewEvent={setSelectedInterviewEvent}
        />
      }
    />
  );
}

InterviewerPage.getProvider = function getProvider(page) {
  return <InterviewerContextProvider>{page}</InterviewerContextProvider>;
};

export default InterviewerPage;
