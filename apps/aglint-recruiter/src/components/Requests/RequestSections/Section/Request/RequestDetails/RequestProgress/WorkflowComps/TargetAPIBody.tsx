import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React from 'react';

import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { ShowCode } from '@/src/components/Common/ShowCode';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITypography from '@/src/components/Common/UITypography';

import { useSelectedActionsDetails } from '../NewScheduleEvents/dialogCtx';

export type WActionProps = {
  action: Omit<DatabaseTable['workflow_action'], 'payload'>;
};

export const TargetAPIBody = (props: WActionProps) => {
  switch (props.action.action_type) {
    case 'email':
      return <EmailTemplate key={props.action.target_api} />;
    case 'slack':
      return <SlackTemplate key={props.action.target_api} />;
    case 'end_point':
      return <EndPointTemplate key={props.action.target_api} />;
    case 'agent_instruction':
      return <AgentInstructionTemplate key={props.action.target_api} />;
  }
};

const EmailTemplate = () => {
  const email_subject = <EmailSubject />;

  const email_body = <EmailBody />;
  const forms = (
    <Stack spacing={'var(--space-5)'}>
      {email_subject}
      {email_body}
    </Stack>
  );
  return forms;
};

const EmailSubject = () => {
  const {
    setEmailTemplate,
    emailTemplateTargetAPI,
    emailTemplate,
    tiptapLoadStatus,
  } = useSelectedActionsDetails();
  console.log(emailTemplate);
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
        <Stack>
          {!tiptapLoadStatus.email && (
            <TipTapAIEditor
              singleLine={true}
              padding={1}
              toolbar={false}
              template_type={emailTemplateTargetAPI}
              editor_type='email'
              initialValue={emailTemplate.subject}
              handleChange={(s) => {
                setEmailTemplate((prev) => ({
                  ...prev,
                  subject: s,
                }));
              }}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
EmailSubject.displayName = 'EmailSubject';

const EmailBody = () => {
  const {
    setEmailTemplate,
    emailTemplate,
    emailTemplateTargetAPI,
    tiptapLoadStatus,
  } = useSelectedActionsDetails();

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
        {!tiptapLoadStatus.email && (
          <TipTapAIEditor
            toolbar={false}
            editor_type='email'
            template_type={emailTemplateTargetAPI}
            initialValue={emailTemplate.body}
            handleChange={(s) => {
              setEmailTemplate((prev) => ({
                ...prev,
                body: s,
              }));
            }}
          />
        )}
      </Stack>
    </Stack>
  );
};
EmailBody.displayName = 'EmailBody';

const SlackTemplate = () => {
  return (
    <GlobalBannerInline
      textContent={'A slack notification will be sent for this action.'}
      slotButton={<></>}
    />
  );
};

const EndPointTemplate = () => {
  return (
    <GlobalBannerInline
      textContent={'Aglint system will handle this action'}
      slotButton={<></>}
    />
  );
};

const AgentInstructionTemplate = () => {
  const { selectedActionsDetails, emailTemplateTargetAPI } =
    useSelectedActionsDetails();
  const email_body = <AgentInstructionBody />;
  const forms = <Stack spacing={'var(--space-5)'}>{email_body}</Stack>;
  return (
    <>
      {forms}
      <ShowCode.When
        isTrue={emailTemplateTargetAPI !== selectedActionsDetails.target_api}
      >
        <EmailTemplate />
      </ShowCode.When>
    </>
  );
};

const AgentInstructionBody = () => {
  const { agentInstructions, setAgentInstructions, tiptapLoadStatus } =
    useSelectedActionsDetails();
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
        {tiptapLoadStatus.agent === false && (
          <TipTapAIEditor
            toolbar={false}
            editor_type='regular'
            initialValue={agentInstructions}
            handleChange={(s) => {
              setAgentInstructions(s);
            }}
            placeholder='Provide the instructions to guide the agent through this action.'
          />
        )}
      </Stack>
    </Stack>
  );
};
AgentInstructionBody.displayName = 'AgentInstructionBody';
