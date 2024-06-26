import { DatabaseView } from '@aglint/shared-types';
import { useRouter } from 'next/router';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GeneralBanner } from '@/devlink/GeneralBanner';
import Icon from '@/src/components/Common/Icons/Icon';
import {
  setDateRange
} from '@/src/components/Scheduling/CandidateDetails/SelfSchedulingDrawer/store';
import { setSelectedSessionIds } from '@/src/components/Scheduling/CandidateDetails/store';

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
      textHeading={'Create a meeting'}
      textDesc={
        <div
          dangerouslySetInnerHTML={{
            __html: ``,
          }}
        ></div>
      }
      slotHeadingIcon={<Icon height={'16'} width={'20'} variant='Check' />}
      slotButton={
        <>
          <ButtonSolid
            textButton={'Schedule Now'}
            isLoading={false}
            isLeftIcon={false}
            isRightIcon={false}
            size={1}
            onClickButton={{
              onClick: () => {
                // setScheduleFlow('update_request_availibility');
                setSelectedSessionIds(
                  selectedTask.session_ids.map((ele) => ele.id),
                );

                setDateRange({
                  start_date: selectedTask.schedule_date_range.start_date,
                  end_date: selectedTask.schedule_date_range.end_date,
                });

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
