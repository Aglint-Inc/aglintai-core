import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { WelcomeSlider3 } from '@/devlink/WelcomeSlider3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { RecruiterType } from '@/src/types/data.types';
import { errorMessages } from '@/src/utils/errorMessages';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { Details, SignUpError } from './types';
import {
  createSampleJobCandidate,
  handleEmail,
  handlePassword,
  stepObj,
} from './utils';
import Icon from '../../Common/Icons/Icon';

const SlideTwoSignUp = () => {
  const router = useRouter();
  const { setStep, flow } = useSignupDetails();
  const { setUserDetails, setRecruiter } = useAuthDetails();
  const [details, setDetails] = useState<Details>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [checked, setChecked] = useState<boolean>(true);
  const [signUpError, setSignUpError] = useState<SignUpError>({
    first_name: {
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
    if (!details.first_name) {
      isValid = false;
      setSignUpError((prevError) => ({
        ...prevError,
        first_name: {
          error: true,
          msg: errorMessages.nameRequired,
        },
      }));
    } else {
      setSignUpError((prevError) => ({
        ...prevError,
        first_name: {
          error: false,
          msg: '',
        },
      }));
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
    if (router.query.category) {
      const authdata = await supabase.auth.signUp({
        email: details.email,
        password: details.password,
        options: {
          data: {
            role: router.query.category,
          },
        },
      });
      if (!authdata.error) {
        setUserDetails(authdata.data.session);
        const { data, error } = await supabase
          .from('recruiter')
          .insert({
            email: details.email,
            recruiter_type: flow,
          })
          .select();
        if (!error) {
          setRecruiter(data[0] as RecruiterType);
          await createSampleJobCandidate(data[0].id);
          const { error: erroruser } = await supabase
            .from('recruiter_user')
            .insert({
              user_id: authdata.data.user.id,
              recruiter_id: data[0].id,
              email: details.email,
              first_name: details.first_name,
              last_name: details.last_name || '',
            })
            .select();
          if (!erroruser) {
            router.push(`?step=${stepObj.detailsOne}`, undefined, {
              shallow: true,
            });
            setStep(stepObj.detailsOne);
          }
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
      <WelcomeSlider3
        isSignUpButtonVisible={
          !details.first_name || !details.email || !details.password
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
            router.push(`${pageRoutes.SIGNUP}?step=${stepObj.type}`);
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
          <Stack spacing={'20px'} p={'4px'}>
            <TextField
              margin='none'
              required
              fullWidth
              id='name'
              label='First Name'
              value={details.first_name}
              onChange={(e) => {
                setDetails({ ...details, first_name: e.target.value });
              }}
              error={signUpError.first_name.error}
              helperText={
                signUpError.first_name.error ? signUpError.first_name.msg : ''
              }
              inputProps={{
                autoCapitalize: 'true',
                style: {
                  fontSize: '14px',
                },
              }}
            />
            <TextField
              margin='none'
              fullWidth
              id='name'
              label='Last Name'
              value={details.last_name}
              onChange={(e) => {
                setDetails({ ...details, last_name: e.target.value });
              }}
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
              onBlur={() => {
                const email = handleEmail(details.email);
                setSignUpError((prevError) => ({
                  ...prevError,
                  email: email,
                }));
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
              label={'Create password'}
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
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handelSignUp();
                }
              }}
              onBlur={() => {
                const password = handlePassword(details.password);
                setSignUpError((prevError) => ({
                  ...prevError,
                  password: password,
                }));
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

export default SlideTwoSignUp;
