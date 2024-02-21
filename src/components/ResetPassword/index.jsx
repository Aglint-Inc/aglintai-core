import { Stack } from '@mui/material';
import { errorMessages } from '@utils/errorMessages';
import { pageRoutes } from '@utils/pageRouting';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { ResetPassword } from '@/devlink';
import { supabase } from '@/src/utils/supabase/client';
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
    try {
      event.preventDefault();
      if (newpassword?.current?.value == confirmpassword?.current?.value) {
        const { error } = await supabase.auth.updateUser({
          password: confirmpassword?.current?.value,
          data: { is_invite: 'false' }, // for invite user flow this is needed
        });
        if (!error) {
          toast.success('Password reset successful');
          const { data: user } = await supabase.auth.getSession();
          const { data, error } = await supabase
            .from('recruiter_user')
            .select('*')
            .eq('user_id', user.session.user.id);

          if (error) {
            throw error;
          }
          if (data[0].role === 'interviewer') {
            router.push(pageRoutes.INTERVIEWER);
          } else {
            router.push(pageRoutes.DASHBOARD);
          }
          router.push(pageRoutes.DASHBOARD);
        } else {
          if (
            error == 'AuthApiError: Password should be at least 8 characters'
          ) {
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
      }
    } catch (e) {
      toast.error('Something went wrong. Please try again later');
    }
  };

  useEffect(() => {
    try {
      const tempObj =
        router.asPath
          .slice(router.asPath.indexOf('#'))
          .replaceAll('=', '":"')
          .replaceAll('&', '","')
          .replaceAll('#', '{"') + '"}';
      const tempCreds = JSON.parse(tempObj);
      tempCreds.access_token &&
        supabase.auth.setSession({
          access_token: tempCreds.access_token,
          refresh_token: tempCreds.refresh_token,
        });
    } catch (e) {
      //
    }
  }, []);

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
