/* eslint-disable security/detect-object-injection */
/* eslint-disable no-unused-vars */
import { Dialog, List, ListItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { DeletePopup } from '@/devlink3/DeletePopup';
import AutoCompletePro from '@/src/components/Common/AutoCompletePro';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { JobCoordinator } from '@/src/components/Jobs/Create/form';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

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
  action: ({
    interviewTypes,
    task,
  }: {
    interviewTypes: string;
    task: string;
  }) => void;
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
    for (let item in val) {
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

  return (
    <Dialog
      open={Boolean(reason)}
      onClose={() => {
        // resetState();
        close();
      }}
    >
      <ShowCode>
        <ShowCode.When isTrue={reason === 'delete'}>
          <DeletePopup
            textTitle={
              <Typography variant='body1bold'>
                Delete the member:{' '}
                <span style={{ color: 'var(--error-11)' }}>{name}</span>
              </Typography>
            }
            textDescription={
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
            }
            isIcon={false}
            isWidget={true}
            onClickCancel={{ onClick: close }}
            onClickDelete={{
              onClick: action,
            }}
            buttonText={'Delete'}
          />
        </ShowCode.When>
        <ShowCode.When isTrue={reason === 'cancel_invite'}>
          <DeletePopup
            textTitle={
              <Typography variant='body1bold'>
                Cancel invitation to:{' '}
                <span style={{ color: 'var(--warning-11)' }}>{name}</span>
              </Typography>
            }
            textDescription={
              <Typography variant='body1'>
                By clicking cancel invitation will be cancelled and removed from
                the members list.
              </Typography>
            }
            isIcon={false}
            isWidget={true}
            onClickCancel={{ onClick: close }}
            onClickDelete={{
              onClick: action,
            }}
            buttonText={'Cancel Invite'}
          />
        </ShowCode.When>
        <ShowCode.When isTrue={reason === 'suspend'}>
          <DeletePopup
            textTitle={
              <Typography variant='body1'>
                Suspend user:{' '}
                <span style={{ color: 'var(--warning-11)' }}>{name}</span>
              </Typography>
            }
            textDescription={
              <Stack spacing={2}>
                <Typography fontWeight={500}>
                  You are about to suspend {name} from the system.
                </Typography>
                <ul>
                  <li> Once suspended, {name} will not have login access.</li>
                  <li>
                    The user will be removed from interview types, so no new
                    interviews will be scheduled.
                  </li>
                  <li>
                    However, they can still attend and complete current
                    interviews.
                  </li>
                  <li>
                    To suspend the user, you must Assign their job roles to
                    another user.
                  </li>
                </ul>

                <Stack spacing={2}>
                  {isInterviewTypesRequire && (
                    <Stack spacing={1}>
                      Reassign current Interview Types to:
                      <JobCoordinator
                        // @ts-ignore
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
                        onChange={(_, val) =>
                          handelFormUpdate({ interviewTypes: val })
                        }
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
            }
            isIcon={false}
            isWidget={true}
            onClickCancel={{ onClick: close }}
            onClickDelete={{
              onClick: () => {
                if (validateForm()) {
                  action({
                    interviewTypes: form.values.interviewTypes,
                    task: form.values.task,
                  });
                }
              },
            }}
            buttonText={'Suspend'}
          />
        </ShowCode.When>
      </ShowCode>
    </Dialog>
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
  const { members, recruiterUser } = useAuthDetails();
  return (
    <AutoCompletePro
      options={members.filter((user) => user.user_id !== recruiterUser.user_id)}
      value={members.find((user) => user.user_id === val) || null}
      placeholder='Choose from the list'
      error={error}
      onChange={(val) => {
        val && setVal(val.user_id);
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
