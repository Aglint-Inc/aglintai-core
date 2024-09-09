import { DatabaseTable } from '@aglint/shared-types';
import { GlobalBannerInline } from '@devlink2/GlobalBannerInline';
import React from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import UITypography from '@/components/Common/UITypography';

import { useSelectedActionsDetails } from '../ScheduleProgress/dialogCtx';

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
    <div className='gap-2'>
      {email_subject}
      {email_body}
    </div>
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
  return (
    <div>
      <UITypography type='small'>Email Subject</UITypography>
      <div>
        <div>
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
        </div>
      </div>
    </div>
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
    <div>
      <UITypography type='small'>Email Body</UITypography>
      <div>
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
      </div>
    </div>
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
  const forms = <div>{email_body}</div>;
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
    <div>
      <UITypography type='small'>Aglint AI Instruction</UITypography>
      <div>
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
      </div>
    </div>
  );
};
AgentInstructionBody.displayName = 'AgentInstructionBody';
