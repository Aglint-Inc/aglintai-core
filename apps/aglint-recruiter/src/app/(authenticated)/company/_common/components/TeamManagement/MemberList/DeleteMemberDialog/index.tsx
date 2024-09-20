/* eslint-disable security/detect-object-injection */
/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { JobCoordinator } from '@/jobs/create/components/form';

function DeleteMemberDialog({
  name,
  reason,
  role,
  action,
  warning,
  close,
}: {
  name: string;
  reason: 'cancel_invite' | 'delete' | 'suspend';
  role?: string;
  action:
    | (({ interviewTypes }: { interviewTypes: string }) => void)
    | (() => void);
  warning?: string;
  close: () => void;
}) {
  // const { status } = useCompanyMembers();
  const [form, setForm] = useState<{
    values: { interviewTypes: string };
    error: { interviewTypes: boolean };
  }>({
    values: {
      interviewTypes: null,
    },
    error: {
      interviewTypes: false,
    },
  });
  function handelFormUpdate(val: Partial<(typeof form)['values']>) {
    const temp = structuredClone(form);
    for (const item in val) {
      if (val[item].length) {
        temp.values[item] = val[item];
        temp.error[item] = false;
      } else {
        temp.error[item] = true;
      }
    }
    setForm(temp);
  }
  const isInterviewTypesRequire = [
    'recruiter',
    'recruiting_coordinator',
    'sourcer',
    'hiring_manager',
  ].find((item) =>
    item.replace('_', '').includes(role?.replace(' ', '') || ''),
  );
  function validateForm() {
    const temp = structuredClone(form);
    let flag = true;

    if (isInterviewTypesRequire && !form.values.interviewTypes?.length) {
      temp.error.interviewTypes = true;
      flag = false;
    }

    setForm(temp);
    return flag;
  }

  const title =
    reason === 'delete'
      ? `Delete the member: ${name}`
      : reason === 'cancel_invite'
        ? `Cancel invitation to: ${name}`
        : reason === 'suspend'
          ? `Suspend ${name}`
          : '';

  const button_text =
    reason === 'delete'
      ? 'Delete'
      : reason === 'cancel_invite'
        ? 'Cancel Invite'
        : reason === 'suspend'
          ? 'Suspend'
          : '';

  const description =
    reason === 'delete' ? (
      <div className='space-y-4'>
        <p className='text-base'>
          By clicking delete the member will be permanently deleted.
        </p>
        {warning && (
          <p className='text-base text-red-700'>Warning: {warning}</p>
        )}
      </div>
    ) : reason === 'cancel_invite' ? (
      <p className='text-base'>
        By clicking cancel invitation will be canceled and removed from the
        members list.
      </p>
    ) : reason === 'suspend' ? (
      <div className='space-y-4'>
        <p className='font-medium'>
          You are about to suspend {name} from the system.
        </p>
        <ul className='list-disc space-y-2 pl-5'>
          <li> Once suspended, {name} will not have login access.</li>
          <li>
            The user will be removed from interview types, so no new interviews
            will be scheduled.
          </li>
          <li>
            However, they can still attend and complete current interviews.
          </li>
          <li>
            To suspend the user, you must Assign their job roles to another
            user.
          </li>
        </ul>

        <div className='space-y-4'>
          {isInterviewTypesRequire && (
            <div className='space-y-1'>
              <p>Reassign current Interview Types to:</p>
              <JobCoordinator
                // @ts-expect-error
                name={isInterviewTypesRequire}
                value={{
                  required: true,
                  error: {
                    helper: '',
                    value: form.error.interviewTypes,
                  },
                  value: form.values.interviewTypes,
                }}
                label={false}
                onChange={(_, val) => handelFormUpdate({ interviewTypes: val })}
              />
            </div>
          )}
        </div>
      </div>
    ) : (
      <></>
    );

  const onClick = () =>
    reason === 'delete'
      ? action
      : reason === 'cancel_invite'
        ? action
        : reason === 'suspend'
          ? () => {
              if (validateForm()) {
                action({
                  interviewTypes: form.values.interviewTypes,
                });
              }
            }
          : null;
  return (
    <UIDialog
      open={Boolean(reason)}
      onClose={close}
      title={title}
      slotButtons={
        <>
          <UIButton variant='secondary' onClick={close}>
            Cancel
          </UIButton>
          <UIButton size='md' onClick={onClick}>
            {button_text}
          </UIButton>
        </>
      }
    >
      {description}
    </UIDialog>
  );
}

export default DeleteMemberDialog;
