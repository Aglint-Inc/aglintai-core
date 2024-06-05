/* eslint-disable security/detect-object-injection */
import type { DatabaseTable, DatabaseView } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React, { memo } from 'react';

import { WorkflowAdd } from '@/devlink3/WorkflowAdd';
import { WorkflowConnector } from '@/devlink3/WorkflowConnector';
import { WorkflowItem } from '@/devlink3/WorkflowItem';
import Loader from '@/src/components/Common/Loader';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UISelect from '@/src/components/Common/Uiselect';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import { useWorkflowStore } from '@/src/context/Workflows/store';

const Actions = () => {
  const {
    emailTemplates: { data: all_company_email_template },
  } = useAuthDetails();
  const actionsLoad = useWorkflowStore(({ actionsLoad }) => actionsLoad);
  const {
    actions: { data, status },
    actionMutations: mutations,
    handleCreateAction,
    workflow: { trigger },
  } = useWorkflow();
  if (status === 'error') return <>Error</>;
  if (status === 'pending') return <Loader />;
  const actions = data.map((action) => {
    const loading =
      actionsLoad || !!mutations.find((mutation) => mutation.id === action.id);
    return (
      <OptimisticWrapper key={action.id} loading={loading}>
        <Action key={action.id} action={action} />
        <WorkflowConnector />
      </OptimisticWrapper>
    );
  });
  const emailTemplate = all_company_email_template.find(
    ({ type }) => type === ACTION_TRIGGER_MAP[trigger][0].value,
  );
  return (
    <>
      {actions}
      {
        <WorkflowAdd
          onClickAdd={{
            onClick: () =>
              handleCreateAction({
                order: data.length ? data[data.length - 1].order + 1 : 1,
                email_template_id: emailTemplate.id,
                payload: {
                  body: emailTemplate.body,
                  subject: emailTemplate.subject,
                },
              }),
          }}
        />
      }
    </>
  );
};

export default Actions;

type ActionProps = {
  action: ReturnType<typeof useWorkflow>['actions']['data'][number];
};

const Action = (props: ActionProps) => {
  const { handleDeleteAction } = useWorkflow();
  return (
    <WorkflowItem
      textWorkflowType={'Action'}
      textTypeDescription={'An action to be performed'}
      slotWorkflowIcon={<ActionIcon />}
      slotInputFields={<Forms {...props} />}
      isDeleteVisible={true}
      onClickDelete={{
        onClick: () => handleDeleteAction({ id: props.action.id }),
      }}
    />
  );
};

const Forms = (props: ActionProps) => {
  return (
    <>
      <ActionForm {...props} />
      <Template key={props.action.email_template_id} {...props} />
    </>
  );
};

const ActionForm = ({
  action: {
    id,
    company_email_template: { type },
  },
}: ActionProps) => {
  const {
    emailTemplates: { data: all_company_email_template },
  } = useAuthDetails();
  const {
    handleUpdateAction,
    workflow: { trigger },
  } = useWorkflow();
  return (
    <UISelect
      label='Do this'
      value={type}
      menuOptions={ACTION_TRIGGER_MAP[trigger]}
      onChange={(e) => {
        const {
          body,
          id: email_template_id,
          subject,
        } = all_company_email_template.find(
          ({ type }) => type === e.target.value,
        );
        handleUpdateAction({
          id,
          payload: {
            email_template_id,
            payload: {
              subject,
              body,
            },
          },
        });
      }}
    />
  );
};

const Template = ({ action: { payload } }: ActionProps) => {
  const email_subject = <EmailSubject name='subject' value={payload} />;

  const email_body = <EmailBody name='body' value={payload} />;

  const forms = (
    <Stack spacing={'20px'}>
      {email_subject}
      {email_body}
    </Stack>
  );

  return forms;
};

type EmailTemplate = DatabaseTable['recruiter']['email_template'];

type FormsType = {
  name: keyof Omit<EmailTemplate[keyof EmailTemplate], 'default'>;
  value: {
    [key in keyof DatabaseTable['workflow_action']['payload']]: DatabaseTable['workflow_action']['payload'][key];
  };
  disabled?: boolean;
};

const EmailSubject: React.FC<FormsType> = memo(
  ({ name, value, disabled = true }) => {
    return (
      <UITextField
        label={'Email Subject'}
        disabled={disabled}
        name={name}
        placeholder={'Email Subject'}
        value={value[name]}
        error={false}
        helperText={null}
        onChange={null}
        minRows={1}
        multiline
        defaultLabelColor={palette.grey[800]}
      />
    );
  },
);
EmailSubject.displayName = 'EmailSubject';

const EmailBody: React.FC<FormsType> = memo(
  ({ name, value, disabled = true }) => {
    return (
      <Stack>
        <UITypography type='small'>Email Body</UITypography>
        <Stack
          sx={{
            mt: '8px',
            border: '1px solid',
            borderColor: palette.grey[400],
            borderRadius: '4px',
          }}
        >
          <TipTapAIEditor
            disabled={disabled}
            initialValue={value[name]}
            handleChange={null}
            placeholder=''
          />
        </Stack>
      </Stack>
    );
  },
);
EmailBody.displayName = 'EmailBody';

const ACTION_TRIGGER_MAP: {
  // eslint-disable-next-line no-unused-vars
  [trigger in DatabaseView['workflow_view']['trigger']]: {
    name: string;
    value: DatabaseTable['company_email_template']['type'];
  }[];
} = {
  availability_request_reminder: [
    { value: 'availability_request_reminder', name: 'Send email to applicant' },
  ],
  self_schedule_request_reminder: [
    {
      value: 'self_schedule_request_reminder',
      name: 'Send email to applicant',
    },
  ],
  upcoming_interview_reminder: [
    {
      value: 'upcoming_interview_reminder_candidate',
      name: 'Send email to applicant',
    },
    {
      value: 'upcoming_interview_reminder_interviewers',
      name: 'Send emails to interviewers',
    },
  ],
};

const ActionIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='20' height='20' rx='4' fill='#E9EBED' fill-opacity='0.5' />
      <path
        d='M7.4502 6.8375C7.3502 6.7875 7.2502 6.7875 7.1502 6.8375C7.0502 6.9 7.0002 6.9875 7.0002 7.1V13.7C7.0002 13.8125 7.0502 13.9 7.1502 13.9625C7.2502 14.0125 7.3502 14.0125 7.4502 13.9625L12.8502 10.6625C12.9502 10.6 13.0002 10.5125 13.0002 10.4C13.0002 10.2875 12.9502 10.2 12.8502 10.1375L7.4502 6.8375ZM6.86895 6.3125C7.16895 6.15 7.46895 6.15625 7.76895 6.33125L13.1689 9.63125C13.4439 9.80625 13.5877 10.0625 13.6002 10.4C13.5877 10.7375 13.4439 10.9937 13.1689 11.1687L7.76895 14.4688C7.46895 14.6438 7.16895 14.65 6.86895 14.4875C6.56895 14.3125 6.4127 14.05 6.4002 13.7V7.1C6.4127 6.75 6.56895 6.4875 6.86895 6.3125Z'
        fill='#2F3941'
      />
    </svg>
  );
};
