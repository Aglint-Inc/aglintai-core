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
import {
  TasksAgentContextType,
  useTasksAgentContext,
} from '@/src/context/TaskContext/TaskContextProvider';
import { CustomDatabase } from '@/src/types/customSchema';
import { RecruiterUserType } from '@/src/types/data.types';
import toast from '@/src/utils/toast';

import { useTaskStatesContext } from '../../TaskStatesContext';
import DateField from './DateField';
import SelectStatus from './SelecteStatus';
export type assigneeType = RecruiterUserType & {
  assignee: 'Agents' | 'Interviewers';
};

function UpdateSubTask({
  subTask,
  taskId,
}: {
  subTask: TasksAgentContextType['tasks'][number]['sub_tasks'][number];
  taskId: string;
}) {
  const { setSelectedSubTaskId, assignerList } = useTaskStatesContext();
  const { handelUpdateSubTask } = useTasksAgentContext();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<assigneeType | null>(
    null,
  );
  const [selectedStatus, setSelectedStatus] = useState<
    CustomDatabase['public']['Enums']['sub_task_status'] | null
  >(null);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleClick = () => {
    const name = nameRef.current.value;
    const start_date = selectedStartDate;
    const completion_date = selectedEndDate;
    const status =
      selectedStatus as CustomDatabase['public']['Enums']['sub_task_status'];

    if (name && selectedAssignee) {
      handelUpdateSubTask({
        SubTaskId: subTask.id,
        data: {
          // ...subTask,
          assignee: [selectedAssignee.user_id],
          name,
          start_date,
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
      assignerList.find(
        (item) => item.user_id === subTask?.assignee[0],
      ) as assigneeType,
    );
    setSelectedEndDate(subTask?.completion_date);
    setSelectedStartDate(subTask?.start_date);
    setSelectedStatus(subTask.status);
  }, []);
  return (
    <Grid
      justifyContent={'center'}
      alignItems={'center'}
      height={'50px'}
      columnSpacing={'10px'}
      container
      ml={'30px'}
    >
      <Grid
        width={'100%'}
        justifyContent={'end'}
        alignItems={'center'}
        display={'flex'}
        item
        sm={1.5}
      >
        <SelectStatus
          status={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </Grid>
      <Grid item sm={3}>
        <TextField
          placeholder='Task name'
          inputRef={nameRef}
          fullWidth
          variant='outlined'
          defaultValue={subTask?.name}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
        />
      </Grid>
      <Grid item sm={2}>
        <DateField
          defaultDate={subTask?.start_date}
          dateRef={dateRef}
          getDate={(e) => {
            if (e) {
              setSelectedStartDate(new Date(e));
            } else {
              setSelectedStartDate(null);
            }
          }}
        />
      </Grid>
      <Grid item sm={2}>
        <DateField
          defaultDate={subTask?.completion_date}
          dateRef={dateRef}
          getDate={(e) => {
            if (e) {
              setSelectedEndDate(new Date(e));
            } else {
              setSelectedEndDate(null);
            }
          }}
        />
      </Grid>
      <Grid item sm={2}>
        <Autocomplete
          fullWidth
          clearIcon
          id='combo-box-demo'
          defaultValue={
            assignerList.find(
              (item) => item.user_id === subTask?.assignee[0],
            ) as assigneeType
          }
          // groupBy={(option) => option.assignee}
          options={assignerList}
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
