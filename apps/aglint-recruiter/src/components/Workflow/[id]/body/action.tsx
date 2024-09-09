/* eslint-disable security/detect-object-injection */
import type {
  CustomAgentInstructionPayload,
  DatabaseTable,
} from '@aglint/shared-types';
import OptimisticWrapper from '@components/loadingWapper';
import { GlobalBannerInline } from '@devlink2/GlobalBannerInline';
import { WorkflowAddAction } from '@devlink3/WorkflowAddAction';
import { WorkflowButton } from '@devlink3/WorkflowButton';
import { WorkflowConnector } from '@devlink3/WorkflowConnector';
import { WorkflowItem } from '@devlink3/WorkflowItem';
import { Stack } from '@mui/material';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';

import Loader from '@/components/Common/Loader';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import UISelect from '@/components/Common/UISelectDropDown';
import UITypography from '@/components/Common/UITypography';
import { useWorkflow } from '@/context/Workflows/[id]';
import { type WorkflowAction } from '@/types/workflow.types';

import { getWorkflowTagIcon } from '../../constants';
import { useActions } from './context';
import { Terminal } from 'lucide-react';

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
      <WorkflowButton
        key={option.value.target_api}
        textButton={option.name}
        slotIcon={getWorkflowTagIcon(option.value.action_type)}
        onClickButton={{ onClick: () => createAction(option), ...devlinkProps }}
      />
    );
  });
  return (
    <>
      <WorkflowConnector />
      <WorkflowAddAction slotWorkflowButton={options} />
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
    <Stack spacing={'var(--space-5)'}>
      {email_subject}
      {email_body}
    </Stack>
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
      <Stack>
        <UITypography type='small'>Email Subject</UITypography>
        <Stack
          sx={{
            mt: '8px',
            border: '1px solid',
            borderColor: 'var(--neutral-6)',
            borderRadius: 'var(--radius-2)',
          }}
        >
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
        </Stack>
      </Stack>
    );
  },
);
EmailSubject.displayName = 'EmailSubject';

const EmailBody: React.FC<FormsType> = memo(
  ({ name, value, disabled = true }) => {
    return (
      <Stack>
        <UITypography type='small'>Email Body</UITypography>
        <Stack
          sx={{
            mt: '8px',
            border: '1px solid',
            borderColor: 'var(--neutral-6)',
            borderRadius: 'var(--radius-2)',
          }}
        >
          <TipTapAIEditor
            toolbar={false}
            disabled={disabled}
            editor_type='email'
            initialValue={value?.[name]}
            handleChange={null}
            placeholder=''
          />
        </Stack>
      </Stack>
    );
  },
);
EmailBody.displayName = 'EmailBody';

const SlackTemplate = ({ action: { action_type } }: ActionProps) => {
  if (action_type !== 'slack') return <></>;

  return (
    <GlobalBannerInline
      textContent={'A slack notification will be sent for this action.'}
      slotButton={<></>}
    />
  );
};

const EndPointTemplate = ({ action: { action_type } }: ActionProps) => {
  if (action_type !== 'end_point') return <></>;

  return (
    <GlobalBannerInline
      textContent={'Aglint system will handle this action'}
      slotButton={<></>}
    />
  );
};

const AgentInstructionTemplate = ({ action }: ActionProps) => {
  if (action.action_type !== 'agent_instruction') return <></>;

  const email_body = <AgentInstructionBody {...action} />;

  const forms = <Stack spacing={'var(--space-5)'}>{email_body}</Stack>;
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
    <Stack>
      <UITypography type='small'>Aglint AI Instruction</UITypography>
      <Stack
        sx={{
          mt: '8px',
          border: '1px solid',
          borderColor: 'var(--neutral-6)',
          borderRadius: 'var(--radius-2)',
        }}
      >
        <TipTapAIEditor
          toolbar={false}
          disabled={disabled}
          editor_type='regular'
          initialValue={payload.agent.instruction}
          handleChange={(newInstruction) => setInstruction(newInstruction)}
          placeholder='Provide the instructions to guide the agent through this action.'
        />
      </Stack>
    </Stack>
  );
});
AgentInstructionBody.displayName = 'AgentInstructionBody';
