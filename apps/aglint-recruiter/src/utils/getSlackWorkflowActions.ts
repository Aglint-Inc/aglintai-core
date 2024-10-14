import {
  type DatabaseEnums,
  type Trigger_API_Action_Mapper,
} from '@aglint/shared-types';

import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

export const getSlackWorkflowActions = (
  key: keyof Trigger_API_Action_Mapper,
  isSlackEnabled: boolean,
) => {
  const agent_slack_actions: DatabaseEnums['email_slack_types'][] = [
    'onReceivingAvailReq_agent_suggestSlots',
  ];

  let actions = ACTION_TRIGGER_MAP[key].map((act) => act);
  if (!isSlackEnabled) {
    actions = actions.filter(
      (action) =>
        action.value.action_type !== 'slack' &&
        !agent_slack_actions.includes(action.value.target_api),
    );
  }

  return actions;
};
