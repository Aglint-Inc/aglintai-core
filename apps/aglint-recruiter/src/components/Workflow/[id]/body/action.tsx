/* eslint-disable security/detect-object-injection */
import type { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React, { memo, useMemo } from 'react';

import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { WorkflowAdd } from '@/devlink3/WorkflowAdd';
import { WorkflowConnector } from '@/devlink3/WorkflowConnector';
import { WorkflowItem } from '@/devlink3/WorkflowItem';
import Loader from '@/src/components/Common/Loader';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UISelect from '@/src/components/Common/Uiselect';
import UITypography from '@/src/components/Common/UITypography';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import { WorkflowAction } from '@/src/types/workflow.types';
import toast from '@/src/utils/toast';

import { useActions } from './context';

const Actions = () => {
  const {
    actions: { data, status },
    actionMutations: mutations,
    manageWorkflow,
    devlinkProps,
  } = useWorkflow();
  const { createAction, canCreateAction } = useActions();

  if (status === 'error') return <>Error</>;
  if (status === 'pending') return <Loader />;
  const actions = data.map((action) => {
    const loading = !!mutations.find((mutation) => mutation.id === action.id);
    return (
      <OptimisticWrapper key={action.id} loading={loading}>
        <WorkflowConnector />
        <Action key={action.id} action={action} />
      </OptimisticWrapper>
    );
  });
  return (
    <>
      {actions}
      {canCreateAction && manageWorkflow && (
        <>
          <WorkflowConnector />
          <WorkflowAdd
            onClickAdd={{
              onClick: () => createAction(),
              ...devlinkProps,
            }}
          />
        </>
      )}
    </>
  );
};

export default Actions;

type ActionProps = {
  action: ReturnType<typeof useWorkflow>['actions']['data'][number];
};

const Action = (props: ActionProps) => {
  const { handleDeleteAction, devlinkProps } = useWorkflow();
  return (
    <WorkflowItem
      textWorkflowType={'Action'}
      textTypeDescription={'An action to be performed'}
      slotWorkflowIcon={<ActionIcon />}
      slotInputFields={<Forms {...props} />}
      isDeleteVisible={true}
      onClickDelete={{
        onClick: () => handleDeleteAction({ id: props.action.id }),
        ...devlinkProps,
      }}
    />
  );
};

const Forms = (props: ActionProps) => {
  return (
    <>
      <ActionForm {...props} />
      {props.action.company_email_template.type.split('_slack_').length ===
      2 ? (
        <GlobalBannerInline
          textContent={'A slack notification will be sent for this action.'}
          slotButton={<></>}
        />
      ) : (
        <Template key={props.action.email_template_id} {...props} />
      )}
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
  const { handleUpdateAction, manageWorkflow } = useWorkflow();
  const { globalOptions, getCurrentOption } = useActions();
  const options = useMemo(
    () => [...globalOptions, getCurrentOption(type)],
    [globalOptions, type],
  );
  return (
    <UISelect
      label='Do this'
      value={type}
      disabled={!manageWorkflow}
      menuOptions={options}
      onChange={(e) => {
        const emailTemplate = all_company_email_template.find(
          ({ type }) => type === e.target.value,
        );
        if (emailTemplate) {
          const { body, id: email_template_id, subject } = emailTemplate;
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
        } else toast.error('Template for this action is missing');
      }}
    />
  );
};

const Template = ({ action: { payload } }: ActionProps) => {
  const email_subject = <EmailSubject name='subject' value={payload} />;

  const email_body = <EmailBody name='body' value={payload} />;

  const forms = (
    <Stack spacing={'var(--space-5)'}>
      {email_subject}
      {email_body}
    </Stack>
  );

  return forms;
};

type EmailTemplate = Pick<
  DatabaseTable['company_email_template'],
  'body' | 'subject'
>;

type FormsType = {
  name: keyof EmailTemplate;
  value: {
    [key in keyof WorkflowAction['payload']]: WorkflowAction['payload'][key];
  };
  disabled?: boolean;
};

const EmailSubject: React.FC<FormsType> = memo(
  ({ name, value, disabled = true }) => {
    return (
      <Stack>
        <UITypography type='small'>Email Subject</UITypography>
        <Stack
          sx={{
            mt: '8px',
            border: '1px solid',
            borderColor: 'var(--neutral-6)',
            borderRadius: 'var(--radius-2)',
          }}
        >
          <TipTapAIEditor
            singleLine={true}
            padding={1}
            toolbar={false}
            disabled={disabled}
            editor_type='email'
            initialValue={value?.[name]}
            handleChange={null}
            placeholder=''
          />
        </Stack>
      </Stack>
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
            borderColor: 'var(--neutral-6)',
            borderRadius: 'var(--radius-2)',
          }}
        >
          <TipTapAIEditor
            toolbar={false}
            disabled={disabled}
            editor_type='email'
            initialValue={value?.[name]}
            handleChange={null}
            placeholder=''
          />
        </Stack>
      </Stack>
    );
  },
);
EmailBody.displayName = 'EmailBody';

const ActionIcon = memo(() => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='20' height='20' rx='4' />
      <path
        d='M7.4502 6.8375C7.3502 6.7875 7.2502 6.7875 7.1502 6.8375C7.0502 6.9 7.0002 6.9875 7.0002 7.1V13.7C7.0002 13.8125 7.0502 13.9 7.1502 13.9625C7.2502 14.0125 7.3502 14.0125 7.4502 13.9625L12.8502 10.6625C12.9502 10.6 13.0002 10.5125 13.0002 10.4C13.0002 10.2875 12.9502 10.2 12.8502 10.1375L7.4502 6.8375ZM6.86895 6.3125C7.16895 6.15 7.46895 6.15625 7.76895 6.33125L13.1689 9.63125C13.4439 9.80625 13.5877 10.0625 13.6002 10.4C13.5877 10.7375 13.4439 10.9937 13.1689 11.1687L7.76895 14.4688C7.46895 14.6438 7.16895 14.65 6.86895 14.4875C6.56895 14.3125 6.4127 14.05 6.4002 13.7V7.1C6.4127 6.75 6.56895 6.4875 6.86895 6.3125Z'
        fill='#cc4e00'
      />
    </svg>
  );
});
ActionIcon.displayName = 'ActionIcon';
