import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { WelcomeSlider2 } from '@/devlink';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';

import { Details, SignUpError } from '../SlideSignup/types';
import { handleEmail, handlePassword, stepObj } from '../SlideSignup/utils';
import Icon from '../../Common/Icons/Icon';

const SlideLogin = () => {
  const router = useRouter();
  const { setStep } = useSignupDetails();
  const [details, setDetails] = useState<Omit<Details, 'name'>>({
    email: '',
    password: '',
  });
  const [checked, setChecked] = useState<boolean>(true);
  const [signUpError, setSignUpError] = useState<Omit<SignUpError, 'name'>>({
    email: {
      error: false,
      msg: '',
    },
    password: {
      error: false,
      msg: '',
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formValidation = async () => {
    let isValid = true;

    const email = handleEmail(details.email);

    if (email.error) {
      isValid = false;
      setSignUpError((prevError) => ({
        ...prevError,
        email: email,
      }));
    } else {
      setSignUpError((prevError) => ({
        ...prevError,
        email: email,
      }));
    }
    const password = handlePassword(details.password);

    if (password.error) {
      isValid = false;
      setSignUpError((prevError) => ({
        ...prevError,
        password: password,
      }));
    } else {
      setSignUpError((prevError) => ({
        ...prevError,
        password: password,
      }));
    }
    return isValid;
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!checked && !(await formValidation())) return null;

    const authdata = await supabase.auth.signInWithPassword({
      email: details.email,
      password: details.password,
    });
    if (!authdata.error) {
      router.push(pageRoutes.JOBS);
    } else {
      signUpError.password = {
        error: true,
        msg: authdata.error.message,
      };
      setSignUpError({
        ...signUpError,
      });
    }
  };

  return (
    <>
      <WelcomeSlider2
        onClickSignUp={{
          onClick: () => {
            router.push(`?step=${stepObj.signup}`, undefined, {
              shallow: true,
            });
            setStep(stepObj.signup);
          },
        }}
        isChecked={checked}
        onClickCheck={{
          onClick: () => {
            setChecked(!checked);
          },
        }}
        onClickLogin={{
          onClick: () => {
            handleLogin();
          },
        }}
        isLoginButtonDisable={!details.email || !details.password}
        slotSignInForm={
          <Stack spacing={'20px'} p={'4px'}>
            <TextField
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
              error={signUpError.email.error}
              helperText={signUpError.email.error ? signUpError.email.msg : ''}
              inputProps={{
                autoCapitalize: 'true',
                style: {
                  fontSize: '14px',
                },
              }}
            />
            <TextField
              required
              margin='none'
              fullWidth
              name='password'
              type={showPassword ? 'text' : 'password'}
              label={'Password'}
              autoComplete='current-password'
              id='password'
              error={
                signUpError?.password?.error
                  ? signUpError?.password?.error
                  : false
              }
              helperText={
                signUpError.password.error ? signUpError.password.msg : ''
              }
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
      />
    </>
  );
};

export default SlideLogin;
