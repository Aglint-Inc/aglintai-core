import { DatabaseEnums, DatabaseTableUpdate, DB } from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { IconButton, Stack, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { InterviewTaskPill } from '@/devlink3/InterviewTaskPill';
import { ViewTaskCard } from '@/devlink3/ViewTaskCard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  TasksAgentContextType,
  useTasksContext,
} from '@/src/context/TasksContextProvider/TasksContextProvider';
import { supabase } from '@/src/utils/supabase/client';
import {
  capitalizeAll,
  capitalizeFirstLetter,
} from '@/src/utils/text/textUtils';

import AssigneeChip from '../../../Components/AssigneeChip';
import SelectStatus from '../../../Components/SelectStatus';
import { AssignerType, useTaskStatesContext } from '../../../TaskStatesContext';
import { assigneeType, createTaskProgress } from '../../../utils';
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
    useState<DB['public']['Enums']['task_priority']>(null);
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

  async function updateSessionRelations({
    action,
    session_id,
  }: {
    action: 'add' | 'remove';
    session_id: string;
  }) {
    if (action === 'add') {
      const { data } = await supabase
        .from('task_session_relation')
        .insert({ task_id: task.id, session_id })
        .select();

      return data;
    } else if (action === 'remove') {
      await supabase
        .from('task_session_relation')
        .delete()
        .eq('session_id', session_id)
        .eq('task_id', task.id)
        .then(() => {});
    }
  }

  const createdBy = members.find((ele) => ele.user_id === task.created_by);
  // open trigger Time
  const [openTriggerTime, setOpenTriggerTime] = useState(null);
  const spanRef = useRef(null);

  return (
    <>
      <ViewTaskCard
        slotType={
          <InterviewTaskPill
            textInterviewName={capitalizeFirstLetter(task.type)}
          />
        }
        slotJob={
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
          >
            {capitalizeFirstLetter(task?.applications?.public_jobs?.job_title)}
            <Tooltip
              enterDelay={1000}
              arrow
              title={<Stack>Go to Schedule</Stack>}
            >
              <IconButton
                onClick={() => {
                  window.open(`/jobs/${task?.applications?.public_jobs.id}`);
                }}
              >
                <GlobalIcon iconName={'open_in_new'} />
              </IconButton>
            </Tooltip>
          </Stack>
        }
        slotCandidate={
          task.applications?.candidates && (
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              width={'100%'}
            >
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
              <Tooltip
                enterDelay={1000}
                arrow
                title={<Stack>Go to Schedule</Stack>}
              >
                <IconButton
                  onClick={() => {
                    window.open(
                      `/scheduling/application/${task.application_id}?tab=candidate_detail`,
                    );
                  }}
                >
                  <GlobalIcon iconName={'open_in_new'} />
                </IconButton>
              </Tooltip>
            </Stack>
          )
        }
        slotInterviewTaskPill={
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
          >
            <SessionList
              selectedSession={selectedSession}
              setSelectedSession={setSelectedSession}
              application_id={task.applications.id}
              job_id={task.applications.job_id}
              isOptionList={task.status === 'not_started'}
              onChange={({ sessions, selected_session_id, action }) => {
                updateSessionRelations({
                  action,
                  session_id: selected_session_id,
                });

                createTaskProgress({
                  type: 'session_update',
                  data: {
                    task_id: router.query.task_id as string,
                    created_by: {
                      name: recruiterUser.first_name,
                      id: recruiterUser.user_id,
                    },
                    progress_type:
                      task.latest_progress?.progress_type || 'standard',
                  },
                  optionData: {
                    currentSessions: task.session_ids as any,
                    selectedSession: sessions,
                  },
                });
              }}
            />
            <Tooltip
              enterDelay={1000}
              arrow
              title={<Stack>Go to Schedule</Stack>}
            >
              <IconButton
                onClick={() => {
                  window.open(`/scheduling/application/${task.application_id}`);
                }}
              >
                <GlobalIcon iconName={'open_in_new'} />
              </IconButton>
            </Tooltip>
          </Stack>
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
                    progress_type:
                      task.latest_progress?.progress_type || 'standard',
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
                    progress_type:
                      task.latest_progress?.progress_type || 'standard',
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
            <AssigneeChip
              disableHoverListener={false}
              assigneeId={createdBy.user_id}
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
                  progress_type:
                    task.latest_progress?.progress_type || 'standard',
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
          <Stack width={'100%'} direction={'column'}>
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
                      progress_type:
                        task.latest_progress?.progress_type || 'standard',
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
                    progress_type:
                      task.latest_progress?.progress_type || 'standard',
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
                    progress_type:
                      task.latest_progress?.progress_type || 'standard',
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
                    progress_type:
                      task.latest_progress?.progress_type || 'standard',
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
