import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// Define the shape of the context state
interface SelectedActionsDetailsContextType {
  selectedActionsDetails: Omit<DatabaseTable['workflow_action'], 'payload'>;
  setSelectedActionsDetails: React.Dispatch<
    React.SetStateAction<Omit<DatabaseTable['workflow_action'], 'payload'>>
  >;
  agentInstructions: string;
  setAgentInstructions: React.Dispatch<React.SetStateAction<string>>;
  emailTemplate: {
    body: string;
    subject: string;
  };
  setEmailTemplate: React.Dispatch<
    React.SetStateAction<{
      body: string;
      subject: string;
    }>
  >;
  emailTemplateTargetAPI: DatabaseEnums['email_slack_types'];
  tiptapLoadStatus: { email: boolean; agent: boolean };
  setTiptapLoadStatus: React.Dispatch<
    React.SetStateAction<{ email: boolean; agent: boolean }>
  >;
}

// Create the context with a default value
const SelectedActionsDetailsContext = createContext<
  SelectedActionsDetailsContextType | undefined
>(undefined);

interface SelectedActionsDetailsProviderProps {
  children: ReactNode;
  defaultSelectedActionsDetails: DatabaseTable['workflow_action'];
  companyTemplatesMp: Partial<
    Record<
      DatabaseEnums['email_slack_types'],
      DatabaseTable['company_email_template']
    >
  >;
}

export const SelectedActionsDetailsProvider: React.FC<
  SelectedActionsDetailsProviderProps
> = ({ children, defaultSelectedActionsDetails, companyTemplatesMp }) => {
  const [selectedActionsDetails, setSelectedActionsDetails] = useState<
    Omit<DatabaseTable['workflow_action'], 'payload'>
  >(defaultSelectedActionsDetails);
  const [agentInstructions, setAgentInstructions] = useState<string>(null);
  const [tiptapLoadStatus, setTiptapLoadStatus] = useState({
    email: false,
    agent: false,
  });
  const [emailTemplate, setEmailTemplate] = useState<{
    body: string;
    subject: string;
  }>({
    body: defaultSelectedActionsDetails.payload?.email?.body ?? '',
    subject: defaultSelectedActionsDetails.payload?.email?.subject ?? '',
  });

  const emailTemplateTargetAPI = useMemo(() => {
    if (
      selectedActionsDetails.action_type === 'agent_instruction' &&
      agentTargetApiEmailEndPoint[selectedActionsDetails.target_api]
    ) {
      return agentTargetApiEmailEndPoint[selectedActionsDetails.target_api];
    }

    return selectedActionsDetails.target_api;
  }, [selectedActionsDetails.target_api]);

  return (
    <SelectedActionsDetailsContext.Provider
      value={{
        selectedActionsDetails,
        setSelectedActionsDetails,
        agentInstructions,
        setAgentInstructions,
        emailTemplate,
        setEmailTemplate,
        emailTemplateTargetAPI,
        setTiptapLoadStatus,
        tiptapLoadStatus,
      }}
    >
      {children}
    </SelectedActionsDetailsContext.Provider>
  );
};

export const useSelectedActionsDetails = () => {
  const context = useContext(SelectedActionsDetailsContext);
  if (context === undefined) {
    throw new Error(
      'useSelectedActionsDetails must be used within a SelectedActionsDetailsProvider',
    );
  }
  return context;
};
export const agentTargetApiEmailEndPoint: Partial<
  Record<DatabaseEnums['email_slack_types'], DatabaseEnums['email_slack_types']>
> = {
  onRequestSchedule_emailLink_sendSelfSchedulingLink:
    'sendSelfScheduleRequest_email_applicant',
  onRequestSchedule_emailLink_getCandidateAvailability:
    'sendAvailabilityRequest_email_applicant',
};
