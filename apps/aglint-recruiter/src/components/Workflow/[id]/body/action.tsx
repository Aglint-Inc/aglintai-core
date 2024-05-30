/* eslint-disable security/detect-object-injection */
import type { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
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
import { emailTemplates } from '@/src/utils/emailTemplate';

const Actions = () => {
  const {
    recruiter: { email_template },
  } = useAuthDetails();
  const {
    actions: { data, status },
    actionMutations: mutations,
    handleCreateAction,
  } = useWorkflow();
  if (status === 'error') return <>Error</>;
  if (status === 'pending') return <Loader />;
  const actions = data.map((action) => {
    const loading = !!mutations.find((mutation) => mutation.id === action.id);
    return (
      <OptimisticWrapper key={action.id} loading={loading}>
        <Action key={action.id} action={action} />
        <WorkflowConnector />
      </OptimisticWrapper>
    );
  });
  return (
    <>
      {actions}
      {
        <WorkflowAdd
          onClickAdd={{
            onClick: () =>
              handleCreateAction({
                order: data.length ? data[data.length - 1].order + 1 : 1,
                medium: 'email',
                target: 'applicant',
                payload: {
                  key: 'application_received',
                  template: email_template['application_received'],
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
      <TemplateForm {...props} />
      <Template key={props.action.payload.key} {...props} />
    </>
  );
};

const ActionForm = ({ action: { id, medium, target } }: ActionProps) => {
  const { handleUpdateAction } = useWorkflow();
  const payload = { medium, target };
  return (
    <UISelect
      label='Do this'
      value={JSON.stringify(payload)}
      menuOptions={ACTION_OPTIONS}
      onChange={(e) => {
        const { medium, target } = JSON.parse(e.target.value) as typeof payload;
        handleUpdateAction({
          id,
          payload: {
            medium,
            target,
          },
        });
      }}
    />
  );
};

const TemplateForm = ({ action: { id, payload } }: ActionProps) => {
  const {
    recruiter: { email_template },
  } = useAuthDetails();
  const { handleUpdateAction } = useWorkflow();
  return (
    <UISelect
      label='Template'
      value={payload?.key}
      menuOptions={TEMPLATE_OPTIONS}
      onChange={(e) => {
        const safeKey = e.target
          .value as ActionProps['action']['payload']['key'];
        handleUpdateAction({
          id,
          payload: {
            payload: {
              key: safeKey,
              template: email_template?.[safeKey],
            },
          },
        });
      }}
    />
  );
};

const Template = ({
  action: {
    payload: { template },
  },
}: ActionProps) => {
  const sender_name = <SenderName name='fromName' value={template} />;

  const email_subject = <EmailSubject name='subject' value={template} />;

  const email_body = <EmailBody name='body' value={template} />;

  const forms = (
    <Stack spacing={'20px'}>
      {sender_name}
      {email_subject}
      {email_body}
    </Stack>
  );

  return forms;
};

type EmailTemplate = DatabaseTable['recruiter']['email_template'];

type FormsType = {
  name: keyof Omit<EmailTemplate[keyof EmailTemplate], 'default'>;
  value: EmailTemplate[keyof EmailTemplate];
  disabled?: boolean;
};

const SenderName: React.FC<FormsType> = memo(
  ({ name, value, disabled = true }) => {
    return (
      <UITextField
        label={'Sender Name'}
        disabled={disabled}
        name={name}
        placeholder={'Sender Name'}
        value={value[name]}
        error={false}
        helperText={null}
        onChange={null}
        defaultLabelColor={palette.grey[800]}
      />
    );
  },
);
SenderName.displayName = 'SenderName';

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
            borderColor: palette.grey[300],
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

const TEMPLATE_OPTIONS: {
  name: string;
  value: ActionProps['action']['payload']['key'];
}[] = Object.entries(emailTemplates).map(([key, { heading }]) => ({
  name: heading,
  value: key as ActionProps['action']['payload']['key'],
}));

const ACTION_PAYLOAD: {
  medium: DatabaseEnums['workflow_action_medium'][];
  target: DatabaseEnums['workflow_action_target'];
}[] = [
  {
    medium: ['email'],
    target: 'applicant',
  },
  {
    medium: ['email'],
    target: 'hiring_manager',
  },
  {
    medium: ['email'],
    target: 'interviewers',
  },
  {
    medium: ['email'],
    target: 'recruiter',
  },
  {
    medium: ['email'],
    target: 'recruiting_coordinator',
  },
];

export const ACTION_OPTIONS = ACTION_PAYLOAD.reduce(
  (acc, { target, medium: mediums }) => {
    acc.push(
      ...mediums.map((medium) => ({
        name: getActionOption(medium, target),
        value: JSON.stringify({
          medium,
          target,
        }) as unknown as (typeof acc)[number]['value'],
      })),
    );
    return acc;
  },
  [] as {
    name: string;
    value: {
      medium: DatabaseEnums['workflow_action_medium'];
      target: DatabaseEnums['workflow_action_target'];
    };
  }[],
);

function getActionOption(
  medium: DatabaseEnums['workflow_action_medium'],
  target: DatabaseEnums['workflow_action_target'],
): string {
  let message = '';
  switch (target) {
    case 'applicant':
      message = 'the Applicant';
      break;
    case 'custom':
      message = 'custom emails';
      break;
    case 'hiring_manager':
      message = 'the Hiring Manager';
      break;
    case 'interviewers':
      message = 'the Interviewers';
      break;
    case 'recruiter':
      message = 'the Recruiter';
      break;
    case 'recruiting_coordinator':
      message = 'the Recruiting coordinator';
      break;
  }
  let preMessage = '';
  switch (medium) {
    case 'email':
      preMessage = 'an email';
      break;
    case 'slack':
      preMessage = 'a slack message';
      break;
  }
  return `Send ${preMessage} to ${message}`;
}

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
