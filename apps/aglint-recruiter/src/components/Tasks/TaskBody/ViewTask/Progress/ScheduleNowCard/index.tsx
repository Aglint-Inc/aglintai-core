import type { DatabaseView } from '@aglint/shared-types';
import { useRouter } from 'next/router';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';

function ScheduleNowCard({
  selectedTask,
}: {
  selectedTask: DatabaseView['tasks_view'];
}) {
  const router = useRouter();

  return (
    <GlobalBannerShort
      color={'warning'}
      iconName={'check_circle'}
      textTitle={'Schedule interview'}
      textDescription={
        'Please select a date and time to schedule your interview.'
      }
      slotButtons={
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
                router.push(
                  `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/application/${selectedTask.application_id}`,
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
