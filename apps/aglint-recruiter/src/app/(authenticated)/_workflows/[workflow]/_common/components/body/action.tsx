/* eslint-disable security/detect-object-injection */
import type {
  CustomAgentInstructionPayload,
  DatabaseTable,
} from '@aglint/shared-types';
import OptimisticWrapper from '@components/loadingWapper';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { CardContent } from '@components/ui/card';
import { Terminal } from 'lucide-react';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';

import { Loader } from '@/components/Common/Loader';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import UISelect from '@/components/Common/UISelectDropDown';
import UITypography from '@/components/Common/UITypography';
import { WorkflowItem } from '@/components/Workflow/_common/WorkflowItem';
import { type WorkflowAction } from '@/types/workflow.types';
import { useWorkflow } from '@/workflow/hooks';
import { getWorkflowTagIcon } from '@/workflows/utils';

import { useActions } from './context';

const Actions = () => {
  const {
    actions: { data, status },
    actionMutations: mutations,
  } = useWorkflow();

  if (status === 'error') return <>Error</>;
  if (status === 'pending') return <Loader />;
  const actions = data.map((action) => {
    const loading = !!mutations.find((mutation) => mutation.id === action.id);
    return (
      <OptimisticWrapper key={action.id} loading={loading}>
        <WorkflowConnector />
        <Action key={action.id} action={action} />
      </OptimisticWrapper>
    );
  });
  return (
    <>
      {actions}
      <ActionRecommendations />
    </>
  );
};

export default Actions;

const ActionRecommendations = memo(() => {
  const { manageWorkflow, devlinkProps } = useWorkflow();
  const { createAction, canCreateAction, globalOptions } = useActions();
  if (!(canCreateAction && manageWorkflow)) return <></>;
  const options = globalOptions.map((option) => {
    return (
      <Button
        key={option.value.target_api}
        variant='outline'
        size='sm'
        className='flex items-center'
        onClick={() => createAction(option)}
        {...devlinkProps}
      >
        {getWorkflowTagIcon(option.value.action_type)}
        <span className='ml-2'>{option.name}</span>
      </Button>
    );
  });
  return (
    <>
      <WorkflowConnector />

      <div className='flex flex-col items-center gap-4 py-2'>
        <UITypography type='small' variant='p'>
          Choose an action from below
        </UITypography>
        <CardContent className='flex flex-col items-center gap-2'>
          {options}
        </CardContent>
      </div>
    </>
  );
});
ActionRecommendations.displayName = 'ActionRecommendations';

type ActionProps = {
  action: ReturnType<typeof useWorkflow>['actions']['data'][number];
};

const Action = (props: ActionProps) => {
  const { handleDeleteAction, devlinkProps } = useWorkflow();
  return (
    <WorkflowItem
      textWorkflowType={'Action'}
      textTypeDescription={'An action to be performed'}
      slotWorkflowIcon={<Terminal size={16} />}
      slotInputFields={<Forms {...props} />}
      isDeleteVisible={true}
      onClickDelete={{
        onClick: () => handleDeleteAction({ id: props.action.id }),
        ...devlinkProps,
      }}
    />
  );
};

const Forms = (props: ActionProps) => {
  return (
    <>
      <ActionForm {...props} />
      <TargetAPIBody {...props} />
    </>
  );
};

const TargetAPIBody = (props: ActionProps) => {
  switch (props.action.action_type) {
    case 'email':
      return <EmailTemplate key={props.action.target_api} {...props} />;
    case 'slack':
      return <SlackTemplate key={props.action.target_api} {...props} />;
    case 'end_point':
      return <EndPointTemplate key={props.action.target_api} {...props} />;
    case 'agent_instruction':
      return (
        <AgentInstructionTemplate key={props.action.target_api} {...props} />
      );
  }
};

const ActionForm = ({ action }: ActionProps) => {
  const { manageWorkflow } = useWorkflow();
  const { globalOptions, getCurrentOption, selectAction } = useActions();
  const currentOption = useMemo(() => {
    const { name, value } = getCurrentOption(action.target_api);
    return { name, value: value.target_api, ...value };
  }, [action.target_api]);
  const options = useMemo(
    () => [
      ...globalOptions.map(({ name, value }) => ({
        name,
        value: value.target_api,
        ...value,
      })),
      currentOption,
    ],
    [globalOptions, currentOption],
  );

  return (
    <UISelect
      label='Do this'
      value={currentOption.target_api}
      disabled={!manageWorkflow}
      menuOptions={options}
      onValueChange={(value) => {
        const { action_type, target_api, payload } = options.find(
          ({ target_api }) => value === target_api,
        );
        selectAction({
          ...action,
          action_type,
          target_api,
          payload,
        } as WorkflowAction);
      }}
    />
  );
};

const EmailTemplate = ({ action: { payload, action_type } }: ActionProps) => {
  if (action_type !== 'email') return <></>;

  const email_subject = <EmailSubject name='subject' value={payload} />;

  const email_body = <EmailBody name='body' value={payload} />;

  const forms = (
    <div className='space-y-5'>
      {email_subject}
      {email_body}
    </div>
  );
  return forms;
};

type EmailTemplateType = Pick<
  DatabaseTable['company_email_template'],
  'body' | 'subject'
>;

type FormsType = {
  name: keyof EmailTemplateType;
  value: {
    [key in keyof WorkflowAction['payload']]: WorkflowAction['payload'][key];
  };
  disabled?: boolean;
};

const EmailSubject: React.FC<FormsType> = memo(
  ({ name, value, disabled = true }) => {
    return (
      <div>
        <UITypography type='small'>Email Subject</UITypography>
        <div className='border-neutral-6 mt-2 rounded-[var(--radius-2)] border'>
          <TipTapAIEditor
            singleLine={true}
            padding={1}
            toolbar={false}
            disabled={disabled}
            editor_type='email'
            initialValue={value?.[name]}
            handleChange={null}
            placeholder=''
          />
        </div>
      </div>
    );
  },
);
EmailSubject.displayName = 'EmailSubject';

const EmailBody: React.FC<FormsType> = memo(
  ({ name, value, disabled = true }) => {
    return (
      <div>
        <UITypography type='small'>Email Body</UITypography>
        <div className='border-neutral-6 mt-2 rounded-[var(--radius-2)] border'>
          <TipTapAIEditor
            toolbar={false}
            disabled={disabled}
            editor_type='email'
            initialValue={value?.[name]}
            handleChange={null}
            placeholder=''
          />
        </div>
      </div>
    );
  },
);
EmailBody.displayName = 'EmailBody';

const SlackTemplate = ({ action: { action_type } }: ActionProps) => {
  if (action_type !== 'slack') return <></>;

  return (
    <Alert>
      <AlertDescription>
        A slack notification will be sent for this action.
      </AlertDescription>
    </Alert>
  );
};

const EndPointTemplate = ({ action: { action_type } }: ActionProps) => {
  if (action_type !== 'end_point') return <></>;

  return (
    <Alert variant='default'>
      <AlertTitle>System Action</AlertTitle>
      <AlertDescription>Aglint system will handle this action</AlertDescription>
    </Alert>
  );
};

const AgentInstructionTemplate = ({ action }: ActionProps) => {
  if (action.action_type !== 'agent_instruction') return <></>;

  const email_body = <AgentInstructionBody {...action} />;

  const forms = <div className='space-y-5'>{email_body}</div>;
  return forms;
};

const AgentInstructionBody: React.FC<
  ActionProps['action'] & { disabled?: boolean }
> = memo(({ id, action_type, payload, disabled = false }) => {
  const { handleUpdateAction } = useWorkflow();
  const safePayload = payload as CustomAgentInstructionPayload;
  const [instruction, setInstruction] = useState(
    safePayload?.agent?.instruction ?? '',
  );
  const initialRef = useRef(true);
  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (instruction !== safePayload?.agent?.instruction) {
      const timeout = setTimeout(
        () =>
          handleUpdateAction({
            id,
            payload: {
              ...safePayload,
            },
          }),
        400,
      );
      return () => clearTimeout(timeout);
    }
  }, [instruction]);
  if (action_type !== 'agent_instruction') return <></>;
  return (
    <div>
      <UITypography type='small'>Aglint AI Instruction</UITypography>
      <div className='border-neutral-6 mt-2 rounded-[var(--radius-2)] border'>
        <TipTapAIEditor
          toolbar={false}
          disabled={disabled}
          editor_type='regular'
          initialValue={payload.agent?.instruction}
          handleChange={(newInstruction) => setInstruction(newInstruction)}
          placeholder='Provide the instructions to guide the agent through this action.'
        />
      </div>
    </div>
  );
});
AgentInstructionBody.displayName = 'AgentInstructionBody';

// -----

const WorkflowConnector = () => {
  return (
    <div className={'flex w-full items-center justify-center text-neutral-600'}>
      <svg
        className='flex items-center justify-center'
        width='16'
        height='45'
        viewBox='0 0 16 45'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M7.29289 44.7071C7.68342 45.0976 8.31658 45.0976 8.70711 44.7071L15.0711 38.3431C15.4616 37.9526 15.4616 37.3195 15.0711 36.9289C14.6805 36.5384 14.0474 36.5384 13.6569 36.9289L8 42.5858L2.34315 36.9289C1.95262 36.5384 1.31946 36.5384 0.928932 36.9289C0.538408 37.3195 0.538408 37.9526 0.928932 38.3431L7.29289 44.7071ZM7 0L7 44H9L9 0L7 0Z'
          fill='currentColor'
        />
      </svg>
    </div>
  );
};
