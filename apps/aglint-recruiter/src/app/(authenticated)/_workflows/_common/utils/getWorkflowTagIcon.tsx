import type { CustomActionType } from '@aglint/shared-types';
import { Lightbulb, Mail, Slack } from 'lucide-react';

export function getWorkflowTagIcon(type: CustomActionType) {
  switch (type) {
    case 'slack':
      return <Slack size={12} />;
    case 'email':
      return <Mail size={12} />;
    default:
      return <Lightbulb size={12} />;
  }
}
