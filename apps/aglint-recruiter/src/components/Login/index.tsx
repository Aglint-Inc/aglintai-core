import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import LoaderGrey from 'aglint-recruiter/public/lottie/LoaderGrey';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { RecLoginPage } from '@/devlink2/RecLoginPage';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import Footer from '../Common/Footer';
import UITextField from '../Common/UITextField';

interface LoginFormInputs {
  email: string;
  password: string;
}

function Login() {
  const router = useRouterPro<{ redirect?: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    autoredirect();
  }, []);

  const autoredirect = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      if (data?.user.id) {
        router.push(ROUTES['/loading']());
      }
    } catch (e) {
      //
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setLoginError(error.message);
      toast.error(error.message);
    } else {
      router.push(ROUTES['/loading']());
    }

    setIsLoading(false);
  };

  const email = register('email', {
    required: 'Email is required',
    pattern: {
      // eslint-disable-next-line security/detect-unsafe-regex, no-useless-escape
      value: /^[\w.\+-]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Invalid email',
    },
  });

  const password = register('password', {
    required: 'Password is required',
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: 'Invalid login credentials',
      // 'Password must contain at least 8 characters, including UPPER/lowercase, one number and special characters',
    },
  });

  const oauthHandler = async (provider) => {
    const redirectURL = router?.queryParams?.redirect as string;
    if (redirectURL) {
      localStorage.setItem('redirectURL', redirectURL);
    }
    if (typeof window !== 'undefined') {
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
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--neutral-2)',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <RecLoginPage
          isLoginButtonDisable={isLoading}
          textLogin={isLoading ? '' : 'Login'}
          slotLottie={
            <Stack width={'100%'}>
              <LoaderGrey />
            </Stack>
          }
          isLottieVisible={isLoading}
          onclickForgotPassword={{
            onClick: () => {
              router.push(ROUTES['/forgot-password']());
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
          onclickSignup={{
            onClick: () => {
              router.push(`${ROUTES['/signup']()}`);
            },
          }}
          slotForm={
            <Stack spacing={'var(--space-3)'}>
              <UITextField
                {...email}
                id='email'
                placeholder='Email'
                type='email'
                onBlur={email.onBlur}
                onFocus={() => setLoginError(null)}
                error={errors.email && Boolean(errors.email.message)}
                helperText={String(errors?.email?.message || '')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (!isLoading) handleSubmit(onSubmit)();
                  }
                }}
              />

              <UITextField
                {...password}
                id='password'
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                onFocus={() => setLoginError(null)}
                error={errors.password && Boolean(errors.password.message)}
                helperText={String(errors?.password?.message || '')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (!isLoading) handleSubmit(onSubmit)();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? (
                          <GlobalIcon iconName='visibility' />
                        ) : (
                          <GlobalIcon iconName='visibility_off' />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {loginError && (
                <Stack
                  alignItems='center'
                  component={Typography}
                  direction='row'
                  color='var(--error-11)'
                  gap={0.5}
                  fontSize='12px'
                >
                  <GlobalIcon iconName='error' />
                  {loginError}
                </Stack>
              )}
            </Stack>
          }
          onclickLogin={{
            onClick: handleSubmit(onSubmit),
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Footer />
      </Box>
    </Container>
  );
}

export default Login;
