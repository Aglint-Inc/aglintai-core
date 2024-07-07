import { DatabaseTable } from '@aglint/shared-types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import {
  setIsScheduleNowOpen,
  setScheduleFlow,
  setStepScheduling,
} from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/store';
import {
  setRequestSessionIds,
  setSelectedSessionIds,
} from '@/src/components/Scheduling/CandidateDetails/store';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';

function RequestAvailabilityList({
  item,
}: {
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
    <GlobalBanner
      color={'warning'}
      iconName={'schedule'}
      textTitle={'Candidate submitted availability'}
      textDescription={
        <div
          dangerouslySetInnerHTML={{
            __html: `Candidate submitted availability on ${dates} for ${selectedTask.session_ids.map((ele: any) => `<b>${ele.name}</b>`)} Interviews.`,
          }}
        ></div>
      }
      slotButtons={
        <>
          <ButtonSolid
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
                setSelectedSessionIds(
                  selectedTask.session_ids.map((ele) => ele.id),
                );
                setRequestSessionIds(
                  selectedTask.session_ids.map((ele) => ele.id),
                );
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
