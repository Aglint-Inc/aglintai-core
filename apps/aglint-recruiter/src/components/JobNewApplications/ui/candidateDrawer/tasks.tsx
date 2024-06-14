import { EmailAgentId, getFullName, PhoneAgentId } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { JobDetailInterview } from '@/devlink/JobDetailInterview';
import { TaskDetailBlock } from '@/devlink/TaskDetailBlock';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { EmailAgentIcon } from '@/src/components/Tasks/Components/EmailAgentIcon';
import { PhoneAgentIcon } from '@/src/components/Tasks/Components/PhoneAgentIcon';
import StatusChip from '@/src/components/Tasks/Components/StatusChip';
import { useApplication } from '@/src/context/ApplicationContext';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { EmptyState } from './common';

const Tasks = () => {
  const {
    tasks: { data, status },
    application_id,
  } = useApplication();
  const { push } = useRouter();

  if (status === 'pending') return <>Loading...</>;

  if (status === 'error') return <>Something went wrong</>;

  if (data.length === 0) return <EmptyState tab='Tasks' />;

  const taskCards = (data ?? []).map((task) => (
    <TaskDetailBlock
      key={task.id}
      slotIcon={<TaskIcon created_by={task.created_by} />}
      slotStatus={<StatusChip status={task.status} />}
      textDesc={task.name}
      textName={<TaskName created_by={task.created_by} />}
    />
  ));
  if (taskCards.length === 0) return <></>;
  return (
    <JobDetailInterview
      slotNewInterviewPlanCard={taskCards}
      textButton={'View in tasks'}
      onClickViewScheduler={{
        onClick: () => push(`/tasks?application_id=${application_id ?? null}`),
      }}
    />
  );
};

export { Tasks };

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
  const { members } = useAuthDetails();
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
