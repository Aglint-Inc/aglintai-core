import { useEffect } from 'react';

import UITextField from '@/common/UITextField';

import {
  setEditSession,
  useEditSessionDrawerStore,
} from '../../../stores/editSessionDrawer';

function CountDropDown() {
  const { editSession, selectedInterviewers } = useEditSessionDrawerStore(
    (state) => ({
      editSession: state.editSession,
      selectedInterviewers: state.selectedInterviewers,
    }),
  );

  useEffect(() => {
    if (
      Number(editSession?.interview_session.interviewer_cnt) >=
        selectedInterviewers.length &&
      selectedInterviewers.length !== 0
    )
      setEditSession({
        interview_session: {
          ...editSession!.interview_session,
          interviewer_cnt: selectedInterviewers.length,
        },
      });
  }, [selectedInterviewers.length]);

  return (
    <UITextField
      type='number'
      className='w-16'
      fieldSize='small'
      name={'interviewer_cnt'}
      value={editSession!.interview_session.interviewer_cnt.toString() || '1'}
      onChange={(e) => {
        if (
          Number(e.target.value) >= selectedInterviewers.length + 1 ||
          Number(e.target.value) === 0
        )
          return;
        setEditSession({
          interview_session: {
            ...editSession!.interview_session,
            interviewer_cnt: Number(e.target.value),
          },
        });
      }}
    />
  );
}

export default CountDropDown;
