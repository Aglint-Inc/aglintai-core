import { RecruiterUserType } from '@aglint/shared-types';
import { Autocomplete, Dialog, Typography } from '@mui/material';
import React, { useState } from 'react';

import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import UITextField from '@/src/components/Common/UITextField';
import { type useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

function RoleEditMember({
  user,
  close,
  errorMessage,
  handelMemberUpdate,
  options,
}: {
  user: RecruiterUserType;
  close: () => void;
  errorMessage: string;
  // eslint-disable-next-line no-unused-vars
  handelMemberUpdate: ReturnType<typeof useAuthDetails>['handelMemberUpdate'];
  options: { role: string; id: string }[];
}) {
  const [role_id, setRole_id] = useState<string>(user.role_id);
  return (
    <Dialog
      open={true}
      onClose={() => {
        // resetState();
        close();
      }}
    >
      <ConfirmationPopup
        onClickCancel={{ onClick: close }}
        isYellowButtonVisible={role_id && role_id !== user.role_id}
        textPopupTitle={'Update Role'}
        isIcon={false}
        isBlueButtonVisible={false}
        isDescriptionVisible={false}
        textPopupDescription={`Update role for ${user.first_name} ${user.last_name}`}
        textPopupButton={'Update'}
        onClickAction={{
          onClick: () => {
            handelMemberUpdate({
              user_id: user.user_id,
              data: { role_id: role_id },
            });
          },
        }}
        slotWidget={
          <>
            {errorMessage && (
              <Typography fontWeight={600}>Warning: {errorMessage}</Typography>
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
                  //   required
                  //   error={formError.role}
                  //   helperText={formError.role ? 'Role must required' : ''}
                  //   onFocus={() => {
                  //     setFormError({ ...formError, role: false });
                  //   }}
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
