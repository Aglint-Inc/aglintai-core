import { ShowCode } from '@/components/Common/ShowCode';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import { UIAlert } from '@/components/Common/UIAlert';
import UITypography from '@/components/Common/UITypography';
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';

export type WActionProps =
  | {
      action_type: 'email';
      props: EmailTemplateProps;
    }
  | {
      action_type: 'agent_instruction';
      props: AgentInstructionTemplateProps;
    }
  | {
      action_type: 'slack';
    }
  | {
      action_type: 'end_point';
    };

const ActionDetailsComponent = (props: WActionProps) => {
  switch (props.action_type) {
    case 'email':
      return <EmailTemplate {...props.props} />;
    case 'slack':
      return <SlackTemplate />;
    case 'end_point':
      return <EndPointTemplate />;
    case 'agent_instruction':
      return <AgentInstructionTemplate {...props.props} />;
  }
};

export default ActionDetailsComponent;

type EmailTemplateProps = {
  isTemplateLoading: boolean;
  targetAPI: DatabaseEnums['email_slack_types'];
  subject: string;
  body: string;
  setBody: (body: string) => any;
  setSubject: (body: string) => any;
};

const EmailTemplate = ({
  body,
  isTemplateLoading,
  subject,
  targetAPI,
  setBody,
  setSubject,
}: EmailTemplateProps) => {
  return (
    <div className='gap-2'>
      <div className='mb-4'>
        <UITypography className='mb-1 text-sm font-semibold'>
          Email Subject
        </UITypography>
        <div>
          {!isTemplateLoading && (
            <TipTapAIEditor
              singleLine={true}
              padding={1}
              toolbar={false}
              template_type={targetAPI}
              editor_type='email'
              initialValue={subject}
              handleChange={(s) => {
                setSubject(s);
              }}
            />
          )}
        </div>
      </div>
      <div>
        <UITypography className='mb-1 text-sm font-semibold'>
          Email Body
        </UITypography>
        <div>
          {!isTemplateLoading && (
            <TipTapAIEditor
              toolbar={false}
              editor_type='email'
              template_type={targetAPI}
              initialValue={body}
              handleChange={(s) => {
                setBody(s);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const SlackTemplate = () => {
  return (
    <UIAlert
      type='inline'
      title={'A slack notification will be sent for this action.'}
    />
  );
};

const EndPointTemplate = () => {
  return (
    <UIAlert type='inline' title={'Aglint system will handle this action'} />
  );
};

type AgentInstructionTemplateProps = {
  agentInstructions: string;
  setAgentInstructions: (_body: string) => any;
  isTemplateLoading: boolean;
  isShowEmailTemplate: boolean;
  emailTemplateTargetAPI: DatabaseEnums['email_slack_types'];
  emailTempParams?: EmailTemplateProps;
};

const AgentInstructionTemplate = ({
  agentInstructions,
  setAgentInstructions,
  isTemplateLoading,
  isShowEmailTemplate,
  emailTempParams,
}: AgentInstructionTemplateProps) => {
  return (
    <>
      <div>
        <div>
          <UITypography className='mb-1 text-sm font-semibold'>
            Aglint AI Instruction
          </UITypography>
          <div>
            {!isTemplateLoading && (
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
      </div>
      <ShowCode.When isTrue={isShowEmailTemplate}>
        {emailTempParams && <EmailTemplate {...emailTempParams} />}
      </ShowCode.When>
    </>
  );
};
