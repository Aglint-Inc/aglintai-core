import React from 'react';

import { DarkPill } from '@/devlink3';

import { setTab, useSchedulingApplicationStore } from '../store';

function TabsSchedulingApplication() {
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );

  const tab = useSchedulingApplicationStore((state) => state.tab);

  const isFeebackVisible = initialSessions.some(
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
      {isFeebackVisible && (
        <DarkPill
          textPill={'Feedback'}
          isActive={tab === 'feedback'}
          onClickPill={{
            onClick: () => {
              setTab('feedback');
            },
          }}
        />
      )}
    </>
  );
}

export default TabsSchedulingApplication;
