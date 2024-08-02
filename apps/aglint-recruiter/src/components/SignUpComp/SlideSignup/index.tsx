// code has to rewritten not understandable and not maintainable
'use client';
import { RecruiterType, RecruiterUserType } from '@aglint/shared-types';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { WelcomeSlider3 } from '@/devlink/WelcomeSlider3';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { ApiBodyParamsSignup } from '@/src/pages/api/signup';
import { errorMessages } from '@/src/utils/errorMessages';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import Loader from '../../Common/Lotties/Loader';
import * as types from './types';
import { handleEmail, handlePassword, stepObj } from './utils';

const SlideTwoSignUp = () => {
  const router = useRouterPro();
  const {
    setStep,
    flow,
    setRecruiterUser,
    setRecruiter,
    setUserDetails,
    recruiterUser,
    recruiter,
    userDetails,
  } = useSignupDetails();

  const [details, setDetails] = useState<types.Details>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [checked, setChecked] = useState<boolean>(true);
  const [signUpError, setSignUpError] = useState<types.SignUpError>({
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
  const [signUplLading, setSignUpLoading] = useState(false);
  const handelSignUp = async () => {
    setSignUpLoading(true);
    try {
      if (!(await formValidation())) return null;
      const authdata = await supabase.auth.signUp({
        email: details.email,
        password: details.password,
      });
      if (!authdata.error) {
        const bodyParams: ApiBodyParamsSignup = {
          email: details.email,
          user_id: authdata.data.user.id,
          first_name: details.first_name,
          last_name: details.last_name,
          flow: flow,
        };

        const res = (await axios.post('/api/signup', bodyParams)) as {
          data: { recruiter_user: RecruiterUserType; recruiter: RecruiterType };
          status: number;
        };

        if (res.status === 200) {
          router.setQueryParams({
            step: stepObj.type,
          });
          setRecruiterUser(res.data.recruiter_user);
          setUserDetails(authdata.data.session);
          setRecruiter(res.data.recruiter);
          setStep(stepObj.type);
        } else {
          toast.error('Something went wrong. Please try again.');
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
    } catch (err) {
      toast.error(err.message);
      router.push(ROUTES['/signup']());
    }
    setSignUpLoading(false);
  };

  // const oauthHandler = async (provider) => {
  //   if (typeof window !== 'undefined')
  //     try {
  //       const { error } = await supabase.auth.signInWithOAuth({
  //         provider: provider,
  //         options: {
  //           redirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/loading`,
  //         },
  //       });
  //       if (error) {
  //         toast.error(error.message);
  //       }
  //     } catch (err) {
  //       toast.error(err.message);
  //     }
  // };

  const [routeChacker, setRouteCheker] = useState(true);

  useEffect(() => {
    setRouteCheker(true);
    if (
      router &&
      router.asPath == `${ROUTES['/signup']()}` &&
      recruiterUser?.role
    ) {
      if (recruiterUser.role === 'interviewer') {
        router.push('/interviewer');
        return;
      } else {
        if (userDetails?.user && recruiter?.industry) {
          router.push(ROUTES['/jobs']());
          return;
        }
        if (userDetails?.user && !userDetails?.user.user_metadata?.role) {
          router.setQueryParams({
            step: stepObj.type,
          });
          return;
        } else if (userDetails?.user && !recruiter?.industry) {
          router.setQueryParams({
            step: stepObj.detailsOne,
          });
          return;
        }
      }
    }

    setTimeout(() => {
      setRouteCheker(false);
    }, 1000);
  }, [router, recruiter, userDetails]);

  if (routeChacker) {
    return (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        height={'100vh'}
        width={'100vw'}
      >
        <Loader />
      </Stack>
    );
  } else
    return (
      <WelcomeSlider3
        isSignUpButtonVisible={
          signUplLading ||
          !details.first_name ||
          !details.email ||
          !details.password
        }
        // onClickRegisterWithGoogle={{
        //   onClick: () => {
        //     oauthHandler('google');
        //   },
        // }}
        onClickBack={{
          onClick: () => {
            router.push(`${ROUTES['/signup']()}?step=${stepObj.type}`);
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
            router.push(ROUTES['/login']());
            setStep(stepObj.signin);
          },
        }}
        slotSignUpForm={
          <Stack spacing={'var(--space-3)'}>
            <Stack direction={'row'} spacing={'var(--space-2)'}>
              <TextField
                margin='none'
                required
                fullWidth
                id='name'
                placeholder='First Name'
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
                placeholder='Last Name'
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
            </Stack>
            <TextField
              margin='none'
              required
              fullWidth
              id='email'
              placeholder='Work Email'
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
              placeholder={'Create Password'}
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
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      <GlobalIcon iconName='visibility' />
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
    );
};

export default SlideTwoSignUp;
