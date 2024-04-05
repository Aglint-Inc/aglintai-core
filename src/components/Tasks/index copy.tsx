import {
  Autocomplete,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApplicationType } from '@/src/context/CandidateAssessment/types';
import { useJobs } from '@/src/context/JobsContext';
import { useTasksAgentContext } from '@/src/context/TaskContext/TaskContextProvider';
import { Job } from '@/src/queries/job/types';
import { CandidateType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

import { ShowCode } from '../Common/ShowCode';

type JobCandidatesType = ApplicationType & {
  candidates: CandidateType;
};

function Tasks() {
  const { tasks, handelAddTask, handelAddSubTask } = useTasksAgentContext();
  const { recruiter } = useAuthDetails();
  const {
    jobs: { data: jobs },
  } = useJobs();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCandidate, setSelectedCandidate] =
    useState<JobCandidatesType | null>(null);

  const [candidates, setCandidates] = useState<JobCandidatesType[] | null>(
    null,
  );

  const [selectedIndex, setSelectedIndex] = useState(null);

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
  if (tasks)
    return (
      <Stack direction={'row'} gap={2} p={2}>
        <Stack direction={'column'} gap={2} width={'60%'}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant='subtitle1'>Tasks</Typography>
          </Stack>
          <Stack
            direction={'row'}
            spacing={'10px'}
            p={1}
            border={'1px solid #dddddd'}
            borderRadius={'10px'}
          >
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
                  placeholder='Select Candidate application'
                  variant='outlined'
                  {...params}
                />
              )}
            />
            <Button
              sx={{
                width: '100px',
              }}
              onClick={() => {
                handelAddTask({
                  name: selectedJob.job_title,
                  application_id: selectedCandidate.id,
                  status: 'in_progress',
                  recruiter_id: recruiter.id,
                });
              }}
              variant='contained'
              color='info'
            >
              Create
            </Button>
          </Stack>

          <Stack>
            {tasks.map((item, index1) => {
              return (
                <div key={index1}>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Stack
                      alignItems={'center'}
                      spacing={'10px'}
                      direction={'row'}
                    >
                      <Checkbox
                        color='info'
                        edge='start'
                        // defaultChecked={value.status === 'completed'}
                        tabIndex={-1}
                        disableRipple
                        // onChange={({ target: { value } }) => {
                        //   console.log('object', value);
                        // }}
                      />
                      <Typography variant='subtitle1'>{item.name}</Typography>
                      <Typography variant='body1'>
                        (
                        {item.applications.candidates.first_name +
                          ' ' +
                          item.applications.candidates.last_name}
                        )
                      </Typography>
                    </Stack>
                    {/* <Typography variant='body2'>
                      (
                      {item.coordinate.first_name +
                        ' ' +
                        item.coordinate.last_name}
                      )
                    </Typography> */}
                  </Stack>
                  <List
                    sx={{
                      width: '100%',
                      // maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >
                    {item.sub_tasks.map((value, index2) => {
                      const labelId = `checkbox-list-label-${index2}`;
                      return (
                        <ListItem key={index2} disablePadding>
                          <ListItemButton
                            role={undefined}
                            //   onClick={handleToggle(value)}
                            dense
                          >
                            {/* <ListItemIcon> */}
                            <Checkbox
                              color='info'
                              edge='start'
                              defaultChecked={value.status === 'completed'}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                              // onChange={({ target: { value } }) => {
                              //   console.log('object', value);
                              // }}
                            />
                            {/* </ListItemIcon> */}
                            <ShowCode>
                              <ShowCode.When
                                isTrue={
                                  selectedIndex?.index2 === index2 &&
                                  selectedIndex?.index1 === index1
                                }
                              >
                                <ListItemText>
                                  <TextField
                                    // eslint-disable-next-line jsx-a11y/no-autofocus
                                    autoFocus={true}
                                    fullWidth
                                    defaultValue={value.name}
                                    variant='standard'
                                    // onChange={(e) => {
                                    //   console.log(value.status, e.target.value);
                                    // }}
                                    onBlur={() => {
                                      setSelectedIndex(null);
                                    }}
                                  />
                                </ListItemText>
                              </ShowCode.When>
                              <ShowCode.Else>
                                <ListItemText
                                  onClick={() => {
                                    setSelectedIndex({
                                      index2: index2,
                                      index1: index1,
                                    });
                                  }}
                                  id={labelId}
                                  primary={value.name}
                                />
                              </ShowCode.Else>
                            </ShowCode>
                            <Stack width={'200px'}>
                              <Autocomplete
                                clearIcon
                                id='combo-box-demo'
                                options={[
                                  'Completed',
                                  'Call Pending',
                                  'Call Cancelled',
                                  'Pending',
                                  'Call End',
                                  'Closed',
                                ]}
                                defaultValue={value.status}
                                renderInput={(params) => (
                                  <TextField
                                    variant='outlined'
                                    {...params}
                                    // label='Status'
                                  />
                                )}
                              />
                            </Stack>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                    <Button
                      onClick={() => {
                        handelAddSubTask({
                          taskId: item.id,
                          data: {
                            name: 'Untitled',
                            // task_date: String(new Date()),
                            status: 'in_progress',
                            // agent_id: '',
                            id: crypto.randomUUID(),
                            agent: 'call',
                            assignee: [''],
                            completion_date: '',
                            task_id: '',
                          },
                        });
                        setSelectedIndex({
                          index1: index1,
                          index2: item.sub_tasks.length,
                        });
                      }}
                      sx={{
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <IconPlus size={16} />{' '}
                      <Typography variant='body2'> Add new task</Typography>
                    </Button>
                  </List>
                </div>
              );
            })}
          </Stack>
        </Stack>
        <Stack direction={'column'} gap={2} width={'40%'}>
          <Typography variant='subtitle1'> Track Task Status</Typography>
        </Stack>
      </Stack>
    );
}

export default Tasks;
