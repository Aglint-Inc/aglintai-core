import React from 'react';

import { DarkPill } from '@/devlink3';

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
      <DarkPill
        textPill={'Interview Plan'}
        isActive={tab === 'interview_plan'}
        onClickPill={{
          onClick: () => {
            setTab('interview_plan');
          },
        }}
      />
      <DarkPill
        textPill={'Candidate Detail'}
        isActive={tab === 'candidate_detail'}
        onClickPill={{
          onClick: () => {
            setTab('candidate_detail');
          },
        }}
      />
      {isFeedbackVisible && (
        <>
          <DarkPill
            textPill={'Feedback'}
            isActive={tab === 'feedback'}
            onClickPill={{
              onClick: () => {
                setTab('feedback');
              },
            }}
          />
          <DarkPill
            textPill={'Candidate Feedback'}
            isActive={tab === 'candidate_feedback'}
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
