import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { RecLoginPage } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import Icon from '../Common/Icons/Icon';
import { Details } from '../SignUpComp/SlideSignup/types';

function Login() {
  const router = useRouter();
  const [errorCheck, setErrorCheck] = useState({
    email: {
      error: false,
      message: 'Please provide correct email!',
    },
    password: {
      error: false,
      message: 'Your password is less than 8 character',
    },
  });
  // const { setStep } = useSignupDetails();
  const [details, setDetails] = useState<
    Omit<Details, 'first_name' | 'last_name'>
  >({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function validateEmail(email: string) {
    if (!email.length) {
      setErrorCheck({
        ...errorCheck,
        email: {
          ...errorCheck.email,
          error: false,
        },
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (isValid) {
      setErrorCheck({
        ...errorCheck,
        email: {
          ...errorCheck.email,
          error: false,
        },
      });
      return false;
    } else {
      setErrorCheck({
        ...errorCheck,
        email: {
          ...errorCheck.email,
          error: true,
        },
      });
      return true;
    }
  }

  function validatePassword(password: string) {
    if (!password) {
      setErrorCheck({
        ...errorCheck,
        password: {
          ...errorCheck.password,
          error: false,
        },
      });
      return false;
    }
    if (password.length >= 8) {
      setErrorCheck({
        ...errorCheck,
        password: {
          ...errorCheck.password,
          error: false,
        },
      });
      return false;
    } else {
      setErrorCheck({
        ...errorCheck,
        password: {
          ...errorCheck.password,
          error: true,
        },
      });
      return true;
    }
  }

  const handleLogin = async () => {
    if (
      !validateEmail(emailRef.current.value) ||
      !validatePassword(passwordRef.current.value)
    ) {
      const authdata = await supabase.auth.signInWithPassword({
        email: details.email,
        password: details.password,
      });
      if (!authdata.error) {
        router.push(pageRoutes.JOBS);
      } else {
        setErrorCheck({
          ...errorCheck,
          password: {
            message: authdata.error.message,
            error: true,
          },
        });
      }
    }
  };

  const oauthHandler = async (provider) => {
    if (typeof window !== 'undefined')
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: provider,
          options: {
            redirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/loading`,
          },
        });
        if (error) {
          toast.error(error.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
  };
  return (
    <>
      <RecLoginPage
        onclickForgotPassword={{
          onClick: () => {
            router.push(pageRoutes.FORGOT_PASSWORD);
          },
        }}
        contactLink={{
          href: 'mailto:admin@aglinthq.com',
        }}
        onclickGoogle={{
          onClick: () => {
            oauthHandler('google');
          },
        }}
        onclickLinkedIn={{
          onClick: () => {
            oauthHandler('linkedin');
          },
        }}
        onclickSignup={{
          onClick: () => {
            router.push(`${pageRoutes.SIGNUP}?step=type`);
          },
        }}
        slotForm={
          <Stack spacing={'20px'} p={'4px'}>
            <TextField
              inputRef={emailRef}
              margin='none'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              value={details.email}
              onChange={(e) => {
                setDetails({ ...details, email: e.target.value });
              }}
              error={errorCheck.email.error}
              helperText={
                errorCheck.email.error ? errorCheck.email.message : ''
              }
              inputProps={{
                autoCapitalize: 'true',
                style: {
                  fontSize: '14px',
                },
              }}
              onBlur={() => {
                validateEmail(emailRef.current.value);
              }}
            />

            <TextField
              inputRef={passwordRef}
              required
              margin='none'
              fullWidth
              name='password'
              type={showPassword ? 'text' : 'password'}
              label={'Password'}
              autoComplete='current-password'
              id='password'
              error={
                errorCheck?.password?.error
                  ? errorCheck?.password?.error
                  : false
              }
              onBlur={() => {
                validatePassword(passwordRef.current.value);
              }}
              helperText={
                errorCheck.password.error ? errorCheck.password.message : ''
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleLogin();
                }
              }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? (
                        <Icon variant='LockOpenFilled' height='20' width='20' />
                      ) : (
                        <Icon
                          variant='LockCloseFilled'
                          height='20'
                          width='20'
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={details.password}
              onChange={(e) => {
                setDetails({ ...details, password: e.target.value });
              }}
              inputProps={{
                autoCapitalize: 'true',
                style: {
                  fontSize: '14px',
                },
              }}
            />
          </Stack>
        }
        onclickLogin={{ onClick: handleLogin }}
      />
    </>
  );
}

export default Login;
