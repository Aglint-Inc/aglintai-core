import { Dialog, Stack } from '@mui/material';
import { useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { PasswordUpdated } from '@/devlink/PasswordUpdated';
import { UserPasswordChange } from '@/devlink/UserPasswordChange';
import { handleUpdatePassword } from '@/src/context/AuthContext/utils';

import { ProfileForms } from '..';
import { FormValues, PasswordFormFields, validatePassword } from '../util';

export const PasswordUpdate = () => {
  const [passwordChange, setPasswordChange] = useState(false);
  const initialFormValues: FormValues = {
    value: null,
    label: null,
    type: 'text',
    helperText: null,
    placeholder: null,
    error: false,
    blocked: false,
    validation: 'string',
    required: false,
    disabled: false,
    specialForm: false,
    options: null,
    modal: false,
  };

  const initialPassword: PasswordFormFields = {
    password: {
      ...initialFormValues,
      value: '',
      validation: 'password',
      type: 'password',
      required: true,
      label: 'Create New Password',
      placeholder: 'Enter a new password.',
    },
    confirmPassword: {
      ...initialFormValues,
      value: '',
      validation: 'password',
      type: 'password',
      required: true,
      label: 'Re-enter New Password',
      placeholder: 'Re-enter the new password for confirmation.',
    },
  };

  const [password, setPassword] = useState(initialPassword);
  const [loading, setLoading] = useState(false);

  const handleValidatePassword = () => {
    if (
      validatePassword(password.password.value) &&
      validatePassword(password.confirmPassword.value)
    ) {
      if (
        password.password.value.trim() === password.confirmPassword.value.trim()
      ) {
        return {
          newPassword: password.password.value.trim(),
          error: null,
        };
      } else
        return {
          newPassword: null,
          error: 'Passwords do not match',
        };
    } else
      return {
        newPassword: null,
        error:
          'Must contain more than 7 characters, 1 uppercase letter, 1 lowercase letter and 1 number',
      };
  };

  const handleSubmitPassword = async () => {
    const { newPassword, error } = handleValidatePassword();
    if (!error) {
      const res = await handleUpdatePassword(newPassword, false);
      if (!res) return;
      setPassword((prev) => ({
        ...prev,
        password: { ...prev.password, modal: true },
      }));
      setPasswordChange(true);
    } else {
      setPassword((prev) => {
        return {
          ...prev,
          password: { ...prev.password, error: true, helperText: error },
          confirmPassword: {
            ...prev.confirmPassword,
            error: true,
            helperText: error,
          },
        };
      });
    }
  };
  const handleClosePassword = () => {
    setPassword(initialPassword);
  };
  return (
    <>
      <Dialog
        open={password.password.modal}
        onClose={() => handleClosePassword()}
      >
        <PasswordUpdated
          onClickClose={{
            onClick: () => handleClosePassword(),
          }}
        />
      </Dialog>
      <UserPasswordChange
        slotPassword={
          <>
            <ProfileForms
              profile={password}
              setProfile={setPassword}
              setChanges={() => setPasswordChange(true)}
            />
          </>
        }
        slotSavePassword={
          <>
            <Stack
              style={{
                pointerEvents: loading ? 'none' : 'auto',
                zIndex: 0,
              }}
            >
              <ButtonSolid
                textButton='Update Password'
                size={2}
                isDisabled={
                  !passwordChange ||
                  password.password.value === '' ||
                  password.confirmPassword.value === ''
                }
                onClickButton={{
                  onClick: async () => {
                    setLoading(true);
                    if (!loading) await handleSubmitPassword();
                    setLoading(false);
                  },
                }}
              />
            </Stack>
          </>
        }
      />
    </>
  );
};
