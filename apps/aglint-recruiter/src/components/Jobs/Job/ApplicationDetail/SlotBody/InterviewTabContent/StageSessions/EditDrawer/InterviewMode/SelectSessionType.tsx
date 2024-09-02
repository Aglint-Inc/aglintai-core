import React from 'react';

import { InterviewModePill } from '@/devlink2/InterviewModePill';
import IconSessionType from '@/src/components/Common/Icons/IconSessionType';

import { setEditSession, useEditSessionDrawerStore } from '../store';

function SelectSessionType() {
  const { editSession } = useEditSessionDrawerStore((state) => ({
    editSession: state.editSession,
  }));

  return (
    <>
      <InterviewModePill
        isActive={editSession.interview_session.session_type === 'panel'}
        textModeName={'Panel'}
        slotModeIcon={<IconSessionType type='panel' />}
        onClickPill={{
          onClick: () => {
            setEditSession({
              interview_session: {
                ...editSession.interview_session,
                session_type: 'panel',
              },
            });
          },
        }}
      />
      <InterviewModePill
        isActive={editSession.interview_session.session_type === 'individual'}
        textModeName={'Individual'}
        slotModeIcon={<IconSessionType type='individual' />}
        onClickPill={{
          onClick: () => {
            setEditSession({
              interview_session: {
                ...editSession.interview_session,
                session_type: 'individual',
                interviewer_cnt: 1,
              },
            });
          },
        }}
      />
    </>
  );
}

export default SelectSessionType;
