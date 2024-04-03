import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IconCheck, IconX } from '@tabler/icons-react';
import { capitalize } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { AgentPill } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useInterviewerList } from '@/src/components/CompanyDetailComp/Interviewers';
import {
  TasksAgentContextType,
  useTasksAgentContext,
} from '@/src/context/TaskContext/TaskContextProvider';
import { CustomDatabase } from '@/src/types/customSchema';
import { RecruiterUserType } from '@/src/types/data.types';
import toast from '@/src/utils/toast';

import { useTaskStatesContext } from '../../TaskStatesContext';
import { EmailAgentId, PhoneAgentId } from '../../utils';
import DateField from './DateField';
export type assigneeType = RecruiterUserType & {
  assignee: 'Agents' | 'Interviewers';
};
const agentsDetails = [
  {
    user_id: EmailAgentId,
    first_name: 'email',
    last_name: 'agent',
    profile_image: '',
  },
  {
    user_id: PhoneAgentId,
    first_name: 'phone',
    last_name: 'agent',
    profile_image: '',
  },
];
function UpdateSubTask({
  subTask,
  taskId,
}: {
  subTask: TasksAgentContextType['tasks'][number]['sub_tasks'][number];
  taskId: string;
}) {
  // const { members } = useAuthDetails();
  const { data: interviewers } = useInterviewerList();
  const members = interviewers.map((item) => item.rec_user);
  const assigner = [...agentsDetails, ...members];

  const { setSelectedSubTaskId } = useTaskStatesContext();
  const { handelUpdateSubTask } = useTasksAgentContext();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLInputElement | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<assigneeType | null>(
    null,
  );

  const [selectedDate, setSelectedDate] = useState(null);

  function getDate(e: any) {
    if (e) {
      setSelectedDate(new Date(e));
    } else {
      setSelectedDate(null);
    }
  }

  const handleClick = () => {
    const name = nameRef.current.value;
    const completion_date = selectedDate;
    const status = statusRef.current
      .value as CustomDatabase['public']['Enums']['sub_task_status'];

    if (name && selectedAssignee) {
      handelUpdateSubTask({
        SubTaskId: subTask.id,
        data: {
          // ...subTask,
          assignee: [selectedAssignee.user_id],
          name,
          completion_date,
          agent:
            selectedAssignee.first_name === 'email'
              ? 'email'
              : selectedAssignee.first_name === 'phone'
                ? 'call'
                : 'job',
          status,
          task_id: taskId,
        },
      });
      setSelectedSubTaskId(null);
    } else {
      if (!name) return toast.warning('Please provide task description');
      if (!selectedAssignee) return toast.warning('Please select a assignee');
    }
  };
  useEffect(() => {
    setSelectedAssignee(
      assigner.find(
        (item) => item.user_id === subTask?.assignee[0],
      ) as assigneeType,
    );
    setSelectedDate(subTask?.completion_date);
  }, []);
  return (
    <Grid columnGap={'10px'} container>
      <Grid item sm={2}>
        <Autocomplete
          fullWidth
          clearIcon
          id='combo-box-demo'
          options={['pending', 'in_progress', 'completed', 'closed']}
          defaultValue={subTask?.status || 'pending'}
          // onChange={(e, value) => {
          //   setSelectedStatus(value);
          // }}
          renderInput={(params) => (
            <TextField
              placeholder='Select status'
              variant='outlined'
              inputRef={statusRef}
              {...params}
            />
          )}
        />
      </Grid>
      <Grid item sm={4}>
        <TextField
          placeholder='Task name'
          inputRef={nameRef}
          fullWidth
          variant='outlined'
          defaultValue={subTask?.name}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
        />
        {/* <TextArea
          dataList={assigner as assigneeType[]}
          onChange={(event) => {
            console.log(event.html);
          }}
          value={subTask.name}
          onClick={handleClick}
        /> */}
      </Grid>
      <Grid item sm={2}>
        <DateField
          defaultDate={subTask?.completion_date}
          dateRef={dateRef}
          getDate={getDate}
        />
      </Grid>

      <Grid item sm={2}>
        <Autocomplete
          fullWidth
          clearIcon
          id='combo-box-demo'
          defaultValue={
            assigner.find(
              (item) => item.user_id === subTask?.assignee[0],
            ) as assigneeType
          }
          // groupBy={(option) => option.assignee}
          options={assigner}
          getOptionLabel={(option) => {
            const fullName =
              (option.first_name || '') + ' ' + (option.last_name || '');
            return capitalize(fullName);
          }}
          renderOption={(props, option) => {
            const fullName =
              (option.first_name || '') + ' ' + (option.last_name || '');
            if (option.first_name === 'email') {
              return (
                <Box component='li' {...props}>
                  <AgentPill isEmailAgentVisible isPhoneAgentVisible={false} />
                </Box>
              );
            }
            if (option.first_name === 'phone') {
              return (
                <Box
                  component='li'
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <AgentPill isPhoneAgentVisible isEmailAgentVisible={false} />
                </Box>
              );
            }
            return (
              <Box
                component='li'
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
                  <MuiAvatar
                    height={'30px'}
                    width={'30px'}
                    src={option.profile_image}
                    variant='circular'
                    fontSize='14px'
                    level={capitalize(fullName)}
                  />
                  <Typography variant='subtitle2'>
                    {capitalize(fullName)}
                  </Typography>
                </Stack>
              </Box>
            );
          }}
          onChange={(e, value) => {
            setSelectedAssignee(value as assigneeType);
          }}
          renderInput={(params) => (
            <TextField
              placeholder='Select assignee'
              variant='outlined'
              {...params}
            />
          )}
        />
      </Grid>
      <Grid item sm={1}>
        <Stack
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1}
        >
          <Stack
            sx={{
              bgcolor: 'green.100',
              display: 'flex',
              justifyContent: 'center',
              border: '1px solid',
              borderColor: 'green.400',
              borderRadius: '5px',
            }}
          >
            <IconButton onClick={handleClick} color='success'>
              <IconCheck />
            </IconButton>
          </Stack>
          <Stack
            sx={{
              bgcolor: 'red.100',
              display: 'flex',
              justifyContent: 'center',
              border: '1px solid',
              borderColor: 'red.400',
              borderRadius: '5px',
            }}
          >
            <IconButton
              onClick={() => {
                setSelectedSubTaskId(null);
              }}
              color='error'
            >
              <IconX />
            </IconButton>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default UpdateSubTask;
