import { RecruiterUserType } from '@aglint/shared-types';
import { Autocomplete, Dialog, Typography } from '@mui/material';
import React, { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

function RoleEditMember({
  user,
  defaultRole,
  close,
  errorMessage,
  handleMemberUpdate,
  options,
}: {
  user: RecruiterUserType;
  defaultRole?: string;
  close: () => void;
  errorMessage: string;
  // eslint-disable-next-line no-unused-vars
  handleMemberUpdate: ReturnType<typeof useAuthDetails>['handleMemberUpdate'];
  options: { role: string; id: string }[];
}) {
  const [role_id, setRole_id] = useState<string>(defaultRole || user.role_id);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Dialog
      open={true}
      onClose={() => {
        // resetState();
        close();
      }}
    >
      <DcPopup
        popupName='Update Role'
        onClickClosePopup={{ onClick: close }}
        slotButtons={
          <>
            <ButtonSoft
              textButton='Cancel'
              size={2}
              color={'neutral'}
              onClickButton={{
                onClick: close,
              }}
            />
            <ButtonSolid
              textButton='Update'
              size={2}
              isLoading={isLoading}
              isDisabled={role_id === user.role_id}
              onClickButton={{
                onClick: async () => {
                  setIsLoading(true);
                  await handleMemberUpdate({
                    user_id: user.user_id,
                    data: { role_id: role_id },
                  });
                  setIsLoading(false);
                },
              }}
            />
          </>
        }
        slotBody={
          <>
            <Typography
              marginBottom={'10px'}
            >{`Update role for ${user.first_name} ${user.last_name}`}</Typography>
            {role_id && role_id !== user.role_id && (
              <GlobalBannerInline
                color={'warning'}
                textContent={
                  'User role will be changed to ' +
                  capitalizeFirstLetter(
                    options.find((item) => item.id === role_id).role,
                  )
                }
                slotButton={<></>}
              />
            )}
            {errorMessage && (
              <GlobalBannerInline
                textContent={errorMessage}
                slotButton={<></>}
                color={'warning'}
              />
              // <Typography fontWeight={600} color={'var(--warning-11)'}>Warning: {errorMessage}</Typography>
            )}
            <Autocomplete
              fullWidth
              disableClearable
              disabled={Boolean(errorMessage)}
              value={options.find((item) => item.id === role_id)}
              getOptionLabel={(option) => capitalizeFirstLetter(option.role)}
              onChange={(_, newValue) => {
                setRole_id(newValue.id);
              }}
              id='controllable-states-demo'
              options={options}
              renderOption={(props, op) => (
                <li {...props}>{capitalizeFirstLetter(op.role)}</li>
              )}
              renderInput={(params) => (
                <UITextField
                  {...params}
                  name='Role'
                  placeholder='Choose Role'
                  label='Role: '
                />
              )}
            />
          </>
        }
      />
    </Dialog>
  );
}

export default RoleEditMember;
