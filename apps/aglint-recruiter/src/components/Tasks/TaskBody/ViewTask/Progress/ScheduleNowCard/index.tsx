import { DatabaseView } from '@aglint/shared-types';
import { useRouter } from 'next/router';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GeneralBanner } from '@/devlink/GeneralBanner';
import Icon from '@/src/components/Common/Icons/Icon';
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
function ScheduleNowCard({
  selectedTask,
}: {
  selectedTask: DatabaseView['tasks_view'];
}) {
  const router = useRouter();

  return (
    <GeneralBanner
      titleColorProps={{
        style: {
          color: 'var(--info-11)',
        },
      }}
      textHeading={'Schedule interview'}
      textDesc={'Please select a date and time to schedule your interview.'}
      slotHeadingIcon={<Icon height={'16'} width={'20'} variant='Check' />}
      slotButton={
        <>
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
        </>
      }
    />
  );
}

export default ScheduleNowCard;
