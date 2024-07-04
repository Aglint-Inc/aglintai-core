/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import type React from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import { Workflow, WorkflowAction } from '@/src/types/workflow.types';

const useActionsContext = () => {
  const {
    emailTemplates: { data: all_company_email_template },
  } = useAuthDetails();

  const {
    workflow: { trigger },
    actions: { data: actions },
    handleCreateAction,
  } = useWorkflow();

  const globalOptions = useMemo(
    () =>
      ACTION_TRIGGER_MAP[trigger].filter(
        ({ value }) =>
          !(actions ?? []).find(
            ({ company_email_template: { type } }) => type === value,
          ),
      ),
    [ACTION_TRIGGER_MAP, trigger, actions],
  );

  const createAction = useCallback(() => {
    const emailTemplate = (all_company_email_template ?? []).find(
      ({ type }) => type === globalOptions[0].value,
    );
    handleCreateAction({
      order: (actions ?? []).length ? actions[actions.length - 1].order + 1 : 1,
      email_template_id: emailTemplate.id,
      payload: {
        body: emailTemplate.body,
        subject: emailTemplate.subject,
      },
    });
  }, [globalOptions, all_company_email_template, handleCreateAction, actions]);

  const getCurrentOption = useCallback(
    (type: WorkflowAction['company_email_template']['type']) =>
      ACTION_TRIGGER_MAP[trigger].find(({ value }) => value === type),
    [ACTION_TRIGGER_MAP, trigger],
  );
  return {
    createAction,
    getCurrentOption,
    globalOptions,
  };
};

const ActionsContext =
  createContext<ReturnType<typeof useActionsContext>>(undefined);

const useActions = () => {
  const value = useContext(ActionsContext);
  if (value === undefined) throw Error('Actions Context not found');
  return value;
};

const ActionsProvider = (props: React.PropsWithChildren) => {
  const value = useActionsContext();
  return (
    <ActionsContext.Provider value={value}>
      {props.children}
    </ActionsContext.Provider>
  );
};

export { ACTION_TRIGGER_MAP, ActionsProvider, useActions };

const ACTION_TRIGGER_MAP: {
  // eslint-disable-next-line no-unused-vars
  [trigger in Workflow['trigger']]: {
    name: string;
    value: DatabaseTable['company_email_template']['type'];
  }[];
} = {
  sendAvailReqReminder: [
    {
      value: 'sendAvailReqReminder_email_applicant',
      name: 'Send email to applicant',
    },
  ],
  selfScheduleReminder: [
    {
      value: 'selfScheduleReminder_email_applicant',
      name: 'Send email to applicant',
    },
  ],
  interviewStart: [
    {
      value: 'interviewStart_email_applicant',
      name: 'Send email to applicant',
    },
    {
      value: 'interviewStart_email_interviewers',
      name: 'Send emails to interviewers',
    },
    {
      value: 'interviewStart_email_organizer',
      name: 'Send emails to organizer',
    },
    {
      value: 'interviewStart_slack_interviewers',
      name: 'Send slack messages to interviewers',
    },
  ],
  interviewerConfirmation: [
    {
      value: 'interviewerConfirmation_slack_interviewers',
      name: 'Send slack messages to interviewers',
    },
  ],
  interviewEnd: [
    {
      value: 'interviewEnd_slack_interviewers',
      name: 'Send feedback messages to interviewers on slack',
    },
  ],
  meetingDeclined: [
    {
      value: 'meetingDeclined_email_organizer',
      name: 'Send email to organizer',
    },
  ],
  meetingAccepted: [
    {
      value: 'meetingAccepted_email_organizer',
      name: 'Send email to organizer',
    },
  ],
  candidateBook: [
    {
      value: 'candidateBook_email_interviewerForFeedback',
      name: 'Send email to interviewers',
    },
    {
      value: 'candidateBook_slack_interviewerForFeedback',
      name: 'Send slack messages to interviewers',
    },
  ],
};
