import {
  Autocomplete,
  Dialog,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

import { ConfirmationPopup } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApplicationType } from '@/src/context/CandidateAssessment/types';
import { useJobs } from '@/src/context/JobsContext';
import { useTasksAgentContext } from '@/src/context/TaskContext/TaskContextProvider';
import { Job } from '@/src/queries/job/types';
import { CandidateType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

import { useTaskStatesContext } from '../../TaskStatesContext';

type JobCandidatesType = ApplicationType & {
  candidates: CandidateType;
};

function AddTask() {
  const { recruiter, recruiterUser } = useAuthDetails();
  const { addTaskPopUp, setAddTaskPopUp } = useTaskStatesContext();
  const { handelAddTask } = useTasksAgentContext();
  const {
    jobs: { data: jobs },
  } = useJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCandidate, setSelectedCandidate] =
    useState<JobCandidatesType | null>(null);

  const [candidates, setCandidates] = useState<JobCandidatesType[] | null>(
    null,
  );

  async function getCandidates() {
    const { data, error } = await supabase
      .from('applications')
      .select('* ,candidates( * )')
      .eq('job_id', selectedJob?.id);
    if (error) throw Error(error.message);
    else setCandidates(data);
  }
  useEffect(() => {
    if (selectedJob) {
      getCandidates();
    }
  }, [selectedJob]);

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
        },
      }}
      open={addTaskPopUp}
      onClose={() => {
        setAddTaskPopUp(false);
      }}
    >
      <ConfirmationPopup
        textPopupTitle={'Create Task Group'}
        isIcon={false}
        textPopupDescription={
          <Stack spacing={'10px'}>
            {/* <Typography variant='body2'>Group Name</Typography>

            <TextField
              placeholder='Enter group name'
              inputRef={nameRef}
              fullWidth
              variant='outlined'
            /> */}
            <Typography variant='body2'>Job</Typography>
            <Autocomplete
              fullWidth
              clearIcon
              id='combo-box-demo'
              options={jobs}
              getOptionLabel={(option) => {
                return capitalize(option.job_title);
              }}
              onChange={(e, value) => {
                setSelectedJob(value);
              }}
              renderInput={(params) => (
                <TextField
                  placeholder='Select job application'
                  variant='outlined'
                  {...params}
                />
              )}
            />
            <Typography variant='body2'>Candidate</Typography>
            <Autocomplete
              fullWidth
              clearIcon
              id='combo-box-demo'
              options={candidates || []}
              getOptionLabel={(option) => {
                const fullName =
                  (option.candidates.first_name || '') +
                  ' ' +
                  (option.candidates.last_name || '');
                return capitalize(fullName);
              }}
              onChange={(e, value) => {
                setSelectedCandidate(value);
              }}
              renderInput={(params) => (
                <TextField
                  placeholder='Select Candidate'
                  variant='outlined'
                  {...params}
                />
              )}
            />
          </Stack>
        }
        textPopupButton={'Create'}
        onClickAction={{
          onClick: () => {
            handelAddTask({
              name:
                selectedJob.job_title +
                ` (${selectedCandidate.candidates.first_name + ' ' + selectedCandidate.candidates.last_name})`,
              application_id: selectedCandidate.id,
              status: 'in_progress',
              recruiter_id: recruiter.id,
              created_by: {
                name: recruiterUser.first_name + ' ' + recruiterUser.last_name,
                id: recruiterUser.user_id,
              },
            });
            setAddTaskPopUp(false);
          },
        }}
        isGreyButtonVisible={false}
        onClickCancel={{
          onClick: () => {
            setAddTaskPopUp(false);
          },
        }}
      />
    </Dialog>
  );
}

export default AddTask;
