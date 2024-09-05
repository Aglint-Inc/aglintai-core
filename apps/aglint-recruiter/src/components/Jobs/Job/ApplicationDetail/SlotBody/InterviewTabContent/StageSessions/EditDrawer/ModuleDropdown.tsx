import { capitalize, MenuItem, Stack, TextField } from '@mui/material';
import { Archive } from 'lucide-react';
import React from 'react';

import { useInterviewModules } from '@/queries/interview-modules';

import {
  setEditSession,
  setSelectedInterviewers,
  setTrainingInterviewers,
  setTrainingToggle,
  useEditSessionDrawerStore,
} from './store';

function ModuleDropdown() {
  const interviewModules = useInterviewModules();

  const { editSession } = useEditSessionDrawerStore((state) => ({
    editSession: state.editSession,
  }));

  const filterArchivedModules = interviewModules?.data?.filter(
    (module) =>
      editSession?.interview_session.module_id === module.id ||
      !module.is_archived,
  );
  return (
    <>
      <TextField
        fullWidth
        select
        value={editSession.interview_session.module_id}
      >
        {filterArchivedModules?.map((module) => (
          <MenuItem
            value={module.id}
            key={module.id}
            onClick={() => {
              setEditSession({
                interview_session: {
                  ...editSession.interview_session,
                  module_id: module.id,
                },
              });
              setSelectedInterviewers([]);
              setTrainingInterviewers([]);
              setTrainingToggle(false);
            }}
          >
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <Stack>{capitalize(module.name)}</Stack>
              {module.is_archived && <Archive size={16} />}
            </Stack>
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}

export default ModuleDropdown;
