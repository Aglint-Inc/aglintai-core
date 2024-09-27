export type Action = {
  id: string;
  type: 'email' | 'message' | 'ai' | 'slack';
  content: string;
  subject?: string;
};

export type Automation = {
  id: string;
  question: string;
  enabled: boolean;
  actions: Action[];
};

export type AutomationCategory = {
  name: string;
  icon: React.ReactNode;
  automations: Automation[];
};
