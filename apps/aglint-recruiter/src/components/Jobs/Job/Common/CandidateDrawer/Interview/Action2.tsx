import { useRouter } from 'next/router';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GeneralBanner } from '@/devlink/GeneralBanner';
import Icon from '@/src/components/Common/Icons/Icon';
import { setDateRange } from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/store';
import {
  setRequestSessionIds,
  setSelectedSessionIds,
} from '@/src/components/Scheduling/CandidateDetails/store';
import { useApplication } from '@/src/context/ApplicationContext';

import {
  ApplicationInterviewActionsProvider,
  useApplicationInterviewActions,
} from '../Common/ActionsProvider';

const Actions = () => {
  const { tasks, interview } = useApplication();

  if (tasks.status !== 'success' || interview.status !== 'success')
    return <></>;

  return (
    <ApplicationInterviewActionsProvider>
      <Content />
    </ApplicationInterviewActionsProvider>
  );
};

export { Actions };

const Content = () => {
  const { validActions } = useApplicationInterviewActions();

  return (
    <>
      {validActions.map((action) => (
        <Action key={action.id} action={action} />
      ))}
    </>
  );
};

const Action = ({
  action,
}: {
  action: ReturnType<typeof useApplication>['tasks']['data'][number];
}) => {
  const { push } = useRouter();
  const { application_id } = useApplication();
  return (
    <GeneralBanner
      titleColorProps={{
        style: {
          color: 'var(--info-11)',
        },
      }}
      textHeading={'Schedule interview'}
      textDesc={action.name}
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
                setRequestSessionIds(action.session_ids.map((ele) => ele.id));
                setSelectedSessionIds(action.session_ids.map((ele) => ele.id));
                setDateRange({
                  start_date: action.schedule_date_range.start_date,
                  end_date: action.schedule_date_range.end_date,
                });
                push(
                  `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/application/${application_id}?task_id=${action.id}`,
                );
              },
            }}
          />
        </>
      }
    />
  );
};
