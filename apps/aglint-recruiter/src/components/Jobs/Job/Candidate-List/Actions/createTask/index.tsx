import { DatabaseEnums, DB } from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { MoveAssessment } from '@/devlink2/MoveAssessment';
import { Skeleton } from '@/devlink2/Skeleton';
import { MemberType } from '@/src/components/Scheduling/InterviewTypes/types';
import {
  CallIcon,
  EmailIcon,
} from '@/src/components/Tasks/TaskBody/AddNewTask';
import SelectScheduleDate from '@/src/components/Tasks/TaskBody/AddNewTask/SelectScheduleDate';
import SessionList from '@/src/components/Tasks/TaskBody/AddNewTask/SessionList';
import { meetingCardType } from '@/src/components/Tasks/TaskBody/ViewTask/Progress/SessionCard';
import { assigneeType } from '@/src/components/Tasks/utils';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJob } from '@/src/context/JobContext';
import { BodyParamsFetchUserDetails } from '@/src/pages/api/scheduling/fetchUserDetails';

import SelectDateTime from './SelectDateTime';
import TaskOwners from './TaskOwners';

export type TaskType = {
  assignee: string[];
  schedule_date_range: { start_date: string; end_date: string };
  session_ids: any[];
  task_owner: string;
  status: DB['public']['Enums']['task_status'];
  priority: DB['public']['Enums']['task_priority'];
  type: DB['public']['Enums']['task_type_enum'];
  due_date: string;
  start_date: string;
  name: string;
};
function CreateTask({
  setTask,
  applications,
  job_id,
  priority,
  setPriority,
}: {
  setTask: Dispatch<SetStateAction<TaskType>>;
  applications: string[];
  job_id: string;
  priority: 'urgent' | 'standard';
  setPriority: Dispatch<SetStateAction<'urgent' | 'standard'>>;
}) {
  const [assignerList, setAssignerList] = useState<MemberType[]>([]);
  const { recruiterUser, recruiter_id } = useAuthDetails();
  const {
    job: { hiring_manager, recruiting_coordinator, sourcer, recruiter },
  } = useApplications();

  const [scheduleDate, setScheduleDate] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: dayjs().add(1, 'day').toString(),
    end_date: dayjs().add(7, 'day').toString(),
  });

  const [selectedSession, setSelectedSession] = useState<meetingCardType[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<MemberType | null>(
    null,
  );

  const [selectCallDate, setSelectCallDate] = useState(
    dayjs().add(5, 'minute').toString(),
  );
  const {
    interviewPlans: { data },
  } = useJob();
  const interview_session = data?.interview_session;
  useEffect(() => {
    if (interview_session && assignerList.length) {
      setSelectedSession(
        interview_session
          .slice(0, 2)
          .map((ele) => ({ id: ele.id, name: ele.name }) as meetingCardType),
      );
      if (hiring_manager || recruiting_coordinator || sourcer || recruiter) {
        setSelectedAssignee(
          assignerList.find((ele) => ele.user_id === recruiting_coordinator),
        );
      }
      setTask((pre) => {
        const preTask = { ...pre };
        return {
          ...preTask,
          session_ids: interview_session.slice(0, 2),
          schedule_date_range: {
            start_date: dayjs().add(1, 'day').toString(),
            end_date: dayjs().add(7, 'day').toString(),
          },
          start_date: dayjs().add(5, 'minute').toString(),
          due_date: dayjs().add(1, 'day').toString(),
          assignee: [
            assignerList.find((ele) =>
              ele.user_id === recruiting_coordinator
                ? recruiting_coordinator
                : recruiterUser.user_id,
            )?.user_id ?? null,
          ],
          task_owner: assignerList.find(
            (ele) => ele.user_id === recruiterUser.user_id,
          )?.user_id,
        };
      });
    }
  }, [interview_session, assignerList]);

  async function getMemberList({ recruiter_id }: { recruiter_id: string }) {
    const bodyParams: BodyParamsFetchUserDetails = {
      recruiter_id: recruiter_id,
      includeSupended: true,
    };
    const resMem = (await axios.post(
      '/api/scheduling/fetchUserDetails',
      bodyParams,
    )) as { data: MemberType[] };
    const members = resMem.data;
    setAssignerList(members);
  }
  useEffect(() => {
    if (recruiter_id) getMemberList({ recruiter_id });
  }, [recruiter_id]);
  return (
    <>
      <Stack mx={'10px'} mb={'10px'}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as 'urgent' | 'standard')
            }
          >
            <FormControlLabel
              defaultValue={'standard'}
              value={'standard'}
              control={<Radio />}
              label='Standard'
            />
            <FormControlLabel
              value='urgent'
              control={<Radio />}
              label='Urgent'
            />
          </RadioGroup>
        </FormControl>
      </Stack>

      <MoveAssessment
        slotPriority={<>asd</>}
        slotStatus={<>sdx</>}
        slotInterviewDate={
          <SelectScheduleDate
            scheduleDate={scheduleDate}
            onChange={(e: any) => {
              if (e[1]) {
                setScheduleDate({
                  start_date: dayjs(e[0]).toString(),
                  end_date: dayjs(e[1]).toString(),
                });
                setTask((pre) => {
                  const preTask = { ...pre };
                  return {
                    ...preTask,
                    schedule_date_range: {
                      start_date: dayjs(e[0]).toString(),
                      end_date: dayjs(e[1]).toString(),
                    },
                    due_date: dayjs(e[0]).toString(),
                  };
                });
              } else {
                setScheduleDate({
                  start_date: dayjs(e[0]).toString(),
                  end_date: null,
                });
                setTask((pre) => {
                  const preTask = { ...pre };
                  return {
                    ...preTask,
                    schedule_date_range: {
                      start_date: dayjs(e[0]).toString(),
                      end_date: null,
                    },
                    due_date: dayjs(e[0]).toString(),
                  };
                });
              }
            }}
          />
        }
        slotInterview={
          <SessionList
            selectedSession={selectedSession}
            setSelectedSession={setSelectedSession}
            application_id={applications[0]}
            job_id={job_id}
            onChange={({ sessions }) => {
              setTask((pre) => {
                const preTask = { ...pre };
                return {
                  ...preTask,
                  session_ids: sessions,
                };
              });
            }}
          />
        }
        slotAssignedTo={
          !assignerList?.length ? (
            <Stack position={'relative'} width={'100px'} height={'20px'}>
              <Skeleton />
            </Stack>
          ) : (
            <TaskOwners
              hiringTeamIds={[
                hiring_manager,
                recruiting_coordinator,
                sourcer,
                recruiter,
              ]}
              hideAgents={false}
              assignerList={assignerList}
              selectedAssignee={selectedAssignee}
              setSelectedAssignee={setSelectedAssignee}
              isOptionList={false}
              onChange={(owner: assigneeType) => {
                setTask((pre) => {
                  const status =
                    owner.user_id === EmailAgentId ||
                    owner.user_id === PhoneAgentId
                      ? ('scheduled' as DatabaseEnums['task_status'])
                      : ('not_started' as DatabaseEnums['task_status']);

                  const preTask = { ...pre };
                  return {
                    ...preTask,
                    task_owner: owner.user_id,
                    assignee: [owner.user_id],
                    status: status,
                  };
                });
              }}
            />
          )
        }
        slotWhentoCall={
          <SelectDateTime
            selectCallDate={selectCallDate}
            setSelectCallDate={setSelectCallDate}
            onChange={(e: any) => {
              setTask((pre) => {
                const preTask = { ...pre };
                return {
                  ...preTask,
                  start_date: dayjs(e).toString(),
                };
              });
            }}
          />
        }
        isPriorityVisible={false}
        isAssignedToVisible={true}
        isInterviewDateVisible={true}
        isInterviewVisible={true}
        isStatusVisible={false}
        isWhentoCallVisible={
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
            <EmailIcon />
          ) : (
            <CallIcon />
          )
        }
      />
    </>
  );
}

export default CreateTask;
