import { Dialog, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { PasswordUpdated } from '@/devlink/PasswordUpdated';
import { UserPasswordChange } from '@/devlink/UserPasswordChange';
import { handleUpdatePassword } from '@/src/context/AuthContext/utils';

import Icon from '../../Common/Icons/Icon';
import UITypography from '../../Common/UITypography';
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
      label: 'Create new Password',
      placeholder: 'Enter a new password.',
    },
    confirmPassword: {
      ...initialFormValues,
      value: '',
      validation: 'password',
      type: 'password',
      required: true,
      label: 'Re-enter new password',
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
  const [error, setError] = useState('');

  const handleSubmitPassword = async () => {
    const { newPassword, error: valiError } = handleValidatePassword();
    if (!valiError) {
      setPassword((prev) => ({
        ...prev,
        password: { ...prev.password, error: false },
        confirmPassword: { ...prev.confirmPassword, error: false },
      }));
      const { error, message } = await handleUpdatePassword(newPassword);
      if (!error) {
        setPassword((prev) => ({
          ...prev,
          password: { ...prev.password, modal: true },
        }));
        setPasswordChange(true);
      } else {
        setError(message);
      }
    } else {
      setPassword((prev) => {
        return {
          ...prev,
          password: { ...prev.password, error: true, helperText: valiError },
          confirmPassword: {
            ...prev.confirmPassword,
            error: true,
            helperText: valiError,
          },
        };
      });
    }
  };
  const handleClosePassword = () => {
    setPassword(initialPassword);
  };
  useEffect(() => {
    setError('');
  }, [password]);
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
            {error && (
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'start'}
                marginBottom={'var(--space-3)'}
              >
                <Icon
                  height='12px'
                  color={'var(--error-9)'}
                  variant='AlertIcon'
                />
                <UITypography type='small' color={'var(--error-11)'}>
                  {error}
                </UITypography>
              </Stack>
            )}
            <Stack
              style={{
                pointerEvents: loading ? 'none' : 'auto',
                zIndex: 0,
              }}
              width={'200px'}
            >
              <ButtonSolid
                textButton='Update Password'
                size={2}
                isLoading={loading}
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
