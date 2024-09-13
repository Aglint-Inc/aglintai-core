/* eslint-disable security/detect-object-injection */
/* eslint-disable no-unused-vars */
import { DeletePopup } from '@devlink3/DeletePopup';
import { Dialog, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import AutoCompletePro from '@/components/Common/AutoCompletePro';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { JobCoordinator } from '@/jobs/create/components/form';
import { useAllMembers } from '@/queries/members';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

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
    | (({
        interviewTypes,
        task,
      }: {
        interviewTypes: string;
        task: string;
      }) => void)
    | (() => void);
  warning?: string;
  close: () => void;
}) {
  // const { status } = useCompanyMembers();
  const [form, setForm] = useState<{
    values: { interviewTypes: string; task: string };
    error: { interviewTypes: boolean; task: boolean };
  }>({
    values: {
      interviewTypes: null,
      task: null,
    },
    error: {
      interviewTypes: false,
      task: false,
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
    if (!form.values.task?.length) {
      temp.error.task = true;
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
      <>
        <Typography variant='body1'>
          By clicking delete the member will be permanently deleted.
        </Typography>
        {warning && (
          <>
            <br />
            <Typography variant='body1' color={'var(--error-11)'}>
              Warning: {warning}
            </Typography>
          </>
        )}
      </>
    ) : reason === 'cancel_invite' ? (
      <Typography variant='body1'>
        By clicking cancel invitation will be canceled and removed from the
        members list.
      </Typography>
    ) : reason === 'suspend' ? (
      <Stack spacing={2}>
        <Typography fontWeight={500}>
          You are about to suspend {name} from the system.
        </Typography>
        <ul>
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

        <Stack spacing={2}>
          {isInterviewTypesRequire && (
            <Stack spacing={1}>
              Reassign current Interview Types to:
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
            </Stack>
          )}
          <Stack spacing={1}>
            Reassign current Tasks to:
            <TaskAutoComplete
              val={form.values.task}
              setVal={(id) => handelFormUpdate({ task: id })}
              error={form.error.task}
            />
          </Stack>
        </Stack>
      </Stack>
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
                  task: form.values.task,
                });
              }
            }
          : null;
  return (
    <>
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
    </>
  );
}

export default DeleteMemberDialog;

function TaskAutoComplete({
  val,
  setVal,
  error,
}: {
  val: string;
  setVal: (x: string) => void;
  error;
}) {
  const { recruiterUser } = useAuthDetails();

  const { members } = useAllMembers();
  return (
    <AutoCompletePro
      options={members.filter((user) => user.user_id !== recruiterUser.user_id)}
      value={members.find((user) => user.user_id === val) || null}
      placeholder='Choose from the list'
      error={error}
      onChange={(val) => {
        if (val) setVal(val.user_id);
      }}
      getSelectLabel={(val) =>
        capitalizeFirstLetter(`${val.first_name} ${val.last_name || ''}`)
      }
      getOptionLabel={(props, op) => (
        <li {...props}>
          {capitalizeFirstLetter(`${op.first_name} ${op.last_name || ''}`)}
        </li>
      )}
    />
  );
}
