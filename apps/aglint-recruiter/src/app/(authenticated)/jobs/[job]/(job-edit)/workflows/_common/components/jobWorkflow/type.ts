import { type DatabaseTable } from '@aglint/shared-types';

export type Automation = {
  id: string;
  question: string;
  enabled: boolean;
  actions: DatabaseTable['workflow_action'];
};

export type AutomationCategory = {
  name: string;
  icon: React.ReactNode;
  automations: Automation[];
};
