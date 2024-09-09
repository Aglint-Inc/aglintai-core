import { MenuItem, TextField } from '@mui/material';
import React from 'react';

import { setEditSession, useEditSessionDrawerStore } from '../store';

function CountDropDown() {
  const { editSession, selectedInterviewers } = useEditSessionDrawerStore(
    (state) => ({
      editSession: state.editSession,
      selectedInterviewers: state.selectedInterviewers,
    }),
  );
  return (
    <TextField
      size='small'
      name={'interviewer_cnt'}
      type='number'
      sx={{
        width: '60px',
        '& .MuiOutlinedInput-root': {
          padding: '0px!important',
        },
      }}
      value={editSession.interview_session.interviewer_cnt || 1}
      onChange={(e) => {
        setEditSession({
          interview_session: {
            ...editSession.interview_session,
            interviewer_cnt: Number(e.target.value),
          },
        });
      }}
      select
    >
      {Array.from({ length: selectedInterviewers.length }, (_, i) => i + 1).map(
        (num) => (
          <MenuItem value={num} key={num}>
            {num}
          </MenuItem>
        ),
      )}
    </TextField>
  );
}

export default CountDropDown;
