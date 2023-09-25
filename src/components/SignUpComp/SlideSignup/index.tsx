import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { WelcomeSlider3 } from '@/devlink/WelcomeSlider3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { errorMessages } from '@/src/utils/errorMessages';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { Details, SignUpError } from './types';
import { handleEmail, handlePassword, stepObj } from './utils';
import Icon from '../../Common/Icons/Icon';

const SlideTwoSignUp = () => {
  const router = useRouter();
  const { setStep, flow } = useSignupDetails();
  const { setUserDetails, setRecruiter } = useAuthDetails();
  const [details, setDetails] = useState<Details>({
    name: '',
    email: '',
    password: '',
  });

  const [checked, setChecked] = useState<boolean>(true);
  const [signUpError, setSignUpError] = useState<SignUpError>({
    name: {
      error: false,
      msg: '',
    },
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
    if (!details.name) {
      isValid = false;
      signUpError.name = {
        error: true,
        msg: errorMessages.nameRequired,
      };
    } else {
      signUpError.name = {
        error: false,
        msg: errorMessages.nameRequired,
      };
    }
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

  const handelSignUp = async () => {
    if (!(await formValidation())) return null;

    const authdata = await supabase.auth.signUp({
      email: details.email,
      password: details.password,
      options: {
        data: {
          name: details.name,
          role: 'Recruiter',
        },
      },
    });
    if (!authdata.error) {
      setUserDetails(authdata.data.session);
      const { data, error } = await supabase
        .from('recruiter')
        .insert({
          email: details.email,
          user_id: authdata.data.user.id,
          name: details.name,
          recruiter_type: flow,
        })
        .select();

      if (!error) {
        setRecruiter(data[0]);
        router.push(`?step=${stepObj.detailsOne}`, undefined, {
          shallow: true,
        });
        setStep(stepObj.detailsOne);
      }
    } else {
      if (
        authdata.error.message === errorMessages.passwordRequired ||
        authdata.error.message === 'Signup requires a valid password'
      ) {
        setSignUpError({
          ...signUpError,
          password: {
            error: false,
            msg: 'Signup requires a valid password',
          },
        });
      } else if (authdata.error.message === errorMessages.userRegistered) {
        setSignUpError({
          ...signUpError,
          email: {
            error: true,
            msg: authdata.error.message,
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
    <div>
      <WelcomeSlider3
        isSignUpButtonVisible={
          !details.name || !details.email || !details.password
        }
        onClickRegisterWithGoogle={{
          onClick: () => {
            oauthHandler('google');
          },
        }}
        onClickRegisterLinkedIn={{
          onClick: () => {
            oauthHandler('google');
          },
        }}
        onClickBack={{
          onClick: () => {
            setStep(stepObj.type);
          },
        }}
        onClickCheck={{
          onClick: () => {
            setChecked(!checked);
          },
        }}
        onClickSignUp={{
          onClick: () => {
            handelSignUp();
          },
        }}
        isTermsChecked={checked}
        onClickSignIn={{
          onClick: () => {
            setStep(stepObj.signin);
          },
        }}
        slotSignUpForm={
          <Stack spacing={'20px'}>
            <TextField
              margin='none'
              required
              fullWidth
              id='name'
              label='Company Name'
              value={details.name}
              onChange={(e) => {
                setDetails({ ...details, name: e.target.value });
              }}
              error={signUpError.name.error}
              helperText={signUpError.name.error ? signUpError.name.msg : ''}
              inputProps={{
                autoCapitalize: 'true',
                style: {
                  fontSize: '14px',
                },
              }}
            />
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
    </div>
  );
};

export default SlideTwoSignUp;
