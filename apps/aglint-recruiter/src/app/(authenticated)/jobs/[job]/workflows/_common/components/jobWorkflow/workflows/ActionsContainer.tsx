import { type DatabaseTable } from '@aglint/shared-types';
import { Button } from '@components/ui/button';

import {
  deleteWAcion,
  updateWAction,
} from '@/job/workflows/contexts/workflowsStoreContext';
import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

import ActionDetailsComponent from './ActionDetailsComponent';

const ActionsContainer = ({
  wAction,
}: {
  wAction: DatabaseTable['workflow_action'];
}) => {
  const trigger = wAction.target_api.split(
    '_',
  )[0] as keyof typeof ACTION_TRIGGER_MAP;
  const target_api_details = ACTION_TRIGGER_MAP[trigger].find(
    (t) => t.value.target_api === wAction.target_api,
  );
  const copy_details = target_api_details.name;

  return (
    <div className='rounded-md bg-secondary p-4'>
      <div className='mb-2 flex items-center justify-between'>
        <h3 className='text-sm font-semibold'>{copy_details}</h3>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => {
            deleteWAcion(wAction.id);
          }}
        >
          Remove
        </Button>
      </div>
      {wAction.action_type === 'slack' && (
        <ActionDetailsComponent action_type='slack' />
      )}
      {wAction.action_type === 'end_point' && (
        <ActionDetailsComponent action_type='end_point' />
      )}
      {wAction.action_type === 'email' && (
        <ActionDetailsComponent
          action_type='email'
          props={{
            body: wAction.payload?.email?.body ?? '',
            isTemplateLoading: false,
            setBody: (bodyStr) => {
              updateWAction({
                ...wAction,
                payload: {
                  ...wAction.payload,
                  email: {
                    ...wAction.payload.email,
                    body: bodyStr,
                  },
                },
              });
            },
            setSubject: (subjectStr) => {
              updateWAction({
                ...wAction,
                payload: {
                  ...wAction.payload,
                  email: {
                    ...wAction.payload.email,
                    subject: subjectStr,
                  },
                },
              });
            },
            subject: wAction.payload?.email?.subject ?? '',
            targetAPI: wAction.target_api,
          }}
        />
      )}
      {wAction.action_type === 'agent_instruction' && (
        <ActionDetailsComponent
          action_type='agent_instruction'
          props={{
            agentInstructions: wAction.payload.agent.instruction,
            emailTemplateTargetAPI: wAction.target_api,
            isTemplateLoading: false,
            setAgentInstructions: () => {},
            isShowEmailTemplate: false,
            emailTempParams: null,
          }}
        />
      )}
    </div>
  );
};

export default ActionsContainer;
