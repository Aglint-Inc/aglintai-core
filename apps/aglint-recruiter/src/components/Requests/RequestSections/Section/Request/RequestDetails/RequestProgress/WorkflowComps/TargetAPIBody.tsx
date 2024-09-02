import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React from 'react';

import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITypography from '@/src/components/Common/UITypography';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import { WorkflowAction } from '@/src/types/workflow.types';

export type WActionProps = {
  action: ReturnType<typeof useWorkflow>['actions']['data'][number];
};

export const TargetAPIBody = (props: WActionProps) => {
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

const EmailTemplate = ({ action: { payload, action_type } }: WActionProps) => {
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

const EmailSubject: React.FC<FormsType> = ({
  name,
  value,
  disabled = false,
}) => {
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
          handleChange={() => {
            //
          }}
          placeholder=''
        />
      </Stack>
    </Stack>
  );
};
EmailSubject.displayName = 'EmailSubject';

const EmailBody: React.FC<FormsType> = ({ name, value, disabled = false }) => {
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
          placeholder=''
          handleChange={() => {
            //
          }}
        />
      </Stack>
    </Stack>
  );
};
EmailBody.displayName = 'EmailBody';

const SlackTemplate = ({ action: { action_type } }: WActionProps) => {
  if (action_type !== 'slack') return <></>;

  return (
    <GlobalBannerInline
      textContent={'A slack notification will be sent for this action.'}
      slotButton={<></>}
    />
  );
};

const EndPointTemplate = ({ action: { action_type } }: WActionProps) => {
  if (action_type !== 'end_point') return <></>;

  return (
    <GlobalBannerInline
      textContent={'Aglint system will handle this action'}
      slotButton={<></>}
    />
  );
};

const AgentInstructionTemplate = ({ action }: WActionProps) => {
  if (action.action_type !== 'agent_instruction') return <></>;
  const email_body = <AgentInstructionBody {...action} />;

  const forms = <Stack spacing={'var(--space-5)'}>{email_body}</Stack>;
  return forms;
};

const AgentInstructionBody: React.FC<
  WActionProps['action'] & { disabled?: boolean }
> = ({ disabled = false }) => {
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
          handleChange={() => {
            //
          }}
          placeholder='Provide the instructions to guide the agent through this action.'
        />
      </Stack>
    </Stack>
  );
};
AgentInstructionBody.displayName = 'AgentInstructionBody';
