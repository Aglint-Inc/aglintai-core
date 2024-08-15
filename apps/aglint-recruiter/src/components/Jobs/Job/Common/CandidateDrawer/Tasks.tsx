import { DatabaseView } from '@aglint/shared-types';
import { EmailAgentId, getFullName, PhoneAgentId } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { JobDetailInterview } from '@/devlink/JobDetailInterview';
import { SkeletonTaskDetailBlock } from '@/devlink/SkeletonTaskDetailBlock';
import { TaskDetailBlock } from '@/devlink/TaskDetailBlock';
import { Skeleton } from '@/devlink2/Skeleton';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { EmailAgentIcon } from '@/src/components/Tasks/Components/EmailAgentIcon';
import { PhoneAgentIcon } from '@/src/components/Tasks/Components/PhoneAgentIcon';
import TaskStatusTag from '@/src/components/Tasks/Components/TaskStatusTag';
import { useApplication } from '@/src/context/ApplicationContext';
import { useAllMembers } from '@/src/queries/members';
import ROUTES from '@/src/utils/routing/routes';

import { EmptyState } from './Common/EmptyState';
import { Loader } from './Common/Loader';

const Tasks = () => {
  const {
    tasks: { data, status },
    application_id,
  } = useApplication();
  const { push } = useRouter();

  if (status === 'success' && (data ?? []).length === 0)
    return <EmptyState tab='Tasks' />;

  if (status === 'error') return <>Something went wrong</>;

  return (
    <JobDetailInterview
      slotNewInterviewPlanCard={<Content />}
      textButton={'View in tasks'}
      onClickViewScheduler={{
        style: { display: status === 'success' ? 'flex' : 'none' },
        onClick: () =>
          push(ROUTES['/tasks']() + `?application_id=${application_id}`),
      }}
    />
  );
};

export { Tasks };

const Content = () => {
  const { push } = useRouter();
  const {
    application_id,
    tasks: { data, status },
  } = useApplication();

  if (status === 'pending')
    return (
      <Loader count={3}>
        <SkeletonTaskDetailBlock slotSkeleton={<Skeleton />} />
      </Loader>
    );

  return (data ?? []).map((task) => (
    <Stack
      key={task.id}
      style={{ cursor: 'pointer' }}
      onClick={() =>
        push(
          ROUTES['/tasks']() +
            `?application_id=${application_id}&task_id=${task.id}`,
        )
      }
    >
      <TaskDetailBlock
        slotIcon={<TaskIcon created_by={task.created_by} />}
        slotStatus={<TaskStatusTag task={task as DatabaseView['tasks_view']} />}
        textDesc={task.name}
        textName={<TaskName created_by={task.created_by} />}
      />
    </Stack>
  ));
};

const TaskName = ({ created_by }: { created_by: string }) => {
  const member = useTaskMember(created_by);
  const name = getFullName(member?.first_name, member?.last_name) ?? '---';
  if (created_by === EmailAgentId) return <>Email Agent</>;
  if (created_by === PhoneAgentId) return <>Phone Agent</>;
  return <>{name}</>;
};

const TaskIcon = ({ created_by }: { created_by: string }) => {
  if (created_by === EmailAgentId)
    return (
      <Stack
        border={'1px solid'}
        borderColor={'var(--neutral-6)'}
        borderRadius={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'24px'}
        height={'24px'}
      >
        <EmailAgentIcon />
      </Stack>
    );
  if (created_by === PhoneAgentId)
    return (
      <Stack
        border={'1px solid'}
        borderColor={'var(--neutral-6)'}
        borderRadius={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'24px'}
        height={'24px'}
      >
        <PhoneAgentIcon />
      </Stack>
    );
  return <TaskMember created_by={created_by} />;
};

const useTaskMember = (id: string) => {
  const { members } = useAllMembers();
  const member = members.find(({ user_id }) => user_id === id);
  return member ?? null;
};

const TaskMember = ({ created_by }: { created_by: string }) => {
  const member = useTaskMember(created_by);
  const name = getFullName(member?.first_name, member?.last_name) ?? '---';

  return (
    <MuiAvatar
      level={name}
      src={member?.profile_image ?? null}
      variant='rounded-small'
    />
  );
};
