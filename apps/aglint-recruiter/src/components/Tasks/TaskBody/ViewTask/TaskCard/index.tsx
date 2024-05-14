import {
  CustomDatabase,
  DatabaseEnums,
  DatabaseTableUpdate,
} from '@aglint/shared-types';
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
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  TasksAgentContextType,
  useTasksContext,
} from '@/src/context/TasksContextProvider/TasksContextProvider';
import {
  capitalizeAll,
  capitalizeFirstLetter,
} from '@/src/utils/text/textUtils';

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
import { meetingCardType } from '../Progress/SessionCard';

function TaskCard({ task }: { task: TasksAgentContextType['tasks'][number] }) {
  const router = useRouter();
  const { recruiterUser, members } = useAuthDetails();
  const { handelUpdateTask } = useTasksContext();
  const { assignerList, setIsImmediate } = useTaskStatesContext();

  const [selectedSession, setSelectedSession] = useState<meetingCardType[]>([]);

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

  useEffect(() => {
    if (task) {
      setScheduleDate({ ...task.schedule_date_range });
      setSelectedSession([...task.session_ids] as meetingCardType[]);
      setSelectedDueDate(task.due_date);
      setSelectTriggerTime(task.start_date);
      setSelectedPriority(task.priority);
      setSelectedStatus(task.status);
      const assigner = assignerList.find(
        (ele) => ele.user_id === task.assignee[0],
      );
      setSelectedAssignee(assigner);
      setIsImmediate(false);
    }
  }, [router.query?.task_id, assignerList, task]);

  async function updateChanges(data: DatabaseTableUpdate['new_tasks']) {
    handelUpdateTask([
      {
        id: task.id,
        ...data,
      },
    ]);
  }

  const createdBy = members.find((ele) => ele.user_id === task.created_by);
  // open trigger Time
  const [openTriggerTime, setOpenTriggerTime] = useState(null);
  const spanRef = useRef(null);

  return (
    <>
      <ViewTaskCard
        slotType={
          <InterviewTaskPill textInterviewName={capitalize(task.type)} />
        }
        slotJob={capitalizeFirstLetter(
          task?.applications?.public_jobs?.job_title,
        )}
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
            application_id={task.applications.id}
            job_id={task.applications.job_id}
            isOptionList={task.status === 'not_started'}
            onChange={(data: any) => {
              updateChanges({ session_ids: data });
              createTaskProgress({
                type: 'session_update',
                data: {
                  task_id: router.query.task_id as string,
                  created_by: {
                    name: recruiterUser.first_name,
                    id: recruiterUser.user_id,
                  },
                  progress_type: 'standard',
                },
                optionData: {
                  currentSessions: task.session_ids as any,
                  selectedSession: data,
                },
              });
            }}
          />
        }
        slotInterviewDate={
          <SelectScheduleDate
            scheduleDate={scheduleDate}
            isOptionList={task.status === 'not_started'}
            onChange={(e: any[]) => {
              if (e[1]) {
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
              } else {
                updateChanges({
                  schedule_date_range: {
                    start_date: dayjs(e[0]).toString(),
                    end_date: null,
                  },
                  due_date: dayjs(e[0]).toString(),
                });
                setScheduleDate({
                  start_date: dayjs(e[0]).toString(),
                  end_date: null,
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
            <AssigneeList
              isOptionList={false}
              setSelectedAssignee={setSelectedAssignee}
              selectedAssignee={createdBy as any}
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
              createTaskProgress({
                type: 'due_date_update',
                data: {
                  task_id: router.query.task_id as string,
                  created_by: {
                    name: recruiterUser.first_name as string,
                    id: recruiterUser.user_id as string,
                  },
                  progress_type: 'standard',
                },
                optionData: {
                  dueDate: {
                    prev: dayjs(task.due_date).toString(),
                    selectedDate: dayjs(e).toString(),
                  },
                },
              });
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
                  const currentAssignee = assignerList.find(
                    (ele) => ele.user_id === task.assignee[0],
                  );
                  updateChanges({ assignee: [assigner.user_id] });
                  createTaskProgress({
                    type: 'change_assignee',
                    data: {
                      task_id: router.query.task_id as string,
                      created_by: {
                        name: recruiterUser.first_name,
                        id: recruiterUser.user_id,
                      },
                      progress_type: 'standard',
                    },
                    optionData: {
                      assignerId: assigner.user_id,
                      currentAssigneeId: task.assignee[0],
                      assignerName:
                        assigner.first_name + ' ' + (assigner.last_name ?? ''),
                      currentAssigneeName:
                        currentAssignee.first_name +
                        ' ' +
                        (currentAssignee.last_name ?? ''),
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
              if (task.status !== status) {
                updateChanges({ status });
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
            onChange={async (e: DatabaseEnums['task_priority']) => {
              if (e !== task.priority) {
                updateChanges({ priority: e });
                createTaskProgress({
                  type: 'priority_update',
                  data: {
                    task_id: router.query.task_id as string,
                    created_by: {
                      name: recruiterUser.first_name as string,
                      id: recruiterUser.user_id as string,
                    },
                    progress_type: 'standard',
                  },
                  optionData: {
                    currentPriority: task.priority,
                    priority: e,
                  },
                });
              }
            }}
          />
        }
      />
    </>
  );
}

export default TaskCard;
