import { useToast } from '@components/hooks/use-toast';
import { ToastAction } from '@components/ui/toast';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { handleUpdatePassword } from '@/context/AuthContext/utils';

import { ProfileForms } from '../ProfileForms';
import {
  type FormValues,
  type PasswordFormFields,
  validatePassword,
} from '../util';

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
  const [error, setError] = useState('');
  const { toast } = useToast();

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
        toast({
          title: 'Password Updated',
          description: 'Your password has been successfully updated.',
          action: (
            <ToastAction altText='Close' onClick={handleClosePassword}>
              Close
            </ToastAction>
          ),
        });
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
    <div className='space-y-6'>
      <div>
        <ProfileForms
          profile={password}
          setProfile={setPassword}
          setChanges={() => setPasswordChange(true)}
        />
      </div>
      <div>
        {error && (
          <div className='flex items-center space-x-2 mb-3 text-destructive'>
            <AlertCircle className='h-4 w-4' />
            <p className='text-sm'>{error}</p>
          </div>
        )}
        <div className={`w-[200px] ${loading ? 'pointer-events-none' : ''}`}>
          <UIButton
            variant='default'
            size='md'
            disabled={
              !passwordChange ||
              password.password.value === '' ||
              password.confirmPassword.value === ''
            }
            onClick={async () => {
              setLoading(true);
              if (!loading) await handleSubmitPassword();
              setLoading(false);
            }}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </UIButton>
        </div>
      </div>
    </div>
  );
};
