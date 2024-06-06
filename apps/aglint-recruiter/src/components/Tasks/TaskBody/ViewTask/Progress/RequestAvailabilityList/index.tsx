import { useRouter } from 'next/router';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GeneralBanner } from '@/devlink/GeneralBanner';
import Icon from '@/src/components/Common/Icons/Icon';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';

function RequestAvailabilityList() {
  const router = useRouter();
  const { tasks: taskList } = useTasksContext();
  const tasks = taskList.filter(
    (ele) => ele.type !== 'empty' && ele.application_id,
  );
  let selectedTask = tasks.find((item) => item.id === router.query?.task_id);
  return (
    <GeneralBanner
      titleColorProps={{
        style: {
          color: 'var(--info-11)',
        },
      }}
      textHeading={'Candidate submitted availability'}
      textDesc={
        'These are the options that selected by the candidate. Click schedule to view and pick one schedule for the interview.'
      }
      slotHeadingIcon={<Icon height={'16'} width={'20'} variant='Check' />}
      slotButton={
        <>
          <ButtonSolid
            isDisabled={
              selectedTask.candidate_request_availability.booking_confirmed ||
              !selectedTask.candidate_request_availability.slots
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
              selectedTask.candidate_request_availability.booking_confirmed ||
              !selectedTask.candidate_request_availability.slots
            }
            textButton={'Request again'}
            isLoading={false}
            isLeftIcon={false}
            isRightIcon={false}
            size={1}
            onClickButton={{
              onClick: () => {
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
