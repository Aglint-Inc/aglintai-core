import { DB } from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import {
  Box,
  Collapse,
  Drawer,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { CreateTask } from '@/devlink3/CreateTask';
import { InterviewTaskPill } from '@/devlink3/InterviewTaskPill';
import { ViewTaskCard } from '@/devlink3/ViewTaskCard';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { ApiBodyParamsScheduleAgent } from '@/src/pages/api/scheduling/application/schedulewithagent';
import {
  ApiRequestInterviewSessionTask,
  ApiResponseInterviewSessionTask,
} from '@/src/pages/api/scheduling/fetch_interview_session_task';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import AssigneeChip from '../../Components/AssigneeChip';
import SelectStatus from '../../Components/SelectStatus';
import { useTaskStatesContext } from '../../TaskStatesContext';
import {
  assigneeType,
  extractDataFromText,
  JobCandidatesType,
} from '../../utils';
import { meetingCardType } from '../ViewTask/Progress/SessionCard';
import AssigneeList from './AssigneeList';
import CandidateList from './CandidateList';
import JobList from './JobList';
import PriorityList from './PriorityList';
import SelectDueDate from './SelecteDueDate';
import SelectScheduleDate from './SelectScheduleDate';
import SessionList from './SessionList';
import TriggerTime from './TriggerTime';
import TypeList from './TypeList';

function AddNewTask() {
  const { recruiterUser, recruiter } = useAuthDetails();
  const {
    showAddNew,
    setShowAddNew,
    assignerList,
    selectedGroupTask,
    setSelectedGroupTask,
    isImmediate,
    selectedGroupBy,
  } = useTaskStatesContext();
  const { handelAddTask } = useTasksContext();
  const {
    jobs: { data: jobs },
  } = useJobs();
  const [inputData, setInputData] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<DB['public']['Enums']['task_status']>('not_started');

  const [selectedType, setSelectedType] =
    useState<DB['public']['Enums']['task_type_enum']>('schedule');

  const [selectedJob, setSelectedJob] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const [selectedCandidate, setSelectedCandidate] =
    useState<JobCandidatesType>(null);
  const [candidates, setCandidates] = useState<JobCandidatesType[] | null>(
    null,
  );

  const [sessionList, setSessionList] = useState<meetingCardType[] | null>(
    null,
  );
  const [selectedSession, setSelectedSession] = useState<meetingCardType[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<assigneeType | null>(
    null,
  );
  const [selectedDueDate, setSelectedDueDate] = useState<string>(
    dayjs().add(1, 'day').toString(),
  );
  const [selectTriggerTime, setSelectTriggerTime] = useState<string>(
    dayjs().add(5, 'minute').toString(),
  );

  const [scheduleDate, setScheduleDate] = useState({
    start_date: dayjs().add(1, 'day').toString(),
    end_date: dayjs().add(7, 'day').toString(),
  });
  const [selectedPriority, setSelectedPriority] =
    useState<DB['public']['Enums']['task_priority']>('medium');

  const [aiload, setAiLoad] = useState(false);

  async function handleCreate() {
    if (!selectedSession.length) {
      toast.warning('Please select an interview session.');
      return;
    }
    if (!selectedCandidate?.candidates?.email) {
      toast.warning('No email associated with this candidate.');
      return;
    }
    if (!selectedAssignee?.user_id) {
      toast.warning('Please select an assignee.');
      return;
    }

    handelAddTask({
      assignee: [selectedAssignee?.user_id],
      task_owner: selectedAssignee?.user_id,
      created_by: recruiterUser?.user_id || null,
      application_id: selectedCandidate?.id || null,
      name: inputData || 'Untitled',
      due_date: dayjs(selectedDueDate).toString(),
      start_date: dayjs(selectTriggerTime).toString(),
      recruiter_id: recruiter.id,
      schedule_date_range: scheduleDate,
      type: selectedType || 'schedule',
      status:
        (selectedAssignee?.user_id === EmailAgentId ||
          selectedAssignee?.user_id === PhoneAgentId) &&
        isImmediate
          ? 'in_progress'
          : (selectedAssignee?.user_id === EmailAgentId ||
                selectedAssignee?.user_id === PhoneAgentId) &&
              !isImmediate
            ? 'scheduled'
            : 'not_started',
      priority: selectedPriority,
    }).then(async (data) => {
      const { data: selectedTask } = await supabase
        .from('new_tasks')
        .select(
          '*, applications(* , candidates( * ), public_jobs( * )), recruiter_user(*)',
        )
        .eq('id', data.id)
        .single();

      await supabase.from('task_session_relation').insert(
        selectedSession.map((ele) => ({
          session_id: ele.id,
          task_id: selectedTask.id,
        })),
      );

      const assignee = selectedTask.assignee[0];
      if (
        isImmediate &&
        (assignee === EmailAgentId || assignee === PhoneAgentId)
      ) {
        await axios.post('/api/scheduling/application/schedulewithagent', {
          application_id: selectedTask.application_id,
          dateRange: { ...selectedTask.schedule_date_range },
          recruiter_id: recruiter.id,
          recruiter_user_name:
            recruiterUser.first_name + ' ' + recruiterUser.last_name,
          session_ids: selectedSession.map((ele) => ele.id),
          task_id: selectedTask.id,
          type:
            assignee === EmailAgentId
              ? 'email_agent'
              : assignee === PhoneAgentId
                ? 'phone_agent'
                : null,
          candidate_name: selectedTask.applications.candidates?.first_name,
          company_name: recruiter?.name,
          rec_user_phone: recruiterUser.phone,
          rec_user_id: recruiterUser.user_id,
          user_tz: dayjs.tz.guess(),
          trigger_count: 0,
        } as ApiBodyParamsScheduleAgent);
      }
      // end
    });
    handleClose();
  }

  async function getSessionList() {
    const {
      data: { data },
    } = await axios.post('/api/scheduling/fetch_interview_session_task', {
      application_id: selectedCandidate.id,
      job_id: selectedJob.id,
    } as ApiRequestInterviewSessionTask);
    const sessions = data as ApiResponseInterviewSessionTask['data'];
    setSessionList(
      sessions.map(
        (ele) =>
          ({
            id: ele.id,
            name: ele.name,
          }) as meetingCardType,
      ),
    );
    return data as ApiResponseInterviewSessionTask['data'];
  }
  useEffect(() => {
    if (selectedCandidate) {
      getSessionList();
      setSelectedSession([]);
    }
  }, [selectedCandidate]);

  async function getCandidates() {
    const { data, error } = await supabase
      .from('applications')
      .select('* ,candidates( * )')
      .eq('job_id', selectedJob?.id);
    if (error) throw Error(error.message);
    else {
      setCandidates(data);
    }
  }
  useEffect(() => {
    if (selectedJob?.id) {
      getCandidates();
      setSelectedSession([]);
    }
  }, [selectedJob, jobs]);
  useEffect(() => {
    setSelectedStatus('not_started');
    setSelectedPriority('medium');
    defaultValueSet();
  }, [selectedGroupBy, selectedGroupTask]);

  function defaultValueSet() {
    switch (selectedGroupBy.label) {
      case 'candidate':
        setSelectedJob({
          name: selectedGroupTask?.applications.public_jobs.job_title,
          id: selectedGroupTask?.applications.public_jobs.id,
        });
        setSelectedCandidate(selectedGroupTask?.applications);
        break;
      case 'job':
        setSelectedJob({
          name: selectedGroupTask?.applications.public_jobs.job_title,
          id: selectedGroupTask?.applications.public_jobs.id,
        });
        break;
      case 'priority':
        setSelectedPriority(selectedGroupTask?.priority);
        break;
      case 'status':
        setSelectedStatus(selectedGroupTask?.status);
        break;
      case 'assignee':
        setSelectedAssignee(
          assignerList.find(
            (assignee) => assignee.user_id === selectedGroupTask?.assignee[0],
          ),
        );
        break;
      default:
        break;
    }
  }
  const handleClose = () => {
    setShowAddNew(false);
    setSelectedAssignee(null);
    setSelectedJob(null);
    setSelectedCandidate(null);
    setSelectedSession([]);
    setSessionList(null);
    setCandidates([]);
    setSelectedGroupTask(null);
    setInputData('');
    setSelectedPriority('medium');
  };

  // open trigger Time
  const [openTriggerTime, setOpenTriggerTime] = useState(null);
  const spanRef = useRef(null);
  return (
    <Drawer anchor={'right'} open={showAddNew} onClose={handleClose}>
      <CreateTask
        onClickClose={{
          onClick: handleClose,
        }}
        onClickCancel={{
          onClick: handleClose,
        }}
        textPrimaryButton={
          <>
            <ShowCode>
              <ShowCode.When
                isTrue={selectedAssignee?.user_id === EmailAgentId}
              >
                Email Now
              </ShowCode.When>
              <ShowCode.When
                isTrue={selectedAssignee?.user_id === PhoneAgentId}
              >
                Call Now
              </ShowCode.When>
              <ShowCode.Else>Create</ShowCode.Else>
            </ShowCode>
          </>
        }
        slotButtonIcon={<></>}
        onClickPrimaryButton={{
          onClick: handleCreate,
        }}
        textTaskDetail={
          <Stack minHeight={48}>
            <TextField
              InputProps={{
                endAdornment: aiload && (
                  <Stack
                    sx={{
                      '& svg': {
                        height: '25px',
                        width: '25px',
                      },
                    }}
                    position={'absolute'}
                    right={'var(--space-2)'}
                  >
                    <Loader />
                  </Stack>
                ),
              }}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              multiline
              minRows={1}
              maxRows={3}
              fullWidth
              placeholder='Untitled'
              onChange={(e) => {
                setInputData(e.target.value);
              }}
              value={inputData}
              inputRef={inputRef}
              onKeyDown={async (e) => {
                if (inputData.trim() && e.shiftKey && e.key === 'Enter') {
                  e.preventDefault();
                  setAiLoad(true);
                  await extractDataFromText(
                    inputData,
                    recruiterUser.user_id,
                  ).then((data: any) => {
                    setSelectedAssignee(
                      assignerList.find((ele) => ele.user_id === data.assignee),
                    );
                    setSelectedDueDate(String(new Date(data.end_date)));
                    setScheduleDate({
                      start_date: String(new Date(data.start_date)),
                      end_date: String(new Date(data.end_date)),
                    });
                  });
                  setAiLoad(false);
                }
              }}
              sx={{
                '& .MuiInputBase-root': {
                  border: 'none',
                  fontSize: 'var(--font-size-3)',
                  lineHeight: 'var(--line-height-3)',
                  fontWeight: 500,
                  padding: 'var(--space-2)',
                  bgcolor: 'var(--neutral-2)',
                  borderRadius: 'var(--radius-4)',
                },
              }}
            />

            <Collapse
              in={inputData && inputData.toLowerCase().includes('schedule')}
            >
              <ShowCode>
                <ShowCode.When isTrue={sessionList && !!sessionList.length}>
                  <Typography ml={1} fontSize={'14px'} variant='caption'>
                    Select Session
                  </Typography>
                  <Stack
                    overflow={'hidden'}
                    direction={'row'}
                    flexWrap={'wrap'}
                  >
                    {sessionList &&
                      sessionList.map((item, i) => {
                        return (
                          <Stack
                            key={i}
                            p={'var(--space-1)'}
                            onClick={() => {
                              //   @ts-ignore
                              setSelectedSession((pre: any[]) => {
                                if (
                                  pre
                                    .map((ele: { id: any }) => ele.id)
                                    .includes(item.id)
                                ) {
                                  setInputData((pre) =>
                                    pre.replaceAll(` ${item.name}`, ''),
                                  );
                                  inputRef.current.focus();
                                  return pre.filter(
                                    (ele: { id: string }) => ele.id !== item.id,
                                  );
                                }
                                setInputData((pre) => pre + ' ' + item.name);
                                inputRef.current.focus();
                                return [item, ...pre];
                              });
                            }}
                          >
                            {/* <InterviewTaskPill
                                  textInterviewName={item.name}
                                /> */}
                            <InterviewTaskPill
                              onClickPill={{
                                style: {
                                  backgroundColor:
                                    selectedSession
                                      .map((ele) => ele.id)
                                      .includes(item.id) && '#90caf988',
                                  fontSize: '14px',
                                  cursor: 'pointer',
                                },
                              }}
                              textInterviewName={item.name}
                            />
                          </Stack>
                        );
                      })}
                  </Stack>
                </ShowCode.When>
                <ShowCode.Else>
                  <Typography ml={1} fontSize={'14px'} variant='caption'>
                    Sessions are not available!
                  </Typography>
                </ShowCode.Else>
              </ShowCode>
            </Collapse>
          </Stack>
        }
        slotViewTaskCard={
          <>
            {/* <ShowCode> */}
            {/* <ShowCode.When isTrue={aiload}>
                <Stack
                  width={'100%'}
                  top={10}
                  position={'absolute'}
                  height='600px'
                >
                  <Loader />
                </Stack>
              </ShowCode.When>
            </ShowCode> */}
            <Box sx={{ padding: '0 16px' }}>
              <ViewTaskCard
                isPriorityVisible={true}
                slotPriorityPill={
                  <PriorityList
                    selectedPriority={selectedPriority}
                    setSelectedPriority={setSelectedPriority}
                  />
                }
                slotType={
                  <TypeList
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                  />
                }
                slotJob={
                  <JobList
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                    isOptionList={
                      selectedGroupBy.label !== 'candidate' &&
                      selectedGroupBy.label !== 'job'
                    }
                  />
                }
                isCandidateVisible={!!selectedJob?.id}
                isInterviewVisible={!!selectedJob?.id}
                slotCandidate={
                  <CandidateList
                    selectedCandidate={selectedCandidate}
                    setSelectedCandidate={setSelectedCandidate}
                    candidates={candidates}
                    isOptionList={selectedGroupBy.label !== 'candidate'}
                  />
                }
                slotInterviewTaskPill={
                  <SessionList
                    selectedSession={selectedSession}
                    setSelectedSession={setSelectedSession}
                    application_id={selectedCandidate?.id}
                    job_id={selectedJob?.id}
                  />
                }
                slotInterviewDate={
                  <SelectScheduleDate
                    scheduleDate={scheduleDate}
                    onChange={(e: any) => {
                      if (e[1]) {
                        setScheduleDate({ start_date: e[0], end_date: e[1] });
                        setSelectedDueDate(e[0]);
                      } else {
                        setScheduleDate({ start_date: e[0], end_date: null });
                        setSelectedDueDate(e[0]);
                      }
                    }}
                  />
                }
                slotCreatedBy={
                  <AssigneeChip
                    disableHoverListener={false}
                    assigneeId={recruiterUser.user_id}
                  />
                }
                slotDueDate={
                  <SelectDueDate
                    selectedDueDate={selectedDueDate}
                    setSelectedDueDate={setSelectedDueDate}
                  />
                }
                slotAssignedTo={
                  <Stack width={'100%'} direction={'column'}>
                    <AssigneeList
                      hideAgents={
                        selectedType === 'availability' ||
                        selectedType === 'self_schedule'
                      }
                      selectedAssignee={selectedAssignee}
                      setSelectedAssignee={setSelectedAssignee}
                      onChange={(assigner: any) => {
                        if (
                          assigner.user_id === EmailAgentId ||
                          assigner.user_id === PhoneAgentId
                        ) {
                          setOpenTriggerTime(spanRef.current);
                          setSelectedStatus('scheduled');
                        } else {
                          setSelectedStatus('not_started');
                        }
                      }}
                    />
                    <span ref={spanRef}></span>
                  </Stack>
                }
                slotWhenToCall={
                  <TriggerTime
                    selectTriggerTime={selectTriggerTime}
                    setSelectTriggerTime={setSelectTriggerTime}
                    openTriggerTime={openTriggerTime}
                    setOpenTriggerTime={setOpenTriggerTime}
                  />
                }
                slotStatus={
                  <SelectStatus
                    setSelectedStatus={setSelectedStatus}
                    status={selectedStatus}
                    isOptionList={false}
                  />
                }
                isWhenToCallVisible={
                  selectedAssignee?.user_id === EmailAgentId ||
                  selectedAssignee?.user_id === PhoneAgentId
                }
                textWhenToCall={
                  selectedAssignee?.user_id === EmailAgentId
                    ? 'When to mail'
                    : 'When to call'
                }
                slotWhentoCallIcon={
                  selectedAssignee?.user_id === EmailAgentId ? (
                    <GlobalIcon iconName='mail' color={'neutral-8'} />
                  ) : (
                    <GlobalIcon iconName='phone_in_talk' color={'neutral-8'} />
                  )
                }
              />
            </Box>
          </>
        }
      />
    </Drawer>
  );
}

export default AddNewTask;

export const CallIcon = () => {
  return (
    <GlobalIcon iconName='phone_in_talk' color={'neutral-8'} />
    // <svg
    //   width='15'
    //   height='16'
    //   viewBox='0 0 15 16'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    //   display='flex'
    // >
    //   <path
    //     d='M7.875 2C8.92188 2.01563 9.86719 2.27344 10.7109 2.77344C11.5547 3.27344 12.2266 3.94531 12.7266 4.78906C13.2266 5.63281 13.4844 6.57812 13.5 7.625C13.4844 7.85938 13.3594 7.98438 13.125 8C12.8906 7.98438 12.7656 7.85938 12.75 7.625C12.7188 6.25 12.2422 5.10156 11.3203 4.17969C10.3984 3.25781 9.25 2.78125 7.875 2.75C7.64062 2.73437 7.51562 2.60938 7.5 2.375C7.51562 2.14062 7.64062 2.01563 7.875 2ZM8.25 6.5C8.46875 6.5 8.64844 6.57031 8.78906 6.71094C8.92969 6.85156 9 7.03125 9 7.25C9 7.46875 8.92969 7.64844 8.78906 7.78906C8.64844 7.92969 8.46875 8 8.25 8C8.03125 8 7.85156 7.92969 7.71094 7.78906C7.57031 7.64844 7.5 7.46875 7.5 7.25C7.5 7.03125 7.57031 6.85156 7.71094 6.71094C7.85156 6.57031 8.03125 6.5 8.25 6.5ZM7.5 4.625C7.51562 4.39062 7.64062 4.26562 7.875 4.25C8.82812 4.28125 9.625 4.60938 10.2656 5.23438C10.8906 5.875 11.2188 6.67188 11.25 7.625C11.2344 7.85938 11.1094 7.98438 10.875 8C10.6406 7.98438 10.5156 7.85938 10.5 7.625C10.4844 6.875 10.2266 6.25781 9.72656 5.77344C9.24219 5.27344 8.625 5.01562 7.875 5C7.64062 4.98438 7.51562 4.85938 7.5 4.625ZM9.21094 8.72656C9.52344 8.38281 9.89062 8.28906 10.3125 8.44531L12.9375 9.57031C13.1406 9.66406 13.2969 9.8125 13.4062 10.0156C13.5 10.2031 13.5234 10.4062 13.4766 10.625L12.9141 13.25C12.7891 13.7188 12.4844 13.9688 12 14C11.8594 14 11.7188 14 11.5781 14C11.4688 13.9844 11.3594 13.9766 11.25 13.9766C9.40625 13.8203 7.75781 13.2656 6.30469 12.3125C4.83594 11.3594 3.67188 10.1172 2.8125 8.58594C1.95312 7.07031 1.51562 5.375 1.5 3.5C1.53125 3.01562 1.78125 2.71094 2.25 2.58594L4.875 2.02344C5.09375 1.97656 5.29688 2 5.48438 2.09375C5.6875 2.20313 5.83594 2.35937 5.92969 2.5625L7.05469 5.1875C7.21094 5.60938 7.11719 5.97656 6.77344 6.28906L5.83594 7.0625C6.47656 8.15625 7.34375 9.02344 8.4375 9.66406L9.21094 8.72656ZM12 13.25C12.0938 13.25 12.1562 13.2031 12.1875 13.1094L12.75 10.4844C12.7656 10.3906 12.7266 10.3203 12.6328 10.2734L10.0078 9.14844C9.92969 9.11719 9.85938 9.13281 9.79688 9.19531L9.02344 10.1562C8.74219 10.4375 8.42188 10.4922 8.0625 10.3203C6.84375 9.61719 5.88281 8.65625 5.17969 7.4375C5.00781 7.07812 5.0625 6.76562 5.34375 6.5L6.30469 5.70312C6.36719 5.64062 6.38281 5.57031 6.35156 5.49219L5.22656 2.86719C5.19531 2.77344 5.125 2.73437 5.01562 2.75L2.39062 3.3125C2.29688 3.34375 2.25 3.40625 2.25 3.5C2.26562 5.3125 2.71094 6.95312 3.58594 8.42188C4.44531 9.89062 5.60938 11.0547 7.07812 11.9141C8.54688 12.7891 10.1875 13.2344 12 13.25Z'
    //     fill='#68737D'
    //   />
    // </svg>
  );
};

export const EmailIcon = () => {
  return (
    <GlobalIcon iconName='mail' color={'neutral-8'} />
    // <svg
    //   width='15'
    //   height='16'
    //   viewBox='0 0 15 16'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    //   display='flex'
    // >
    //   <path
    //     d='M3 4.25C2.78125 4.25 2.60156 4.32031 2.46094 4.46094C2.32031 4.60156 2.25 4.78125 2.25 5V5.9375L6.84375 9.28906C7.28125 9.58594 7.71875 9.58594 8.15625 9.28906L12.75 5.9375V5C12.75 4.78125 12.6797 4.60156 12.5391 4.46094C12.3984 4.32031 12.2188 4.25 12 4.25H3ZM2.25 6.875V11C2.25 11.2188 2.32031 11.3984 2.46094 11.5391C2.60156 11.6797 2.78125 11.75 3 11.75H12C12.2188 11.75 12.3984 11.6797 12.5391 11.5391C12.6797 11.3984 12.75 11.2188 12.75 11V6.875L8.60156 9.89844C8.27344 10.1484 7.90625 10.2734 7.5 10.2734C7.09375 10.2734 6.72656 10.1484 6.39844 9.89844L2.25 6.875ZM1.5 5C1.51562 4.57812 1.66406 4.22656 1.94531 3.94531C2.22656 3.66406 2.57812 3.51563 3 3.5H12C12.4219 3.51563 12.7734 3.66406 13.0547 3.94531C13.3359 4.22656 13.4844 4.57812 13.5 5V11C13.4844 11.4219 13.3359 11.7734 13.0547 12.0547C12.7734 12.3359 12.4219 12.4844 12 12.5H3C2.57812 12.4844 2.22656 12.3359 1.94531 12.0547C1.66406 11.7734 1.51562 11.4219 1.5 11V5Z'
    //     fill='#68737D'
    //   />
    // </svg>
  );
};
