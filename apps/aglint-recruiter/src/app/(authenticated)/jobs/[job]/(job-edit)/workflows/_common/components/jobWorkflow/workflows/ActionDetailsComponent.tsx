import { type DatabaseEnums } from '@aglint/shared-types';
import Typography from '@components/typography';
import { UIAlert } from '@components/ui-alert';

import { ShowCode } from '@/components/Common/ShowCode';
import TipTapAIEditor from '@/components/Common/TipTapAIEditor';

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
      props: { description: string };
    }
  | {
      action_type: 'end_point';
      props: { description: string };
    };

const ActionDetailsComponent = (props: WActionProps) => {
  switch (props.action_type) {
    case 'email':
      return <EmailTemplate {...props.props} />;
    case 'slack':
      return <SlackTemplate description={props.props.description} />;
    case 'end_point':
      return <EndPointTemplate description={props.props.description} />;
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
  setBody: (_body: string) => any;
  setSubject: (_body: string) => any;
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
        <Typography className='mb-1 text-sm font-semibold'>
          Email Subject
        </Typography>
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
        <Typography className='mb-1 text-sm font-semibold'>
          Email Body
        </Typography>
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

const SlackTemplate = ({ description }: { description: string }) => {
  return <UIAlert type='info' title={description} />;
};

const EndPointTemplate = ({ description }: { description: string }) => {
  return <UIAlert type='info' title={description} />;
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
          <Typography className='mb-1 text-sm font-semibold'>
            Aglint AI Instruction
          </Typography>
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
