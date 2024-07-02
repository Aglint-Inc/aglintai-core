import { DatabaseView } from '@aglint/shared-types';
import {
  EmailAgentId,
  PhoneAgentId,
  SystemAgentId,
} from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ShowCode } from '@/src/components/Common/ShowCode';
import {
  setDateRange,
  setIsScheduleNowOpen,
  setScheduleFlow,
  setStepScheduling,
} from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/store';
import {
  setRequestSessionIds,
  setRescheduleSessionIds,
  setSelectedSessionIds,
} from '@/src/components/Scheduling/CandidateDetails/store';
import toast from '@/src/utils/toast';

function TaskActionButtons({
  selectedTask,
}: {
  selectedTask: DatabaseView['tasks_view'];
}) {
  const progress_type = selectedTask?.latest_progress?.progress_type;
  const router = useRouter();
  return (
    <div>
      <ShowCode>
        {/* <ShowCode.When
          isTrue={
            selectedTask.trigger_count === 2 &&
            progress_type === 'call_failed' &&
            selectedTask.assignee[0] === PhoneAgentId
          }
        >
          Call failed
        </ShowCode.When> */}

        <ShowCode.When
          isTrue={
            progress_type === 'request_availability_list' &&
            selectedTask.status !== 'closed' &&
            selectedTask.status !== 'completed'
          }
        >
          <Stack direction='row' spacing={1}>
            <ButtonSolid
              textButton={'Schedule'}
              isLoading={false}
              isLeftIcon={false}
              isRightIcon={false}
              size={1}
              onClickButton={{
                onClick: () => {
                  router.push(
                    `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/application/${selectedTask.application_id}?request_availability_id=${selectedTask.request_availability_id}`,
                  );
                },
              }}
            />
            <ButtonSoft
              textButton={'Request again'}
              isLoading={false}
              isLeftIcon={false}
              isRightIcon={false}
              size={1}
              onClickButton={{
                onClick: () => {
                  setIsScheduleNowOpen(true);
                  setStepScheduling('pick_date');
                  setScheduleFlow('update_request_availibility');
                  router.push(
                    `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/application/${selectedTask.application_id}?candidate_request_availability=${selectedTask.request_availability_id}`,
                  );
                },
              }}
            />
          </Stack>
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            selectedTask.assignee[0] !== EmailAgentId &&
            selectedTask.assignee[0] !== PhoneAgentId &&
            selectedTask.assignee[0] !== SystemAgentId &&
            progress_type === 'schedule' &&
            selectedTask.status !== 'closed' &&
            selectedTask.status !== 'completed'
          }
        >
          <ButtonSolid
            textButton={
              selectedTask.type === 'availability'
                ? 'Request Availability'
                : 'Schedule Now'
            }
            isLoading={false}
            isLeftIcon={false}
            isRightIcon={false}
            size={1}
            onClickButton={{
              onClick: () => {
                setDateRange({
                  start_date: selectedTask.schedule_date_range.start_date,
                  end_date: selectedTask.schedule_date_range.end_date,
                });
                setIsScheduleNowOpen(true);

                setRescheduleSessionIds(
                  selectedTask.session_ids.map((ele) => ele.id),
                );
                setStepScheduling('reschedule');
                if (selectedTask.type === 'availability') {
                  setScheduleFlow('create_request_availibility');
                  setStepScheduling('request_availibility');
                  setRequestSessionIds(
                    selectedTask.session_ids.map((ele) => ele.id),
                  );
                }
                if (selectedTask.type === 'self_schedule') {
                  setScheduleFlow('self_scheduling');
                  setStepScheduling('pick_date');
                  setSelectedSessionIds(
                    selectedTask.session_ids.map((ele) => ele.id),
                  );
                }
                router.push(
                  `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/application/${selectedTask.application_id}?task_id=${selectedTask.id}`,
                );
              },
            }}
          />
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            progress_type === 'request_availability' &&
            selectedTask.status !== 'closed' &&
            selectedTask.status !== 'completed'
          }
        >
          <Stack direction={'row'} spacing={1}>
            <ButtonSolid
              textButton={'Resend invite'}
              isLoading={false}
              isLeftIcon={false}
              isRightIcon={false}
              size={1}
              onClickButton={{
                onClick: () => {
                  axios.post(
                    `/api/emails/sendAvailReqReminder_email_applicant`,
                    {
                      meta: {
                        avail_req_id: selectedTask.request_availability_id,
                      },
                    },
                  );

                  toast.message('Resend invited link sent successfully!');
                },
              }}
            />
            <ButtonSoft
              textButton={'Copy invite'}
              isLoading={false}
              isLeftIcon={false}
              isRightIcon={false}
              size={1}
              onClickButton={{
                onClick: () => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${selectedTask.request_availability_id}`,
                  );
                  toast.message('Invited link copied!');
                },
              }}
            />
          </Stack>
        </ShowCode.When>
        {/* <ShowCode.When
          isTrue={
            progress_type === 'call_failed' || progress_type === 'email_failed'
          }
        >
          failed
        </ShowCode.When> */}
      </ShowCode>
    </div>
  );
}

export default TaskActionButtons;
