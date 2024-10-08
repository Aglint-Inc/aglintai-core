import type { DatabaseTable } from '@aglint/shared-types';
import Typography from '@components/typography';
import { UIAlert } from '@components/ui-alert';

import { ShowCode } from '@/components/Common/ShowCode';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';

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
    <div className='mb-4'>
      <Typography className='mb-1 text-sm font-semibold'>
        Email Subject
      </Typography>
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
      <Typography className='mb-1 text-sm font-semibold'>Email Body</Typography>
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
    <UIAlert
      type='info'
      title={'A slack notification will be sent for this action.'}
    />
  );
};

const EndPointTemplate = () => {
  return (
    <UIAlert type='info' title={'Aglint system will handle this action'} />
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
      <Typography className='mb-1 text-sm font-semibold'>
        Aglint AI Instruction
      </Typography>
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
