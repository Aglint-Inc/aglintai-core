import { Stack } from '@mui/material';
import { errorMessages } from '@utils/errorMessages';
import { pageRoutes } from '@utils/pageRouting';
import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { ResetPassword } from '@/devlink';
import toast from '@/src/utils/toast';

import AUIButton from '../Common/AUIButton';
import Password from '../Common/Password';

export default function ResetPasswordComponent() {
  const router = useRouter();
  const newpassword = useRef();
  const confirmpassword = useRef();
  const [passwordError, setPasswordError] = useState({
    password: {
      error: false,
      userError: false,
      msg: 'The Two Passwords That You Entered Do Not Match!',
      userMsg: errorMessages.passwordRequired,
    },
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    password: {
      error: false,
    },
  });
  const handlePassword = () => {
    const value = newpassword?.current?.value;
    if (value.length < 8) {
      setConfirmPasswordError((prevError) => ({
        ...prevError,
        password: {
          error: true,
          msg: 'Password must be at least 8 characters long',
        },
      }));
      return true;
    } else if (!/[A-Z]/.test(value)) {
      setConfirmPasswordError((prevError) => ({
        ...prevError,
        password: {
          error: true,
          msg: 'Password must contain at least one uppercase letter',
        },
      }));
      return true;
    } else if (!/[a-z]/.test(value)) {
      setConfirmPasswordError((prevError) => ({
        ...prevError,
        password: {
          error: true,
          msg: 'Password must contain at least one lowercase letter',
        },
      }));
      return true;
    } else if (!/[0-9]/.test(value)) {
      setConfirmPasswordError((prevError) => ({
        ...prevError,
        password: {
          error: true,
          msg: 'Password must contain at least one number',
        },
      }));
      return true;
    } else if (!/[!@#$%^&*.|]/.test(value)) {
      setConfirmPasswordError((prevError) => ({
        ...prevError,
        password: {
          error: true,
          msg: 'Password must contain at least one special character',
        },
      }));
      return true;
    } else {
      setConfirmPasswordError((prevError) => ({
        ...prevError,
        password: {
          error: false,
          userError: false,
          msg: '',
        },
      }));
    }
    return false;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newpassword?.current?.value == confirmpassword?.current?.value) {
      const { error } = await supabase.auth.updateUser({
        password: confirmpassword?.current?.value,
      });
      if (!error) {
        toast.success('Password Reset Successfully');
        router.push(pageRoutes.JOBS);
      } else {
        if (error == 'AuthApiError: Password should be at least 8 characters') {
          // toast.error('Password should be at least 8 characters');
          setPasswordError({
            ...passwordError,
            password: {
              ...passwordError.password,
              userError: true,
              error: false,
            },
          });
          setConfirmPasswordError({
            ...confirmPasswordError,
            password: {
              ...confirmPasswordError.password,
              error: true,
            },
          });
        } else {
          toast.error(error.message);
        }
      }
    } else {
      // toast.error('The Two Passwords That You Entered Do Not Match!');
      setPasswordError({
        ...passwordError,
        password: {
          ...passwordError.password,
          error: true,
          userError: false,
        },
      });
      setConfirmPasswordError({
        ...confirmPasswordError,
        password: {
          ...confirmPasswordError.password,
          error: true,
        },
      });
      // toast.error('The two passwords that you entered do not match!');
    }
  };

  return (
    <>
      <ResetPassword
        slotResetPasswordForm={
          <Stack component='form' onSubmit={handleSubmit} spacing={2}>
            <Stack spacing={2}>
              <Password
                validate={handlePassword}
                passwordRef={newpassword}
                error={confirmPasswordError}
                setError={setConfirmPasswordError}
              />

              <Password
                validate={handlePassword}
                passwordRef={confirmpassword}
                label='Confirm Password'
                error={passwordError}
                setError={setPasswordError}
              />
            </Stack>
            <AUIButton size='small' onClick={handleSubmit}>
              Reset password
            </AUIButton>
          </Stack>
        }
      />
    </>
  );
}
