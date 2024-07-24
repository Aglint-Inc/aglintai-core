import { PhoneAgentId } from '@aglint/shared-utils';
import { Dialog, Typography } from '@mui/material';
import {
  DesktopDateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { PopupAgentFollowup } from '@/devlink3/PopupAgentFollowup';
import { RadioWithText } from '@/devlink3/RadioWithText';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { ApiBodyParamsScheduleAgent } from '@/src/pages/api/scheduling/application/schedulewithagent';
import { getFullName } from '@/src/utils/jsonResume';

import { useTaskStatesContext } from '../../TaskStatesContext';
import { createTaskProgress } from '../../utils';

function PhoneFollowUp() {
  const router = useRouter();
  const { tasks, handelUpdateTask } = useTasksContext();
  const { recruiterUser, recruiter } = useAuthDetails();
  const { openPhoneFollowUp, setOpenPhoneFollowUp, assignerList } =
    useTaskStatesContext();
  const [isImmediate, setIsImmediate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().add(5, 'minute').toString(),
  );
  function closePopUp() {
    setOpenPhoneFollowUp(false);
  }

  async function handleClick() {
    const selectedTask = tasks.find((ele) => ele.id === router.query?.task_id);
    const currentAssignee = assignerList.find(
      (ele) => ele.user_id === selectedTask.assignee[0],
    );
    const assigner = assignerList.find((ele) => ele.user_id === PhoneAgentId);
    handelUpdateTask([
      { id: selectedTask.id, assignee: [PhoneAgentId], status: 'scheduled' },
    ]);
    if (currentAssignee.user_id !== assigner.user_id) {
      createTaskProgress({
        type: 'change_assignee',
        data: {
          task_id: selectedTask.id,
          created_by: {
            name: recruiterUser.first_name,
            id: recruiterUser.user_id,
          },
          progress_type: 'standard',
        },
        optionData: {
          assignerId: assigner.user_id,
          currentAssigneeId: currentAssignee.user_id,
          assignerName: getFullName(assigner.first_name, assigner.last_name),
          currentAssigneeName: getFullName(
            currentAssignee.first_name,
            currentAssignee.last_name,
          ),
        },
      });
    }
    if (!isImmediate) {
      handelUpdateTask([
        { id: selectedTask.id, start_date: selectedDate, status: 'scheduled' },
      ]);
      createTaskProgress({
        type: 'trigger_time_update',
        data: {
          task_id: selectedTask.id,
          created_by: {
            name: recruiterUser.first_name,
            id: recruiterUser.user_id,
          },
          progress_type: 'standard',
        },
        optionData: {
          triggerTime: {
            prev: dayjs(selectedTask.start_date).toString(),
            current: selectedDate,
          },
        },
      });
    }
    if (isImmediate) {
      await axios.post('/api/scheduling/application/schedulewithagent', {
        application_id: selectedTask.application_id,
        dateRange: { ...selectedTask.schedule_date_range },
        recruiter_id: recruiter.id,
        recruiter_user_name: getFullName(
          recruiterUser.first_name,
          recruiterUser.last_name,
        ),
        session_ids: selectedTask.session_ids.map((ele) => ele?.id),
        task_id: selectedTask.id,
        type: 'phone_agent',
        candidate_name: selectedTask.applications.candidates?.first_name,
        company_name: recruiter?.name,
        rec_user_phone: recruiterUser.phone,
        rec_user_id: recruiterUser.user_id,
        user_tz: dayjs.tz.guess(),
        trigger_count: 0,
        job_id: selectedTask.applications.public_jobs.id,
      } as ApiBodyParamsScheduleAgent);
    }
    closePopUp();
  }
  return (
    <Dialog open={openPhoneFollowUp} onClose={closePopUp} maxWidth={'md'}>
      <DcPopup
        popupName='Make a  phone call'
        onClickClosePopup={{ onClick: closePopUp }}
        slotButtons={
          <>
            <>
              <ButtonSoft
                textButton='Cancel'
                size={2}
                color={'neutral'}
                onClickButton={{ onClick: closePopUp }}
              />
              <ButtonSolid
                textButton={isImmediate ? 'Call now' : 'Schedule Call'}
                size={2}
                onClickButton={{ onClick: handleClick }}
              />
            </>
          </>
        }
        slotBody={
          <>
            <Typography mb={2}>
              Assignee will be changed to phone agent
            </Typography>
            <PopupAgentFollowup
              isImmediately={isImmediate}
              isScheduleLater={!isImmediate}
              slotRadioWithText={
                <>
                  <RadioWithText
                    onClickRadio={{
                      onClick: () => {
                        setIsImmediate(true);
                      },
                    }}
                    isSelected={isImmediate}
                    textRadio={'Immediate'}
                  />
                  <RadioWithText
                    onClickRadio={{
                      onClick: () => {
                        setIsImmediate(false);
                      },
                    }}
                    isSelected={!isImmediate}
                    textRadio={'Scheduler'}
                  />
                </>
              }
              slotDateTimePicker={
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDateTimePicker
                    onAccept={(e) => {
                      setSelectedDate(dayjs(e).toString());
                    }}
                    sx={{
                      '&': {
                        color: 'var(--error-11) !important',
                        bgcolor: 'var(--error-3) !important',
                        width: '100%',
                      },
                    }}
                    slotProps={{
                      layout: {
                        sx: {
                          bgcolor: 'var(--error-3) !important',
                        },
                      },
                    }}
                    defaultValue={dayjs('2022-04-17T15:30')}
                    orientation='landscape'
                  />
                </LocalizationProvider>
              }
            />
          </>
        }
      />
    </Dialog>
  );
}

export default PhoneFollowUp;
