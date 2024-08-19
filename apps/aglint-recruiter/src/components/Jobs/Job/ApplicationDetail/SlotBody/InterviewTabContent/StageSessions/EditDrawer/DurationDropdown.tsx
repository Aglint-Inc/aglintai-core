import { MenuItem, TextField } from '@mui/material';
import React from 'react';

import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { sessionDurations } from '@/src/utils/scheduling/const';

import { setEditSession, useEditSessionDrawerStore } from './store';

function SessionDuration() {
  const { editSession } = useEditSessionDrawerStore((state) => ({
    editSession: state.editSession,
  }));

  return (
    <TextField
      fullWidth
      select
      value={editSession.interview_session.session_duration}
    >
      {sessionDurations?.map((dur) => (
        <MenuItem
          value={dur}
          key={dur}
          onClick={() =>
            setEditSession({
              interview_session: {
                ...editSession.interview_session,
                session_duration: dur,
              },
            })
          }
        >
          {getBreakLabel(dur)}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default SessionDuration;
