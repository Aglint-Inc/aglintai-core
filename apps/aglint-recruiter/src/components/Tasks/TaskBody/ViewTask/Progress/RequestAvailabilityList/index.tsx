import { DatabaseTable } from '@aglint/shared-types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GeneralBanner } from '@/devlink/GeneralBanner';
import Icon from '@/src/components/Common/Icons/Icon';
import {
  setIsScheduleNowOpen,
  setScheduleFlow,
  setStepScheduling,
} from '@/src/components/Scheduling/CandidateDetails/SelfSchedulingDrawer/store';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';

function RequestAvailabilityList({
  item,
  disable,
}: {
  disable: boolean;
  item: DatabaseTable['new_tasks_progress'];
}) {
  const router = useRouter();
  const { tasks: taskList } = useTasksContext();
  const tasks = taskList.filter(
    (ele) => ele.type !== 'empty' && ele.application_id,
  );
  let selectedTask = tasks.find((item) => item.id === router.query?.task_id);
  const dates =
    item.jsonb_data?.dates &&
    (item.jsonb_data?.dates as string[]).map(
      (date) => `<b>
      ${dayjs(date).format('DD MMM')}</b>`,
    );

  return (
    <GeneralBanner
      titleColorProps={{
        style: {
          color: 'var(--info-11)',
        },
      }}
      textHeading={'Candidate submitted availability'}
      textDesc={
        <div
          dangerouslySetInnerHTML={{
            __html: `Candidate submitted availability on ${dates} for ${selectedTask.session_ids.map((ele: any) => `<b>${ele.name}</b>`)} Interviews.`,
          }}
        ></div>
      }
      slotHeadingIcon={<Icon height={'16'} width={'20'} variant='Check' />}
      slotButton={
        <>
          <ButtonSolid
            isDisabled={
              disable ||
              selectedTask.candidate_request_availability?.booking_confirmed ||
              !selectedTask.candidate_request_availability?.slots
            }
            textButton={'Schedule'}
            isLoading={false}
            isLeftIcon={false}
            isRightIcon={false}
            size={1}
            onClickButton={{
              onClick: () => {
                router.push(
                  `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/application/${selectedTask.application_id}?request_availability_id=${selectedTask.candidate_request_availability.id}`,
                );
              },
            }}
          />
          <ButtonSoft
            isDisabled={
              disable ||
              selectedTask.candidate_request_availability?.booking_confirmed ||
              !selectedTask.candidate_request_availability?.slots
            }
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
                  `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/application/${selectedTask.application_id}?candidate_request_availability=${selectedTask.candidate_request_availability.id}`,
                );
              },
            }}
          />
        </>
      }
    />
  );
}

export default RequestAvailabilityList;
