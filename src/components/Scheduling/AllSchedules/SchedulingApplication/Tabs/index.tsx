import React from 'react';

import { NewTabPill } from '@/devlink3';

import { setTab, useSchedulingApplicationStore } from '../store';

function TabsSchedulingApplication() {
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );

  const tab = useSchedulingApplicationStore((state) => state.tab);

  const isFeedbackVisible = initialSessions.some(
    (ses) => ses?.interview_meeting?.status === 'completed',
  );

  return (
    <>
      <NewTabPill
        textLabel={'Interview Plan'}
        isPillActive={tab === 'interview_plan'}
        onClickPill={{
          onClick: () => {
            setTab('interview_plan');
          },
        }}
      />
      <NewTabPill
        textLabel={'Candidate Detail'}
        isPillActive={tab === 'candidate_detail'}
        onClickPill={{
          onClick: () => {
            setTab('candidate_detail');
          },
        }}
      />
      {isFeedbackVisible && (
        <>
          <NewTabPill
            textLabel={'Feedback'}
            isPillActive={tab === 'feedback'}
            onClickPill={{
              onClick: () => {
                setTab('feedback');
              },
            }}
          />
          <NewTabPill
            textLabel={'Candidate Feedback'}
            isPillActive={tab === 'candidate_feedback'}
            onClickPill={{
              onClick: () => {
                setTab('candidate_feedback');
              },
            }}
          />
        </>
      )}
    </>
  );
}

export default TabsSchedulingApplication;
