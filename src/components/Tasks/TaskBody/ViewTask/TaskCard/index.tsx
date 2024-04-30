import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import {
  AvatarWithName,
  InterviewTaskPill,
  ListCard,
  ViewTaskCard,
} from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { fetchInterviewSessionTask } from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  TasksAgentContextType,
  useTasksContext,
} from '@/src/context/TasksContextProvider/TasksContextProvider';
import {
  CustomDatabase,
  DatabaseEnums,
  DatabaseTableUpdate,
} from '@/src/types/customSchema';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import SelectStatus from '../../../Components/SelectStatus';
import { AssignerType, useTaskStatesContext } from '../../../TaskStatesContext';
import {
  assigneeType,
  createTaskProgress,
  EmailAgentId,
  PhoneAgentId,
} from '../../../utils';
import { CallIcon, EmailIcon } from '../../AddNewTask';
import AssigneeList from '../../AddNewTask/AssigneeList';
import PriorityList from '../../AddNewTask/PriorityList';
import SelectDueDate from '../../AddNewTask/SelecteDueDate';
import SelectScheduleDate from '../../AddNewTask/SelectScheduleDate';
import SessionList from '../../AddNewTask/SessionList';
import TriggerTime from '../../AddNewTask/TriggerTime';

function TaskCard({ task }: { task: TasksAgentContextType['tasks'][number] }) {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const { handelUpdateTask } = useTasksContext();
  const { assignerList, setIsImmediate } = useTaskStatesContext();
  const [sessionList, setSessionList] = useState<Awaited<
    ReturnType<typeof fetchInterviewSessionTask>
  > | null>([]);
  const [selectedSession, setSelectedSession] = useState([]);

  const [scheduleDate, setScheduleDate] = useState({
    start_date: null,
    end_date: null,
  });
  const [selectedAssignee, setSelectedAssignee] = useState<assigneeType | null>(
    null,
  );
  const [selectedDueDate, setSelectedDueDate] = useState<string>(null);
  const [selectTriggerTime, setSelectTriggerTime] = useState<string>(null);
  const [selectedPriority, setSelectedPriority] =
    useState<CustomDatabase['public']['Enums']['task_priority']>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<DatabaseEnums['task_status']>(null);
  async function getSessionList() {
    const data = await fetchInterviewSessionTask({
      application_id: task?.application_id,
      job_id: task.applications?.job_id,
    });
    setSessionList(data);
    return data;
  }
  useEffect(() => {
    if (task) {
      setScheduleDate({ ...task.schedule_date_range });
      setSelectedSession([...task.session_ids]);
      setSelectedDueDate(task.due_date);
      setSelectTriggerTime(task.start_date);
      setSelectedPriority(task.priority);
      setSelectedStatus(task.status);
      const assigner = assignerList.find(
        (ele) => ele.user_id === task.assignee[0],
      );
      setSelectedAssignee(assigner);
      setIsImmediate(false);
      getSessionList();
    }
  }, [router.query?.task_id, assignerList]);

  async function updateChanges(data: DatabaseTableUpdate['new_tasks']) {
    handelUpdateTask([
      {
        id: task.id,
        ...data,
      },
    ]);
  }

  const createdBy = assignerList.find((ele) => ele.user_id === task.created_by);

  // open trigger Time
  const [openTriggerTime, setOpenTriggerTime] = useState(null);
  const spanRef = useRef(null);
  let overDueText = '';
  let toDayDateTime = dayjs();
  let dueDateTime = dayjs(task.due_date);
  if (dueDateTime.isBefore(toDayDateTime)) {
    overDueText = '(overdue)';
    // eslint-disable-next-line no-console
    console.log(overDueText);
  }
  return (
    <>
      <ViewTaskCard
        slotType={
          <InterviewTaskPill textInterviewName={capitalize(task.type)} />
        }
        slotJob={capitalizeAll(task?.applications?.public_jobs?.job_title)}
        slotCandidate={
          task.application_id && (
            <ListCard
              isAvatarWithNameVisible={true}
              isListVisible={false}
              slotAvatarWithName={
                task.applications?.candidates && (
                  <AvatarWithName
                    isAvatarVisible={false}
                    isCandidateIconVisible={true}
                    isRoleVisible={false}
                    isReverseShadowVisible={false}
                    isShadowVisible={false}
                    slotAvatar={<></>}
                    isTickVisible={false}
                    // slotAvatar={}
                    textName={capitalizeAll(
                      task.applications.candidates?.first_name +
                        ' ' +
                        (task.applications.candidates?.last_name ?? ''),
                    )}
                  />
                )
              }
            />
          )
        }
        slotInterviewTaskPill={
          <SessionList
            selectedSession={selectedSession}
            setSelectedSession={setSelectedSession}
            sessionList={sessionList}
            isOptionList={task.status === 'not_started'}
            onChange={(data: any) => {
              updateChanges({ session_ids: data });
            }}
          />
        }
        slotInterviewDate={
          <SelectScheduleDate
            scheduleDate={scheduleDate}
            isOptionList={task.status === 'not_started'}
            onChange={(e) => {
              if (Array.isArray(e)) {
                if (e[0] && e[1]) {
                  updateChanges({
                    schedule_date_range: {
                      start_date: dayjs(e[0]).toString(),
                      end_date: dayjs(e[1]).toString(),
                    },
                    due_date: dayjs(e[0]).toString(),
                  });
                  setScheduleDate({
                    start_date: dayjs(e[0]).toString(),
                    end_date: dayjs(e[1]).toString(),
                  });
                  setSelectedDueDate(dayjs(e[0]).toString());
                  createTaskProgress({
                    type: 'schedule_date_update',
                    data: {
                      task_id: router.query.task_id as string,
                      created_by: {
                        name: recruiterUser.first_name,
                        id: recruiterUser.user_id,
                      },
                      progress_type: 'standard',
                    },
                    optionData: {
                      scheduleDateRange: {
                        start_date: dayjs(e[0]).toString(),
                        end_date: dayjs(e[1]).toString(),
                      },
                      prevScheduleDateRange: {
                        start_date: task.schedule_date_range.start_date,
                        end_date: task.schedule_date_range.end_date,
                      },
                    },
                  });
                }
              }
              if (!Array.isArray(e)) {
                setScheduleDate({
                  start_date: dayjs(e).toString(),
                  end_date: null,
                });
                updateChanges({
                  schedule_date_range: {
                    start_date: dayjs(e).toString(),
                    end_date: null,
                  },
                  due_date: dayjs(e).toString(),
                });
                setSelectedDueDate(dayjs(e).toString());
                createTaskProgress({
                  type: 'schedule_date_update',
                  data: {
                    task_id: router.query.task_id as string,
                    created_by: {
                      name: recruiterUser.first_name,
                      id: recruiterUser.user_id,
                    },
                    progress_type: 'standard',
                  },
                  optionData: {
                    scheduleDateRange: {
                      start_date: dayjs(e).toString(),
                      end_date: null,
                    },
                    prevScheduleDateRange: {
                      start_date: task.schedule_date_range.start_date,
                      end_date: task.schedule_date_range.end_date,
                    },
                  },
                });
              }
            }}
          />
        }
        slotCreatedBy={
          createdBy && (
            <ListCard
              isAvatarWithNameVisible={true}
              isListVisible={false}
              slotAvatarWithName={
                createdBy && (
                  <AvatarWithName
                    slotAvatar={
                      <MuiAvatar
                        height={'25px'}
                        width={'25px'}
                        src={createdBy.profile_image}
                        variant='circular'
                        fontSize='14px'
                        level={capitalizeAll(
                          createdBy.first_name +
                            ' ' +
                            (createdBy.last_name ?? ''),
                        )}
                      />
                    }
                    textName={capitalizeAll(
                      createdBy.first_name + ' ' + (createdBy.last_name ?? ''),
                    )}
                  />
                )
              }
            />
          )
        }
        slotDueDate={
          <SelectDueDate
            selectedDueDate={selectedDueDate}
            setSelectedDueDate={setSelectedDueDate}
            isOptionList={task.status === 'not_started'}
            onChange={(e: any) => {
              updateChanges({ due_date: dayjs(e).toString() });
            }}
          />
        }
        slotAssignedTo={
          <Stack direction={'column'}>
            <AssigneeList
              selectedAssignee={selectedAssignee}
              setSelectedAssignee={setSelectedAssignee}
              onChange={(assigner: AssignerType) => {
                // createProgress(assigner);
                if (task.assignee[0] !== assigner.user_id) {
                  updateChanges({ assignee: [assigner.user_id] });
                  createTaskProgress({
                    type: 'create_task',
                    data: {
                      task_id: router.query.task_id as string,
                      created_by: {
                        name: recruiterUser.first_name,
                        id: recruiterUser.user_id,
                      },
                      progress_type: 'standard',
                    },
                    optionData: {
                      assignerName:
                        assigner.first_name + ' ' + (assigner.last_name ?? ''),
                      assignerId: assigner.user_id,
                      creatorName:
                        recruiterUser.first_name +
                        ' ' +
                        (recruiterUser.last_name ?? ''),
                    },
                  });

                  if (
                    assigner.user_id === EmailAgentId ||
                    assigner.user_id === PhoneAgentId
                  ) {
                    setOpenTriggerTime(spanRef.current);
                    setSelectedStatus('scheduled');
                  } else {
                    setSelectedStatus('not_started');
                  }
                }
              }}
              isOptionList={task.status === 'not_started'}
            />
            <span ref={spanRef}></span>
          </Stack>
        }
        slotWhenToCall={
          <>
            <TriggerTime
              selectTriggerTime={selectTriggerTime}
              setSelectTriggerTime={setSelectTriggerTime}
              isOptionList={task.status === 'not_started'}
              openTriggerTime={openTriggerTime}
              setOpenTriggerTime={setOpenTriggerTime}
              onChange={(e: any) => {
                updateChanges({
                  start_date: dayjs(e).toString(),
                });
                createTaskProgress({
                  type: 'trigger_time_update',
                  data: {
                    task_id: router.query.task_id as string,
                    created_by: {
                      name: recruiterUser.first_name,
                      id: recruiterUser.user_id,
                    },
                    progress_type: 'standard',
                  },
                  optionData: {
                    triggerTime: { prev: task.start_date, current: e },
                  },
                });
              }}
            />
          </>
        }
        slotStatus={
          <SelectStatus
            setSelectedStatus={setSelectedStatus}
            status={selectedStatus}
            // isOptionList={task.status === 'not_started'}
            onChange={(e: any) => {
              const status = e as DatabaseEnums['task_status'];
              updateChanges({ status });
              if (task.status !== status) {
                createTaskProgress({
                  type: 'status_update',
                  data: {
                    task_id: router.query.task_id as string,
                    created_by: {
                      name: recruiterUser.first_name as string,
                      id: recruiterUser.user_id as string,
                    },
                    progress_type: 'standard',
                  },
                  optionData: {
                    currentStatus: task.status,
                    status: status,
                  },
                });
              }
            }}
          />
        }
        isWhenToCallVisible={
          task?.assignee[0] === EmailAgentId ||
          task?.assignee[0] === PhoneAgentId
        }
        textWhenToCall={
          task?.assignee[0] === EmailAgentId ? 'When to mail' : 'When to call'
        }
        slotWhentoCallIcon={
          task?.assignee[0] === EmailAgentId ? <EmailIcon /> : <CallIcon />
        }
        isPriorityVisible={true}
        slotPriorityPill={
          <PriorityList
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            isOptionList={task.status === 'not_started'}
            onChange={(e: DatabaseEnums['task_priority']) => {
              updateChanges({ priority: e });
            }}
          />
        }
      />
    </>
  );
}

export default TaskCard;
